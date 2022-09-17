import "../helpers/array-methods";

//order is important
export const RelationTypesNames: Record<RelationType, string> = {
	one_to_one: "OneToOne",
	one_to_many: "OneToMany",
	many_to_many: "ManyToMany",
};

export type RelationField = {
	name: string;
	isArray?: boolean;
};
export type RelationType = "one_to_one" | "one_to_many" | "many_to_many";
export type Relation = {
	relationType: RelationType;
	name: string;
	localModelName: string;
	foreignModelName: string;
	localField: RelationField;
	foreignField: RelationField;
};
export type Property = {
	name: string;
	optional?: boolean;
	isArray?: boolean;
	type: string;
};

export type Model = {
	path: string;
	name: string;
	properties: Property[];
	relations: Relation[];
};

function modelProperty({ name, type, optional, isArray }: Property) {
	return `${name}${optional ? "?" : ""}: ${type}${isArray ? "[]" : ""}`;
}

function relationInclude(relation: Relation) {
	let localModelName = relation.localModelName;
	let foreignModelName = relation.foreignModelName;
	let localField = relation.localField;
// TODO ${foreignModelName} & frostmetadata
	return `
export type ${localModelName}Include${foreignModelName} =  {
    ${localField.name}?: ${localField.isArray ? `Record<string,${foreignModelName}WithMetadata>` : `${foreignModelName}WithMetadata`}
}
    `;
}
function relationsIncludeAll({ name, relations }: Model) {
	//todo check if {} instead of never
	return `export type ${name}IncludeAll = ${
		relations.map(({ foreignModelName }) => `${name}Include${foreignModelName}`).join(" & ") || "never"
	}; `;
}
function relationsFieldsKeys(localModelName: string, relations: Relation[]) {
	const relationsMap = relations.groupByKey("relationType") as Record<RelationType, Relation[]>;

	return (
		Object.entries(relationsMap)
			.map(([relationType, _relations]) => {
				let output = "";
				// todo check if they have any first or never
				if (relationType === "one_to_many") {
					output += `
export type ${localModelName}OneToManyRelationsMasterFieldsKeys = ${
						_relations
							.filter(({ localField }) => !localField.isArray)
							.map((relation) => '"' + relation.localField.name + '"')
							.join(" | ") || "never"
					};
export type ${localModelName}OneToManyRelationsSalveFieldsKeys = ${
						_relations
							.filter(({ localField }) => localField.isArray)
							.map((relation) => '"' + relation.localField.name + '"')
							.join(" | ") || "never"
					};
            `;
				}
				return (
					output +
					`export type ${localModelName}${
						RelationTypesNames[relationType as RelationType]
					}RelationsFieldsKeys = ${_relations
						.map((relation) => '"' + relation.localField.name + '"')
						.join(" | ")};`
				);
			})
			.join("\n") +
		// todo check if they have any first or never
		`export type ${localModelName}RelationsFieldsKeys = ${
			Object.keys(relationsMap)
				.map((name) => `${localModelName}${RelationTypesNames[name as RelationType]}RelationsFieldsKeys`)
				.join(" | ") || "never"
		};
export type ${localModelName}RelationsFieldsKeysByType = {
${
	//todo also check here
	Object.keys(relationsMap)
		.map(
			(name) =>
				`    ${name}: ${localModelName}${RelationTypesNames[name as RelationType]}RelationsFieldsKeys` +
				(name === "one_to_many"
					? `,
    one_to_many_master_fields: ${localModelName}OneToManyRelationsMasterFieldsKeys,
    one_to_many_slave_fields: ${localModelName}OneToManyRelationsSalveFieldsKeys`
					: "")
		)
		.join(",\n")
}
};
    `
	);
	// return `export type ${localModelName}RelationsFieldsKeys = ${relations
	// .map((relation) => '"' + relation.localField.name + '"')
	// .join(" | ")};
	// `;
}
function modelPropertiesKeys({ name, properties }: Model) {
	return `export type ${name}PropertiesKeys =   ${properties
		.map((property) => '"' + property.name + '"')
		.join(" | ")};`;
}
function modelFrostMetaData({ name, relations }: Model) {
	const relationsMap = relations.groupByKey("relationType");
	//todo ID?
	return `
export type ${name}FrostMetadata = {
    __frost__:{${
		relationsMap.one_to_one
			? `
        'one_to_one':{
            ${relationsMap.one_to_one.map((relation) => relation.localField.name + "?: string | null").join(",\n")}
        },
            `
			: ""
	}${
		relationsMap.one_to_many
			? `
        'one_to_many':{
            ${relationsMap.one_to_many
				.map((relation) => relation.localField.name + "?: OneToManyMetadata | null")
				.join(",\n")}
        },
            `
			: ""
	}${
		relationsMap.many_to_many
			? `
        'many_to_many':{
            ${relationsMap.many_to_many
				.map((relation) => relation.localField.name + "?: ManyToManyMetadata | null")
				.join(",\n")}
        }`
			: ""
	}
    }
}
    `;
}

function modelFetchReturnType({ name, properties }: Model) {
	return `export type ${name}FetchReturnType<I extends ${name}IncludeOptions> = With<${name},${name}IncludeAll,I>`;
}
function modelConnectOptions({ name }: Model) {
	return `export type ${name}ConnectOptions = ConnectOptions<${name}RelationsFieldsKeysByType>;`;
}
function modelDisconnectOptions({ name }: Model) {
	return `export type ${name}DisconnectOptions = DisconnectOptions<${name}RelationsFieldsKeysByType>;`;
}
function modelIncludeOptions({ name }: Model) {
	return `export type ${name}IncludeOptions = IncludeOptions<${name}RelationsFieldsKeys>;`;
}

export function generateModelType(model: Model) {
	const { name, properties, relations } = model;
	return `
export type ${name} = FrostObject & {
    ${properties.filter(({name})=>relations.findIndex(({localField,foreignField})=> (name === localField.name || name === foreignField.name)) === -1).map(modelProperty).join(",\n\t")}
}

${relations.map(relationInclude).join("\n")}

${relationsIncludeAll(model)}


${relationsFieldsKeys(model.name, relations)}

${modelPropertiesKeys(model)}


${modelFrostMetaData(model)}

${modelConnectOptions(model)}

${modelDisconnectOptions(model)}

${modelIncludeOptions(model)}

${modelFetchReturnType(model)}

export type ${name}WithMetadata = ${name} & Partial<${name}FrostMetadata>;
export type ${name}FullModel = ${name}WithMetadata & ${name}IncludeAll;

export type ${name}Types = {
    FullModel: ${name}FullModel,
    Model: ${name},
    ModelWithMetadata: ${name}WithMetadata,
    IncludeAll: ${name}IncludeAll,
    RelationsFieldsKeys: ${name}RelationsFieldsKeys,
    RelationsFieldsKeysByType: ${name}RelationsFieldsKeysByType,
    PropertiesKeys: ${name}PropertiesKeys,
    FrostMetadata:${name}FrostMetadata,
    ConnectOptions: ${name}ConnectOptions,
    DisconnectOptions: ${name}DisconnectOptions,
    IncludeOptions: ${name}IncludeOptions,
}
`;
}
//export type ${name}Delegate = FrostDelegate<${name}Types>

export function generateModelsTypes(models: Model[]) {
	return models.map(generateModelType).join("\n");
}
