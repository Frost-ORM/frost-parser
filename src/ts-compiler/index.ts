import * as ts from "typescript";

// export function compile(fileNames: string[], options: ts.CompilerOptions =  {
//     noEmitOnError: true,
//     noImplicitAny: false,
//     target: ts.ScriptTarget.ESNext,
//     module: ts.ModuleKind.CommonJS
//   }): void {
//   let program = ts.createProgram(fileNames, options);
//   let emitResult = program.emit();

//   let allDiagnostics = ts
//     .getPreEmitDiagnostics(program)
//     .concat(emitResult.diagnostics);

//   allDiagnostics.forEach(diagnostic => {
//     if (diagnostic.file) {
//       let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
//       let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
//       console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
//     } else {
//       console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
//     }
//   });

//   let exitCode = emitResult.emitSkipped ? 1 : 0;
//   console.log(`Process exiting with code '${exitCode}'.`);
//   process.exit(exitCode);
// }

export function compile(
	fileNames: string[],
	_options: ts.CompilerOptions = {
		noImplicitAny: false,
		target: ts.ScriptTarget.ES5,
		module: ts.ModuleKind.CommonJS,
    allowJs: true,
    declaration: true,
	}
) {
  let options = {..._options,  allowJs: true,declaration: true,}
	// Create a Program with an in-memory emit
	const createdFiles = {};
	const host = ts.createCompilerHost(options);
	host.writeFile = (fileName: string, contents: string) => {
    // console.log({fileName,contents})
    return (createdFiles[fileName] = contents);
  }

	// Prepare and emit the d.ts files
	const program = ts.createProgram(fileNames, options, host);
	program.emit();

	// Loop through all the input files
  
	return fileNames.map((file) => {
    let javascript = createdFiles[file.replace(".ts", ".js")]
    let types = createdFiles[file.replace(".ts", ".d.ts")]
    return ({
		javascript,
		types ,
	})});
}

export function compileString(source: string) {
	let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, declaration: true } });
	return result.outputText;
}
