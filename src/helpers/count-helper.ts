export function count(array: PropertyKey[], extraOperation: Function = Buffer): Record<PropertyKey, number> {
	return array.reduce((prev, curr) => {
		let id = extraOperation(curr);
		prev[id] = (prev[id] || 0) + 1;
		return prev;
	}, {});
}

export function countByKey(
	array: Record<PropertyKey, any>,
	key: PropertyKey,
	extraOperation: Function = Buffer
): Record<PropertyKey, number> {
	return array
		.map((item) => extraOperation(item[key]))
		.reduce((prev, curr) => {
			prev[curr] = (prev[curr] || 0) + 1;
			return prev;
		}, {});
}
