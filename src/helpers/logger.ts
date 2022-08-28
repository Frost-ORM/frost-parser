export enum Color {
	Reset = "\x1b[0m",
	Bright = "\x1b[1m",
	Dim = "\x1b[2m",
	Underscore = "\x1b[4m",
	Blink = "\x1b[5m",
	Reverse = "\x1b[7m",
	Hidden = "\x1b[8m",

	FgBlack = "\x1b[30m",
	FgRed = "\x1b[31m",
	FgGreen = "\x1b[32m",
	FgYellow = "\x1b[33m",
	FgBlue = "\x1b[34m",
	FgMagenta = "\x1b[35m",
	FgCyan = "\x1b[36m",
	FgWhite = "\x1b[37m",

	BgBlack = "\x1b[40m",
	BgRed = "\x1b[41m",
	BgGreen = "\x1b[42m",
	BgYellow = "\x1b[43m",
	BgBlue = "\x1b[44m",
	BgMagenta = "\x1b[45m",
	BgCyan = "\x1b[46m",
	BgWhite = "\x1b[47m",

	LCERROR = "\x1b[31m", //red
	LCWARN = "\x1b[33m", //yellow
	LCINFO = "\x1b[36m", //cyan
	LCSUCCESS = "\x1b[32m", //green
}

export function colorString(color, string) {
	return `${color}${string}${Color.Reset}`;
}

export function colorLog(color, ...args) {
	console.log(...args.map((it) => (typeof it === "string" ? colorString(color, it) : it)));
}

export class Logger {
	static error(message, ...optionalParams) {
		console.error(Color.LCERROR, message, ...optionalParams);
	}
	static exitWithError(message, ...optionalParams) {
		this.error(message, ...optionalParams);
		process.exit(1);
	}
	// static assert(condition,message, ...optionalParams) {
	// 	console.assert(condition,colorString(Color.LCERROR,"\n"+ message), ...optionalParams);
	// 	process.exit(1);
	// }
	static warn(message, ...optionalParams) {
		console.warn(Color.LCWARN, message, ...optionalParams);
	}
	static info(message, ...optionalParams) {
		console.info(Color.LCINFO, message, ...optionalParams);
	}
	static success(message, ...optionalParams) {
		console.info(Color.LCSUCCESS, message, ...optionalParams);
	}
}
