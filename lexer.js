const moo = require("moo")

module.exports.lexer = moo.compile({
    WS: /[ \t]+/,
    comment: /\/\/.*?$/,
    keyword: ["model","type","Relation","enum"],
    annotate: '@',
    lCurly: '{',
    rCurly: '}',
    arrayMarker: '[]',
    lBracket: '[',
    rBracket: ']',
    lParen: '(',
    rParen: ')',
    // className: /[A-Z]\w*/,
    identifier: /[a-zA-Z]\w*/,
    assign: '=',
    quote: /'|"|`/,
    comma: /,/,
    number: /0|[1-9]\d*/,
    colon:':',
    NL: {match: /\n+/,lineBreaks:true},

})