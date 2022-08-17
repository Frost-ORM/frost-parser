const nearley = require("nearley")
const grammar = require("./frost-parser.js")

module.exports.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))