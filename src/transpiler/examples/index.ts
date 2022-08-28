import { writeFileSync } from "fs";
import path from "path";
import { generate } from "..";

(async function () {
	// console.log()
	writeFileSync(
		path.resolve(__dirname, process.argv[2].padStart(2, "0") + ".result.ts"),
		generate((await import("./" + process.argv[2].padStart(2, "0") + ".ts")).default)
	);
})();
