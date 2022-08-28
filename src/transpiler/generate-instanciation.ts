import { Model, Relation } from "."
import { flipRelationSides } from "../validator/validate-models"

export function generateDelegates(models:Model[],relations:Record<string,Relation>){
return(
`
export const FrostModels = ${generateModelsMap(models,relations)}

${models.map(generateDelegate).join('\n')}

export type DelegatesMap = {
	${models.map(({name})=>`${name.toLowerCase()}: typeof ${name}Delegate`).join(',\n\t')}
}

export function getDelegatesMap():DelegatesMap {
	return {
        ${models.map(({name})=>`${name.toLowerCase()}: ${name}Delegate`).join(',\n\t\t')}
	}
}
`
)
}
function generateModelsMap(models:Model[],relations:Record<string,Relation>){
    const modelsMap = Object.fromEntries(models.map((model)=>{
        model.relations = []
        return [model.name,model]
    }))
    let final_relations: Record<string,Relation & {localModel:Omit<Model,'relations'>,foreignModel:Omit<Model,'relations'>,}> = {}
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

    return JSON.stringify(modelsMap,null,4)
}

function generateDelegate({name}:Model){
    return `
export class ${name}Delegate extends FrostDelegate<${name}Types>{
    constructor() {
        super(FrostModels["${name}"])
    }
}
`
}