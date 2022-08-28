import { NamesMap, validateNames, validateNamesOrThrow } from "./validate-names";
import { getDataType, validateProperty, ValidatePropertyErrorCodes } from "./validate-property";

export type TypeDefProperty = {
	name: string;
	value: { dataType: string; isArray: boolean; optional: boolean };
};
export type TypeDef = {
	type: "type";
	name: string;
	values: TypeDefProperty[];
};

export function validateTypesDefs(types: TypeDef[], namesMap: NamesMap = {}, extraAllowedTypes: string[] = []) {
	let typesNames = types.map(({ name }) => name);
	let typesNamesCount = {};

	function validateType(typeDef: TypeDef) {
		let { name, values } = typeDef;
		let newValues: TypeDefProperty[] = [];
		//property type validation
		typesNamesCount[name] = (typesNamesCount[name] || 0) + 1;
		namesMap[name] = { ...(namesMap[name] ?? {}), type: true };
		let names = {};

		for (const { name, value } of values) {
			names[name] = (names[name] || 0) + 1;
			newValues.push({ name, value: { ...value, dataType: getDataType(value.dataType) } });
			try {
				validateProperty(value, extraAllowedTypes);
			} catch (error) {
				throw new Error(`Property ${name} on Type (${typeDef.name}): ${error.message}`);
			}
		}
		validateNamesOrThrow(names, {
			title: `Duplicate Properties Names In Type(${name}):\n`,
			subtitle: ([_name, count]) => `Property Key: ${_name}, Count: ${count}`,
		});

		return { ...typeDef, values: newValues };
	}

	validateNamesOrThrow(typesNamesCount, {
		title: `Duplicate Types Definitions:\n`,
		subtitle: ([_name, count]) => `Type Name: ${_name}, Count: ${count}`,
	});

	return { types: types.map(validateType), typesNames, namesMap };
}
