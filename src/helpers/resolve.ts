export function resolve<T>(callable: () => T): [T | null, Error | null] {
	try {
		return [callable(), null];
	} catch (error) {
		return [null, error];
	}
}
export async function resolveAsync<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
	try {
		return [await promise, null];
	} catch (error) {
		return [null, error];
	}
}
