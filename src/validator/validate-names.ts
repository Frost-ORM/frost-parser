export type NamesMap = Record<PropertyKey, Partial<Record<"enumeration" | "model" | "type", boolean>>>;

/**
 *
 * @param names
 * @returns the length of duplicate names
 */
export const validateNames = (names: Record<PropertyKey, number>) =>
	Object.entries(names).filter(([_, count]) => count !== 1).length;

export const resolveNamesMap = (namesMap: NamesMap) => {
	let filteredMap = Object.entries(namesMap).filter(
		([_, { enumeration, model, type }]) => +!!enumeration + +!!model + +!!type !== 1
	);
	if (filteredMap.length) {
		throw new Error(
			filteredMap
				.map(
					([name, defs]) =>
						`Multiple Definitions with the Same name (${name}): (${Object.entries(defs)
							.filter(([_, value]) => value)
							.map(([_name]) => _name)
							.join(", and ")})`
				)
				.join("\n")
		);
	}
	return true;
};
export function validateNamesOrThrow(
	names: Record<PropertyKey, number>,
	errorMessage: { title: string; subtitle?: (value: [string, number]) => string }
) {
	if (validateNames(names)) {
		throw new Error(
			(errorMessage.title ?? "") +
				Object.entries(names)
					.filter(([_, count]) => count !== 1)
					.map(errorMessage.subtitle ?? (([name, count]) => `Key: ${name}, Count: ${count}`))
					.join("\n")
		);
	}
}
