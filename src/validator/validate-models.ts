import { countByKey } from "../helpers/count-helper";
import { Logger } from "../helpers/logger";
import { resolve } from "../helpers/resolve";
import { clearPadding } from "../helpers/split";
import * as Transpiler from "../transpiler";
import { EnumDef, validateEnums } from "./validate-enums";
import { resolveNamesMap, validateNames, validateNamesOrThrow } from "./validate-names";
import { formatPragmaForTranspiler } from "./validate-pragmas";
import { DataType, getDataType, validateProperty } from "./validate-property";
import { TypeDef, validateTypesDefs } from "./validate-types";

//FIXME allow multiple args
export type Modifier = {
	type: string;
	name: string;
};
export type NamedArgument = { name: String; value: string | number | boolean };
export type Property = {
	type: "property";
	name: string;
	propertyType: DataType;
	modifiers: Modifier[];
};

export type Pragma = {
	type: "pragma";
	name: string;
	args: (string | number | boolean | NamedArgument)[] | null;
};

export type Model = {
	type: "model";
	name: string;
	properties: Property[];
	pragmas: Pragma[];
};

export const ALLOWED_PROPERTY_MODIFIERS = ["Relation"];
export function validate({ model: models, enum: enums, type: types }: ParserOutput) {
	const tmpRelations: Record<string, Partial<Transpiler.Relation> & { defined: boolean }> = {};
	let allowedTypes = [];
	const { enums: validatedEnums, namesMap: namesMap0, enumsNames } = validateEnums(enums);
	const { types: validatedTypes, typesNames, namesMap: namesMap } = validateTypesDefs(types, namesMap0, enumsNames);

	//validate duplicate paths
	function validateModel(model: Model): Transpiler.Model & { relationsNames: string[] } {
		let { name, properties, pragmas } = model;
		let output: Transpiler.Model & { relationsNames: string[] } = {
			path: name,
			name,
			properties: [],
			relations: [],
			relationsNames: [],
		};

		//#region  Properties

		let names: any = {};
		for (let {
			name: propertyName,
			propertyType: { dataType, isArray, optional },
			modifiers,
		} of properties) {
			let [valid, error] = resolve(() => validateProperty({ dataType, isArray, optional }, allowedTypes));
			if (error) {
				throw new Error(`Property ${propertyName} on Model (${model.name}): ${error.message}`);
			}
			names[propertyName] = (names[propertyName] || 0) + 1;
			output.properties?.push({
				name: propertyName,
				type: getDataType(dataType),
				isArray: isArray,
				// optional: true,
				optional,
			});
			if ((modifiers ?? []).length > 1) {
				//todo make more generic
				/**
				 * This is a temporary validation since we only have the relation modifier
				 */
				throw new Error(
					`You have defined @Relation twice on the property (${propertyName}) in the model (${output.name})`
				);
			}
			modifiers?.forEach(({ name: relName }) => {
				let relationName =
					relName ??
					[dataType, output.name]
						.sort((a, b) => (a < b ? 1 : -1))
						.map((x) => x.toLowerCase())
						.join("-");
				if (output.relationsNames.includes(relationName)) {
					//validate if different relations have the same names between the two models
					throw new Error(
						`The model (${output.name}) has multiple relations with the model (${dataType}). And each relation should have a distinct name`
					);
				}
				if (tmpRelations[relationName]) {
					let rel = tmpRelations[relationName];
					if (rel.defined)
						throw new Error(
							`Two relations have the same name (${relationName}) on the models(${rel.localModelName},${rel.foreignModelName},${output.name})`
						);

					let relationType: Transpiler.RelationType = "one_to_one";
					switch (+!!isArray + +!!rel.localField?.isArray) {
						case 0:
							relationType = "one_to_one";
							break;
						case 1:
							relationType = "one_to_many";
							break;
						case 2:
							relationType = "many_to_many";
							break;
					}
					tmpRelations[relationName] = {
						...tmpRelations[relationName],
						foreignField: { name: propertyName, isArray },
						relationType,
						defined: true,
					};
				} else {
					tmpRelations[relationName] = {
						name: relationName,
						foreignModelName: dataType,
						localField: { name: propertyName, isArray: isArray },
						localModelName: output.name,
						defined: false,
					};
				}
				output.relationsNames.push(relationName);
			});
		}

		if (validateNames(names)) {
			throw new Error(
				`Duplicate Property Names In Model(${name}):\n` +
					Object.entries(names)
						.map(([name, count]) => (count !== 1 ? `PropertyName: ${name}, Count: ${count}` : null))
						.filter(Boolean)
						.join("\n")
			);
		}

		//#endregion  Properties

		//#region  Pragmas
		/**
		 * Each pragma should return an object containing the properties to be overridden in the model
		 */
		(pragmas ?? []).forEach((pragma) => {
			Object.assign(output, formatPragmaForTranspiler(pragma));
		});
		//#endregion  Pragmas

		return output;
	}

	function validateModels(models: Model[]) {
		let names = Object.entries(
			models
				.map(({ name }) => name)
				.reduce((prev, curr) => {
					namesMap[curr] = { ...(namesMap[curr] ?? {}), model: true };
					prev[curr] = (prev[curr] || 0) + 1;
					return prev;
				}, {})
		).filter(([_, count]) => count !== 1);

		if (names.length) {
			throw new Error(
				`Duplicate Model Names:\n` +
					names.map(([name, count]) => `ModelName: ${name}, Count: ${count}`).join("\n")
			);
		}

		resolveNamesMap(namesMap);
		allowedTypes = Object.keys(namesMap);
		const validatedModels = models.map(validateModel);

		// todo validate correct firebase path
		validateNamesOrThrow(
			countByKey(validatedModels, "path", (path) => clearPadding(path, "/")),
			{
				title: `Multiple Models Have the same node path\n`,
				subtitle: ([path, count]) => `Node Path: "${path}", Count: ${count}`,
			}
		);
		// validate all relations are defined
		const relations = validateRelations(tmpRelations);
		return {
			models: validatedModels.map((model) => ({
				...model,
				relations: model.relationsNames.map((name) => relationWithLocalSide(relations[name], model.name)),
			})),
			relations,
		};
	}

	const finalModels = validateModels(models);
	return { ...finalModels, enums: validatedEnums, types: validatedTypes };
}

export function flipRelationSides(relation: Transpiler.Relation): Transpiler.Relation {
	return {
		...relation,

		localField: relation.foreignField,
		localModelName: relation.foreignModelName,

		foreignField: relation.localField,
		foreignModelName: relation.localModelName,
	};
}
function relationWithLocalSide(relation: Transpiler.Relation, side: string) {
	// console.log({relation,side})
	if (relation.localModelName === side) return relation;
	else if (relation.foreignModelName === side) return flipRelationSides(relation);
	else
		throw new Error(
			`Side ${side} is not equal to either sides(${relation.localModelName}, ${relation.foreignModelName})`
		);
}

function validateRelations(
	relations: Record<string, Partial<Transpiler.Relation> & { defined: boolean }>
): Record<string, Transpiler.Relation> {
	let errors = Object.entries(relations)
		.map(([name, relation]) => {
			if (!relation.defined)
				return `Relation defined on field (${relation.localField.name}) in model (${relation.localModelName}) has no opposite relation on the model (${relation.foreignModelName})`;
		})
		.filter(Boolean);
	if (errors.length) throw new Error("\n\t" + errors.join("\n\t"));

	return relations as Record<string, Transpiler.Relation>;
}

export type ParserOutput = {
	model: Model[];
	enum?: any[];
	type?: any[];
};

export type ValidatorOutput = {
	models: Transpiler.Model[];
	enum?: EnumDef[];
	type?: TypeDef[];
	relations: Record<string, Transpiler.Relation>;
};
