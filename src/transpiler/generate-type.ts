import { TypeDef, TypeDefProperty } from "../validator/validate-types";

export function generateType({ name, values }: TypeDef) {
	return `
export type ${name} = {
    ${values.map(({ name, value }) => `${name}: ${getPropertyTypeString(value)}`).join(",\n\t")}
}
    `;
}
export function getPropertyTypeString({ dataType, optional, isArray }: TypeDefProperty["value"]) {
	return `${dataType}${isArray ? "[]" : ""} ${optional ? "| undefined | null" : ""}`;
}
export function generateTypes(types: TypeDef[]) {
	return types.map(generateType).join("\n");
}
