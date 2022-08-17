@{%
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

%}
@lexer lexer
@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
@builtin "number.ne" # `_` means arbitrary amount of whitespace
@builtin "string.ne" # `_` means arbitrary amount of whitespace

defs
    -> def | defs %NL:+ def
    {% StatementsCollapse %}

def
    -> %NL:* _def %NL:* {% PaddedSpace %}

_def
    -> model {% id %}
    | type {% id %}
    | enum {% id %}
    


# #region model
model 
    -> "model" _ iden _ %lCurly %NL model_statments %NL %rCurly
    {% BlockConverter %}

model_statments
    -> model_statment | model_statments %NL model_statment
    {% StatementsCollapse %}

model_statment 
    -> _ pragma _  {% PaddedSpace %}
    | _ iden _ data_type _ modifiers:*
    {% ModelStatementConverter %}

modifiers
    -> modifier | modifiers __ modifier
    {% StatementsCollapse %}

modifier
    -> relation {% id %} 

relation 
    -> %annotate "Relation" %lParen _ string:? _ %rParen
    {%
        (data)=>({
            type:"relation",
            name:data[4],
        })
    %}

# #endregion model


# #region type
type 
    -> "type" _ iden _ %lCurly %NL type_statments %NL %rCurly
    {% BlockConverter %}

type_statments
    -> type_statment | type_statments %NL type_statment
    {% StatementsCollapse %}

type_statment 
    -> _ iden _ data_type _
    {% StatementConverter %}

# #endregion type

# #region Enum
enum 
    -> "enum" _ iden _ %lCurly %NL enum_statments %NL %rCurly
    {% BlockConverter %}

enum_statments
    -> enum_statment
    | enum_statments %NL enum_statment 
    {% StatementsCollapse %}


enum_statment
    -> _ iden _ value_assignment:?
    {% StatementConverter %}

# #endregion Enum   


data_type 
    -> iden %arrayMarker:?
    {%
        (data)=>({
            name:data[0],
            isArray:data[1]?.type === 'arrayMarker',

        })
    %}


value_assignment
    -> %assign _ value
        {%
        (data)=>{
            let arr = data.filter(Boolean)
            return arr[1]
        }
        %}
value 
    -> string {% id %} 
    | number {% id %}
    

number
    -> decimal {% id %}

iden
    -> %identifier 
    {% 
        (data)=>{
            return data.toString()
        }
     %}

string
    -> dqstring {% id %}
    | sqstring {% id %}
    | bqstring {% id %}

pragma
    -> pragma_marker iden %lParen args %rParen
    {% 
        ([type,name,_1,args,_2])=>({type,name,args})
    %} 
args
    -> arg
    | args "," arg
    {% StatementsCollapse %} 

arg
    -> null | _ value _ {% PaddedSpace %} 

pragma_marker
    -> %annotate %annotate
    {% ()=>"pragma" %}
# _ -> %WS:*
# __ -> %WS:+