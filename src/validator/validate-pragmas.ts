import { NamedArgument, Pragma } from "./validate-models";

export const MODEL_PRAGMAS_VALIDATION = {
	node({ args }: Pragma) {
		if (args?.length) {
			for (let arg of args as any[]) {
				if (!arg.name) throw new Error("Positional Arguments are not allowed in `node` Pragma");

				if (!["path"].includes(arg.name))
					throw new Error(`${arg.name} argument is not allowed in \`node\` Pragma`);
				if (typeof arg.value !== "string")
					throw new Error(`${arg.name} argument should be a string in \`node\` Pragma`);
				//todo regex allowed path name
				return true;
			}
		}
		return false;
	},
};
export const MODEL_PRAGMAS_FORMAT = {
	node({ args }: Pragma) {
		return {
			path: (args!.filter((arg: any) => Boolean(arg.name)) as NamedArgument[]).find(
				(arg) => arg!.name === "path"
			)!.value,
		};
	},
};
export const ALLOWED_MODEL_PRAGMAS = Object.keys(MODEL_PRAGMAS_VALIDATION); //['node']

export function isPragmaAllowed({ name }: Pragma) {
	return ALLOWED_MODEL_PRAGMAS.includes(name);
}
export function isPragmaValid(pragma: Pragma) {
	if (!isPragmaAllowed(pragma)) throw new Error("There are no pragmas with the name " + pragma.name);
	return MODEL_PRAGMAS_VALIDATION[pragma.name](pragma);
}
export function formatPragmaForTranspiler(pragma: Pragma) {
	if (isPragmaValid(pragma)) {
		return MODEL_PRAGMAS_FORMAT[pragma.name](pragma);
	} else {
		throw new Error("Invalid Pragma " + pragma.name);
	}
}
