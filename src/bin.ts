#!/usr/bin/env node

import { compileFile, DEFAULT_INPUT, DEFAULT_OUTPUT, parseToJsonSchema } from ".";
import * as yargs from "yargs";
import path from "path";

export const DISPLAY_DEFAULT_OUTPUT = "<PROJECT_DIR>/node_modules/@frost-orm/frost-web-client/dist/generated/index";
export const DISPLAY_DEFAULT_INPUT =
	'<PROJECT_DIR>/frost/schema.fsl or path specified in `{"frost":{"schemaPath":<Path>}}` inside package.json';
let npmConfig:any = {};
try {
	npmConfig = require(path.resolve(__dirname, "../../../../package.json"));
} catch (error) {}
const argv = yargs
	.scriptName("frost")
	.version()
	.command(["generate", "gen", "g"], "Command to generate Frost Implementation from Frost Schema", function (yargs) {
		return yargs.options({
			input: {
				type: "string",
				alias: "i",
				default: DISPLAY_DEFAULT_INPUT,
				describe: "Path (relative to CWD) of the frost schema.",
			},
			output: {
				type: "string",
				alias: "o",
				default: DISPLAY_DEFAULT_OUTPUT,
				describe:
					"Output File Path (relative to CWD) of the generated client.\nThe output will be two files [`<FilePath>.js`,`<FilePath>.d.ts`]. \nExample:\n\tfilepath:'./src/frost/client'\n\tgenerated:[`./src/frost/client.js`,`./src/frost/client.d.ts`]",
			},
			"output-same-location": {
				type: "boolean",
				describe:
					"If true and input option is provided,\n it will override the output path with the same location of the provided input.",
			},
			// 'json-schema':{type:"boolean"},
		});
	})
	.help()
	.wrap(Math.floor(yargs.terminalWidth() * 0.98))
	.showHelpOnFail(true).argv;

async function main() {
	// console.log(argv)
	let file: string =
		argv.input === DISPLAY_DEFAULT_INPUT ? npmConfig?.frost?.schemaPath ?? DEFAULT_INPUT : argv.input;
	if (argv.jsonSchema) {
		return parseToJsonSchema(file);
	}
	let outputPath: string = argv.output === DISPLAY_DEFAULT_OUTPUT ? DEFAULT_OUTPUT : argv.output;
	if (file !== (npmConfig?.frost?.schemaPath ?? DEFAULT_INPUT) && argv["output-same-location"]) {
		outputPath = path.resolve(path.dirname(file), path.basename(file, path.extname(file)));
	}
	await compileFile(file, outputPath);
}

main();
