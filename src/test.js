const fs =require("fs");
const path =require("path");
const { parser } = require("./parse.js");

require("util").inspect.defaultOptions.depth = 10;


const code = (fs.readFileSync(path.resolve(process.cwd(), process.argv[2])))
			.toString()
			.replaceAll(/(\/\/.*\n*)/g, "\n")
			.replaceAll(/\s*\n+\s*/g, "\n");

		parser.feed(code);
        console.log(parser.results[0])