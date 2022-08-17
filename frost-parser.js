// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const {lexer} = require('./lexer.js')
const BlockConverter = (data)=>{
    //let parts = data.filter((x)=> x  && (x?.type !== 'NL' && x?.type !== 'keyword' && x?.type !== 'lCurly'&& x?.type !== 'rCurly') )
    return {
        type:data[0].toString(),
        name:data[2],
        values:data[6],
    };
}
const StatementsCollapse = (data)=>{
    // return data.flatMap((x)=>Array.isArray(x)?x:[x]).filter(({type})=>type !== 'NL')
    return [...data[0],data[2]]

}

const StatementConverter = (data)=>{
    let arr = data.filter(Boolean)
    return {
        name:arr[0],
        value:arr[1]
    }
}
const ModelStatementConverter = (data)=>{
    return {
        name:data[1],
        value:data[3],
        modifiers:data[5]
    }
}
const PaddedSpace = (data)=>data[1]
const DoublePaddedSpace = (data)=>data[2]
let count = 0;
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": function(d) {return d[1].join(""); }},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": 
        function(d) {
            return JSON.parse("\""+d.join("")+"\"");
        }
        },
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": function(d) { return JSON.parse("\""+d.join("")+"\""); }},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": function(d) {return "'"; }},
    {"name": "strescape", "symbols": [/["\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": 
        function(d) {
            return d.join("");
        }
        },
    {"name": "file$ebnf$1", "symbols": []},
    {"name": "file$ebnf$1", "symbols": ["file$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "file$ebnf$2", "symbols": []},
    {"name": "file$ebnf$2", "symbols": ["file$ebnf$2", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "file", "symbols": ["file$ebnf$1", "defs", "file$ebnf$2"], "postprocess": PaddedSpace},
    {"name": "defs", "symbols": ["def"]},
    {"name": "defs", "symbols": ["defs", (lexer.has("NL") ? {type: "NL"} : NL), "def"], "postprocess": StatementsCollapse},
    {"name": "def", "symbols": ["model"], "postprocess": id},
    {"name": "def", "symbols": ["type"], "postprocess": id},
    {"name": "def", "symbols": ["enum"], "postprocess": id},
    {"name": "model", "symbols": [{"literal":"model"}, "_", "iden", "_", (lexer.has("lCurly") ? {type: "lCurly"} : lCurly), (lexer.has("NL") ? {type: "NL"} : NL), "model_statments", (lexer.has("NL") ? {type: "NL"} : NL), (lexer.has("rCurly") ? {type: "rCurly"} : rCurly)], "postprocess": BlockConverter},
    {"name": "model_statments", "symbols": ["model_statment"]},
    {"name": "model_statments", "symbols": ["model_statments", (lexer.has("NL") ? {type: "NL"} : NL), "model_statment"], "postprocess": StatementsCollapse},
    {"name": "model_statment", "symbols": ["_", "pragma", "_"], "postprocess": PaddedSpace},
    {"name": "model_statment$ebnf$1", "symbols": []},
    {"name": "model_statment$ebnf$1", "symbols": ["model_statment$ebnf$1", "modifiers"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "model_statment", "symbols": ["_", "iden", "_", "data_type", "_", "model_statment$ebnf$1"], "postprocess": ModelStatementConverter},
    {"name": "modifiers", "symbols": ["modifier"]},
    {"name": "modifiers", "symbols": ["modifiers", "__", "modifier"], "postprocess": StatementsCollapse},
    {"name": "modifier", "symbols": ["relation"], "postprocess": id},
    {"name": "relation$ebnf$1", "symbols": ["args"], "postprocess": id},
    {"name": "relation$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "relation", "symbols": [(lexer.has("annotate") ? {type: "annotate"} : annotate), {"literal":"Relation"}, (lexer.has("lParen") ? {type: "lParen"} : lParen), "_", "relation$ebnf$1", "_", (lexer.has("rParen") ? {type: "rParen"} : rParen)], "postprocess": 
        (data)=>({
            type:"relation",
            name:data[4],
        })
            },
    {"name": "type", "symbols": [{"literal":"type"}, "_", "iden", "_", (lexer.has("lCurly") ? {type: "lCurly"} : lCurly), (lexer.has("NL") ? {type: "NL"} : NL), "type_statments", (lexer.has("NL") ? {type: "NL"} : NL), (lexer.has("rCurly") ? {type: "rCurly"} : rCurly)], "postprocess": BlockConverter},
    {"name": "type_statments", "symbols": ["type_statment"]},
    {"name": "type_statments", "symbols": ["type_statments", (lexer.has("NL") ? {type: "NL"} : NL), "type_statment"], "postprocess": StatementsCollapse},
    {"name": "type_statment", "symbols": ["_", "iden", "_", "data_type", "_"], "postprocess": StatementConverter},
    {"name": "enum", "symbols": [{"literal":"enum"}, "_", "iden", "_", (lexer.has("lCurly") ? {type: "lCurly"} : lCurly), (lexer.has("NL") ? {type: "NL"} : NL), "enum_statments", (lexer.has("NL") ? {type: "NL"} : NL), (lexer.has("rCurly") ? {type: "rCurly"} : rCurly)], "postprocess": BlockConverter},
    {"name": "enum_statments", "symbols": ["enum_statment"]},
    {"name": "enum_statments", "symbols": ["enum_statments", (lexer.has("NL") ? {type: "NL"} : NL), "enum_statment"], "postprocess": StatementsCollapse},
    {"name": "enum_statment$ebnf$1", "symbols": ["value_assignment"], "postprocess": id},
    {"name": "enum_statment$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "enum_statment", "symbols": ["_", "iden", "_", "enum_statment$ebnf$1"], "postprocess": StatementConverter},
    {"name": "data_type$ebnf$1", "symbols": [(lexer.has("arrayMarker") ? {type: "arrayMarker"} : arrayMarker)], "postprocess": id},
    {"name": "data_type$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "data_type", "symbols": ["iden", "data_type$ebnf$1"], "postprocess": 
        (data)=>({
            name:data[0],
            isArray:data[1]?.type === 'arrayMarker',
        
        })
            },
    {"name": "value_assignment", "symbols": [(lexer.has("assign") ? {type: "assign"} : assign), "_", "value"], "postprocess": 
        (data)=>{
            let arr = data.filter(Boolean)
            return arr[1]
        }
        },
    {"name": "value", "symbols": ["string"], "postprocess": id},
    {"name": "value", "symbols": ["number"], "postprocess": id},
    {"name": "number", "symbols": ["decimal"], "postprocess": id},
    {"name": "iden", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess":  
        (data)=>{
            return data.toString()
        }
             },
    {"name": "string", "symbols": ["dqstring"], "postprocess": id},
    {"name": "string", "symbols": ["sqstring"], "postprocess": id},
    {"name": "string", "symbols": ["bqstring"], "postprocess": id},
    {"name": "pragma$ebnf$1", "symbols": ["args"], "postprocess": id},
    {"name": "pragma$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "pragma", "symbols": ["pragma_marker", "iden", (lexer.has("lParen") ? {type: "lParen"} : lParen), "pragma$ebnf$1", (lexer.has("rParen") ? {type: "rParen"} : rParen)], "postprocess":  
        ([type,name,_1,args,_2])=>({type,name,args})
            },
    {"name": "args", "symbols": ["arg"]},
    {"name": "args", "symbols": ["args", {"literal":","}, "arg"], "postprocess": StatementsCollapse},
    {"name": "arg", "symbols": ["poistional_arg"], "postprocess": id},
    {"name": "arg", "symbols": ["named_arg"], "postprocess": id},
    {"name": "poistional_args", "symbols": ["poistional_arg"]},
    {"name": "poistional_args", "symbols": ["poistional_args", {"literal":","}, "poistional_arg"], "postprocess": StatementsCollapse},
    {"name": "poistional_arg", "symbols": ["_", "value", "_"], "postprocess": PaddedSpace},
    {"name": "named_args", "symbols": ["named_arg"]},
    {"name": "named_args", "symbols": ["named_args", {"literal":","}, "named_arg"], "postprocess": StatementsCollapse},
    {"name": "named_arg", "symbols": ["_", "iden", "_", {"literal":":"}, "_", "value", "_"], "postprocess": (args)=> ({name:args[1],value:args[5]})},
    {"name": "pragma_marker", "symbols": [(lexer.has("annotate") ? {type: "annotate"} : annotate), (lexer.has("annotate") ? {type: "annotate"} : annotate)], "postprocess": ()=>"pragma"}
]
  , ParserStart: "file"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
