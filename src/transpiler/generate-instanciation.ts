import { Model, Relation } from "."

export type RelationWithBaseModels =  Relation & {localModel:Omit<Model,'relations'>,foreignModel:Omit<Model,'relations'>,}
export function generateDelegates(models:Model[],relations:Record<string,Relation>){
    const {FrostModels,FrostRelations} = generateModelsMap(models,relations)
return(
`
export const FrostModels = ${FrostModels}

${models.map(generateDelegate).join('\n')}

export type DelegatesMap = {
	${models.map(({name})=>`${name.toLowerCase()}: typeof ${name}Delegate`).join(',\n\t')}
}

export function getDelegatesMap():DelegatesMap {
	return {
        ${models.map(({name})=>`${name.toLowerCase()}: ${name}Delegate`).join(',\n\t\t')}
	}
}

export function getFrostModels():typeof FrostModels {
	return FrostModels;
}

const FrostRelations = ${FrostRelations}

export function getFrostRelations():typeof FrostRelations {
	return FrostRelations;
}


`
)
}
function generateModelsMap(models:Model[],relations:Record<string,Relation>){
    const modelsMap = Object.fromEntries(models.map((model)=>{
        model.relations = []
        return [model.name,model]
    }))

    let final_relations: Record<string,RelationWithBaseModels> = {}
    for (const key in relations) {
        let {localModelName,foreignModelName} = relations[key]
        final_relations[key] = {
            ...relations[key],
            localModel:{
                name:modelsMap[localModelName].name,
                path:modelsMap[localModelName].path,
                properties:modelsMap[localModelName].properties,
            },
            foreignModel:{
                name:modelsMap[foreignModelName].name,
                path:modelsMap[foreignModelName].path,
                properties:modelsMap[foreignModelName].properties,
            },
        }
        modelsMap[localModelName].relations.push(final_relations[key])
        modelsMap[foreignModelName].relations.push(flipRelationSides(final_relations[key]))
    }
    //todo modify models

    return {FrostModels: JSON.stringify(modelsMap,null,4),FrostRelations: JSON.stringify(final_relations,null,4)}
}

function generateDelegate({name}:Model){
    return `
export class ${name}Delegate extends FrostDelegate<${name}Types>{
    constructor(db) {
        super(FrostModels["${name}"],db)
    }
}
`
}

export function flipRelationSides(relation: RelationWithBaseModels): RelationWithBaseModels {
	return {
		...relation,

		localField: relation.foreignField,
		localModelName: relation.foreignModelName,
		localModel: relation.foreignModel,

		foreignField: relation.localField,
		foreignModelName: relation.localModelName,
		foreignModel: relation.localModel,
	};
}