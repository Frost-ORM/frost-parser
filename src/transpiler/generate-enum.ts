import { EnumDef, EnumDefValue } from "../validator/validate-enums";

export function generateEnum({ name: enumName, values }: EnumDef) {
	return `
export enum ${enumName} {
    ${values.map(({ name, value }) => `${name}${getEnumValueDeclaration(value)}`).join(",\n\t")}
}
    `;
}
export function getEnumValueDeclaration(value: EnumDefValue["value"]) {
	const assignment = typeof value === "string" ? ` = "${value}"` : ` = ${value}`;
	return value ? assignment : "";
}
export function generateEnums(types: EnumDef[]) {
	return types.map(generateEnum).join("\n");
}
