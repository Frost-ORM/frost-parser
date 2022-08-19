import { writeFileSync } from "fs";
import path from "path";

Object.defineProperties(
    Array.prototype,
    {
        group:{
            value:function<T>(predicate:(value:T)=>PropertyKey){return group<T>(this,predicate)},
            enumerable:false
        },
        groupByKey:{
            value:function<T>(key:PropertyKey){return groupByKey<T>(this,key)},
            enumerable:false
        },
    }
)

declare global {
    interface Array<T> {
      group(predicate:(value:T)=>PropertyKey): Record<PropertyKey,T[]>;
      groupByKey(key:PropertyKey): Record<PropertyKey,T[]>;
    }
}

function groupByKey<T extends Record<PropertyKey,any>>(array:T[],key:PropertyKey){
    return group<T>(array,(value)=>value[key])
}
function group<T extends Record<PropertyKey,any>>(array:T[],predicate:(value:T)=>PropertyKey){
    let output: Record<PropertyKey,T[]> = {}

    for(let item of array){
        output[predicate(item)] = [...(output[predicate(item)] ?? []),item];
    }

    return output
}
//order is important
const RelationTypesNames : Record<RelationType,string>= {
    one_to_one:"OneToOne",
    one_to_many:"OneToMany",
    many_to_many:"ManyToMany",
}

type RelationField = {
    name:string,
    isArray?:boolean
}
type RelationType = "one_to_one" | "one_to_many"| "many_to_many"
type Relation = {

    relationType:RelationType,
    name:string,
    localModelName:string,
    foreignModelName:string,
    localField:RelationField,
    foreignField:RelationField,
}
type Property = {
    name:string,
    optional?:boolean,
    isArray?:boolean,
    type:string
}

type Model = {
    name:string,
    properties:Property[],
    relations: Relation[]
}
const globalTypes = `

export type OneToManyMetadata = Record<string, boolean | null | undefined>;

export type ManyToManyMetadata = Record<string, { connected?: boolean | null; lastChange: string } | null | undefined>;
export type IncludeOptions<T extends PropertyKey = PropertyKey> = Partial<Record<T, boolean>>;
export type With<T, R extends Record<PropertyKey, any>, I extends IncludeOptions> = T & Pick<R, keyof I>;

type RelationType = "one_to_one" | "one_to_many" | "many_to_many";

type RelationTypeWithSubTypes =
	| "one_to_one"
	| "one_to_many"
	| "many_to_many"
	| "one_to_many_master_fields"
	| "one_to_many_slave_fields";

export type ConnectOptions<T extends Partial<Record<RelationType, any>>> = Partial<
	Record<T["one_to_one"], string> &
    Record<T["one_to_many" | "many_to_many"], string[]>
>;
export type DisconnectOptions<T extends Partial<Record<RelationTypeWithSubTypes, any>>> = Partial<
    Record<T["one_to_one"], string | true> &
    Record<T["one_to_many_master_fields"], string | true> &
    Record<T["one_to_many_slave_fields"], string[] | true | "all"> &
    Record<T["many_to_many"], string[] | true | "all">
>;


type FrostObject = {
    id?:string
}
`

function modelProperty({ name, type, optional, isArray }:Property) {
	return `${name} ${optional?"?":""}: ${type}${isArray? "[]" : ""}`;
}

function relationInclude(relation:Relation) {
	let localModelName = relation.localModelName;
	let foreignModelName = relation.foreignModelName;
	let localField = relation.localField;

	return `
export type ${localModelName}Include${foreignModelName} =  {
    ${localField.name}?: ${foreignModelName}${localField.isArray? "[]":""}
}
    `;
}
function relationsIncludeAll({name,relations}:Model) {
	return `export type ${name}IncludeAll = ${relations.map(({foreignModelName})=>`${name}Include${foreignModelName}`).join(' & ')}; `;
}
function relationsFieldsKeys(relations:Relation[]) {

    let localModelName = relations[0].localModelName;
    const relationsMap = relations.groupByKey('relationType') as Record<RelationType,Relation[]>

    return Object.entries(relationsMap).map(([relationType,_relations])=>{
        let output = ''
        if(relationType === "one_to_many"){
            output += `
            export type ${localModelName}OneToManyRelationsMasterFieldsKeys = ${_relations.filter(({localField})=>!localField.isArray).map((relation)=>'"'+relation.localField.name+'"').join(' | ')};
            export type ${localModelName}OneToManyRelationsSalveFieldsKeys = ${_relations.filter(({localField})=>localField.isArray).map((relation)=>'"'+relation.localField.name+'"').join(' | ')};
            `
        }
        return output + `
            export type ${localModelName}${RelationTypesNames[relationType as RelationType]}RelationsFieldsKeys = ${_relations.map((relation)=>'"'+relation.localField.name+'"').join(' | ')};
        `
    }).join('\n')
	+ `export type ${localModelName}RelationsFieldsKeys = ${Object.keys(relationsMap).map((name) => `${localModelName}${RelationTypesNames[name as RelationType]}RelationsFieldsKeys`).join(" | ")};
        export type ${localModelName}RelationsFieldsKeysByType = { 
            ${Object.keys(relationsMap).map((name) => (`${name}: ${localModelName}${RelationTypesNames[name as RelationType]}RelationsFieldsKeys` + ((name === 'one_to_many')?(`
            one_to_many_master_fields: ${localModelName}OneToManyRelationsMasterFieldsKeys,
            one_to_many_slave_fields: ${localModelName}OneToManyRelationsSalveFieldsKeys,
            `):""))).join(",\n")
            }
            
         };
    `;
    // return `export type ${localModelName}RelationsFieldsKeys = ${relations
    // .map((relation) => '"' + relation.localField.name + '"')
    // .join(" | ")};
    // `;
}
function modelPropertiesKeys({ name, properties }:Model) {
	return `export type ${name}PropertiesKeys =   ${properties.map((property) => '"' + property.name + '"').join(" | ")};`;
}
function modelFrostMetaData({ name, relations }:Model) {
    const relationsMap = relations.groupByKey('relationType')
	//todo ID?
	return `
export type ${name}FrostMetadata = {
    __frost__:{
        'one_to_one':{
            ${
                relationsMap.one_to_one.map((relation)=> relation.localField.name + 'ID?: string | null').join(',\n')
            }
        },
        ${(relationsMap.one_to_many) ? (
            `
            'one_to_many':{
                ${
                    relationsMap.one_to_many.map((relation)=> relation.localField.name + '?: OneToManyMetadata | null').join(',\n')
                }
            },
            `
        ):""}
        ${(relationsMap.many_to_many) ? (
        `
        'many_to_many':{
            ${
                relationsMap.many_to_many.map((relation)=> relation.localField.name + '?: ManyToManyMetadata | null').join(',\n')
            }
        }`
        ):""}
    }
}
    `;
}

function modelFetchReturnType({ name, properties }:Model) {

	return `
    export type ${name}FetchReturnType<I extends ${name}IncludeOptions> = With<${name},${name}IncludeAll,I>
    `;
}
function modelConnectOptions({ name }:Model) {
	return (
    `
    export type ${name}ConnectOptions = ConnectOptions<${name}RelationsFieldsKeysByType>;
    `
);
}
function modelDisconnectOptions({ name }:Model) {
	return `
    export type ${name}DisconnectOptions = DisconnectOptions<${name}RelationsFieldsKeysByType>;
    `;
}
function modelIncludeOptions({ name }:Model) {
	return `export type ${name}IncludeOptions = IncludeOptions<${name}RelationsFieldsKeys>;`;
}

function model(model:Model) {
	const { name, properties, relations } = model;
	return `
export type ${name} = FrostObject & {
  ${properties.map(modelProperty).join(",\n")}
}

${relations.map(relationInclude).join("\n")}

${relationsIncludeAll(model)}


${relationsFieldsKeys(relations)}

${modelPropertiesKeys(model)}


${modelFrostMetaData(model)}

${modelConnectOptions(model)}

${modelDisconnectOptions(model)}

${modelIncludeOptions(model)}

${modelFetchReturnType(model)}

export type ${name}Types<T extends ${name}IncludeOptions = ${name}IncludeOptions>= {
    Model: ${name},
    IncludeAll: ${name}IncludeAll,
    RelationsFieldsKeys: ${name}RelationsFieldsKeys,
    RelationsFieldsKeysByType: ${name}RelationsFieldsKeysByType,
    PropertiesKeys: ${name}PropertiesKeys,
    FrostMetadata:${name}FrostMetadata,
    ConnectOptions: ${name}ConnectOptions,
    DisconnectOptions: ${name}DisconnectOptions,
    IncludeOptions: ${name}IncludeOptions,
    FetchReturnType: ${name}FetchReturnType<T> & ${name}FrostMetadata,
}

export type ${name}Delegate = FrostDelegate<${name}Types>
`;
}

let models:Model[] = [
    {
        name:"Student",
        properties:[
            {name:'name',type:'string',optional:true},
            {name:'birthday',type:'Date',optional:true}
        ],
        relations:[
            {name:"professor_student",relationType:"one_to_one",localField:{name:'professor'},foreignField:{name:'student'},foreignModelName:"Professor",localModelName:"Student"}
        ]
    },
    {
        name:"Professor",
        properties:[
            {name:'name',type:'string',optional:true},
            {name:'birthday',type:'Date',optional:true}
        ],
        relations:[
            {name:"professor_student",relationType:"one_to_one",foreignField:{name:'professor'},localField:{name:'student'},localModelName:"Professor",foreignModelName:"Student"}

        ]
    }
];

(function(){

    models.forEach(
        (value)=>{
            writeFileSync(path.join('./',value.name+'.ts'),globalTypes+model(value))
        }
    )
})()
