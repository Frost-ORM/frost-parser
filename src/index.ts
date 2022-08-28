import fs from "fs/promises";
import path from "path";

const { parser } = require("./parse.js");

// require("util").inspect.defaultOptions.depth = 10;
import * as Validator from "./validator";
import * as Transpiler from "./transpiler";
import { Color, colorLog, Logger } from "./helpers/logger";
import { compile, compileString } from "./ts-compiler";
import { LOGO } from "./logo";
import { FROST_DIR, PROJECT_DIR } from "./dirs";

export const DEFAULT_OUTPUT = './frost-web-client/dist/generated/index'
export const DEFAULT_INPUT = './frost/schema.fsl'

export async function parseFile(file) {
	let filename = path.basename(file);
	let dirname = path.resolve(PROJECT_DIR, path.dirname(file));
	let fileBasename = path.basename(filename, path.extname(filename));

	Logger.info(`Reading File: (${path.resolve(dirname, filename)})`);

	try {
		const code = (await fs.readFile(path.resolve(dirname, filename)))
			.toString()
			.replaceAll(/(\/\/.*\n*)/g, "\n")
			.replaceAll(/\s*\n+\s*/g, "\n");

		Logger.info("Parsing The File");
		parser.feed(code);

		Logger.info("Validating the schema");
		let validated = Validator.validate(parser.results[0]);

		Logger.info("Generating the code");
		let output = Transpiler.generate(validated);

		Logger.info(`Writing Output to (${path.resolve(dirname, fileBasename + ".result.ts")})`);

		await fs.writeFile(path.resolve(dirname, fileBasename + ".result.ts"), output);
	} catch (error) {
		Logger.exitWithError(error.message);
	}
}

export async function compileFile(_inputFile = DEFAULT_INPUT,output = DEFAULT_OUTPUT) {
	let inputFile = path.resolve(PROJECT_DIR,_inputFile)
	// console.log(PROJECT_DIR,__dirname)
	// console.log(_inputFile , output)
	// console.log(_inputFile === DEFAULT_INPUT,output === DEFAULT_OUTPUT)
	console.log(LOGO)
	let filename = path.basename(inputFile);
	let dirname = path.dirname(inputFile);
	let fileBasename = path.basename(filename, path.extname(filename));

	let outputPath = path.resolve( output === DEFAULT_OUTPUT?FROST_DIR:PROJECT_DIR,output)

	Logger.info(`Reading File: (${path.resolve(dirname, filename)})`);

	try {
		const code = (await fs.readFile(path.resolve(dirname, filename)))
			.toString()
			.replaceAll(/(\/\/.*\n*)/g, "\n")
			.replaceAll(/\s*\n+\s*/g, "\n");

		Logger.info("Parsing The File");
		parser.feed(code);

		Logger.info("Validating the schema");
		let validated = Validator.validate(parser.results[0]);

		Logger.info("Generating the code");
		let transpiled = Transpiler.generate(validated,output !== DEFAULT_OUTPUT);
		let tmpPath = path.resolve(dirname, fileBasename + ".result.ts")

		await fs.writeFile(tmpPath, transpiled);

		let _output = compile([tmpPath]);
		fs.unlink(tmpPath)

		if (!(_output[0].javascript && _output[0].types))  throw new Error("Generating code failed!");
		
		Logger.info(`Writing Output to (${outputPath}.js)`);
		await fs.writeFile(outputPath + ".js", _output[0].javascript);
		
		Logger.info(`Writing Output to (${outputPath}.d.ts)`);
		await fs.writeFile(outputPath + ".d.ts", _output[0].types);
		console.log('\n')
		Logger.success(`Done\n`);
		
	} catch (error) {
		Logger.exitWithError(error.message);
	}
}
export async function parseToJsonSchema(file) {
	let filename = path.basename(file);
	let dirname = path.resolve(PROJECT_DIR, path.dirname(file));
	let fileBasename = path.basename(filename, path.extname(filename));

	Logger.info(`Reading File: (${path.resolve(dirname, filename)})`);

	try {
		const code = (await fs.readFile(path.resolve(dirname, filename)))
			.toString()
			.replaceAll(/(\/\/.*\n*)/g, "\n")
			.replaceAll(/\s*\n+\s*/g, "\n");

		Logger.info("Parsing The File");
		parser.feed(code);

		Logger.info("Validating the schema");
		let output = Validator.validate(parser.results[0]);

		Logger.info(`Writing Output to (${path.resolve(dirname, fileBasename + ".result.json")})`);

		await fs.writeFile(path.resolve(dirname, fileBasename + ".result.json"), JSON.stringify(output, null, 4));
	} catch (error) {
		Logger.exitWithError(error.message);
	}
}