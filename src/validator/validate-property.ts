export type DataType = { dataType: string; isArray: boolean; optional: boolean };
export function validateProperty(
	{ dataType, optional, isArray }: DataType,
	extraAllowedTypes: string[] = [],
	allowOptional = true
) {
	const typeAllowed =
		[
			"string",
			"number",
			"short",
			"int",
			"integer",
			"long",
			"float",
			"double",
			"decimal",
			"boolean",
			"date",
		].includes(dataType.toLowerCase()) || extraAllowedTypes.includes(dataType);

	if (!typeAllowed) throw ValidatePropertyError.type(dataType);
	if (!((optional && allowOptional) || !optional)) throw ValidatePropertyError.optional(dataType);

	return true;
}
export enum ValidatePropertyErrorCodes {
	TYPE_NOT_ALLOWED = "type_not_allowed",
	OPTIONAL_NOT_ALLOWED = "optional_not_allowed",
}
class ValidatePropertyError extends Error {
	constructor(public code: ValidatePropertyErrorCodes, type: string = "") {
		super();
		switch (code) {
			case ValidatePropertyErrorCodes.OPTIONAL_NOT_ALLOWED:
				this.message = `is not allowed to be optional`;
				break;
			case ValidatePropertyErrorCodes.TYPE_NOT_ALLOWED:
				this.message = `has unknown or illegal type ` + (type ? `\`${type}\`` : "");
				break;
			default:
				this.message = "unknown";
		}
	}
	static type(type): ValidatePropertyError {
		return new this(ValidatePropertyErrorCodes.TYPE_NOT_ALLOWED, type);
	}
	static optional(type): ValidatePropertyError {
		return new this(ValidatePropertyErrorCodes.OPTIONAL_NOT_ALLOWED, type);
	}
}
export function getDataType(dataType: string) {
	switch (dataType.toLowerCase()) {
		case "string":
		case "boolean":
			return dataType.toLowerCase();

		case "number":
		case "short":
		case "int":
		case "integer":
		case "long":
		case "float":
		case "double":
		case "decimal":
			return "number";
		case "date":
			return "Date";
		default:
			return dataType;
	}
}
