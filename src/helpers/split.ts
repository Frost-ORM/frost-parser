export function split(value: string, delimiter: string | RegExp, clear: boolean = false, limit?: number) {
	let parts = value.split(delimiter, limit);
	if (clear) {
		parts = parts.filter(Boolean);
	}
	return parts;
}
export function splitAndClear(value: string, delimiter: string | RegExp) {
	return split(value, delimiter, true);
}
export function clearPadding(value: string, delimiter: string | RegExp) {
	return splitAndClear(value, delimiter).join(delimiter.toString());
}
