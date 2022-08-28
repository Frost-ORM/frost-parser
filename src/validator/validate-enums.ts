import { NamesMap, validateNamesOrThrow } from "./validate-names";

export type EnumDefValue = {
	name: string;
	value: string | number | null | undefined;
};
export type EnumDef = {
	type: "enum";
	name: string;
	values: EnumDefValue[];
};

export function validateEnums(enums: EnumDef[], namesMap: NamesMap = {}) {
	let enumsNames = {};
	function validateEnum(enumDef: EnumDef) {
		let { name, values } = enumDef;
		enumsNames[name] = (enumsNames[name] || 0) + 1;
		namesMap[name] = { ...(namesMap[name] ?? {}), enumeration: true };
		let names = {};
		for (const { name: _name } of values) {
			names[_name] = (names[_name] || 0) + 1;
		}
		validateNamesOrThrow(names, {
			title: `Duplicate Names In Enum(${name}):\n`,
			subtitle: ([_name, count]) => `Enum Key: ${_name}, Count: ${count}`,
		});

		return enumDef;
	}

	validateNamesOrThrow(enumsNames, {
		title: `Duplicate Enum Definitions:\n`,
		subtitle: ([name, count]) => `Enum Name: ${name}, Count: ${count}`,
	});

	return { enums: enums.map(validateEnum), enumsNames: Object.keys(enumsNames), namesMap };
}
