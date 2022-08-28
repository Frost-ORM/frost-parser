@{%
const {lexer} = require('./lexer.js')
const nullify= ()=>null
const isNullOrUndefined= (x)=> x === null || x === undefined
const isNotNullNorUndefined= (x)=> !isNullOrUndefined(x)
const BlockConverter = (arr)=>{
    //let parts = data.filter((x)=> x  && (x?.type !== 'NL' && x?.type !== 'keyword' && x?.type !== 'lCurly'&& x?.type !== 'rCurly') )
    let data = arr.filter(isNotNullNorUndefined)
    return {
        type:data[0].toString(),
        name:data[1],
        values:data[3],
    };
}
const ModelBlockConverter = (arr)=>{
    //let parts = data.filter((x)=> x  && (x?.type !== 'NL' && x?.type !== 'keyword' && x?.type !== 'lCurly'&& x?.type !== 'rCurly') )
    let data = arr.filter(isNotNullNorUndefined)

    return {
        type:data[0].toString(),
        name:data[1],
        ...data[3],
    };
}
const StatementsCollapse = (data)=>{
    // return data.flatMap((x)=>Array.isArray(x)?x:[x]).filter(({type})=>type !== 'NL')


    // return [...data[0],data[2]].filter(Boolean)
    let output = [...data[0]]
    if(data[2]){output.push(data[2])}
    return output.flatMap(x=>x)

}

const StatementConverter = (data)=>{
    let arr = data.filter(isNotNullNorUndefined)
    return {
        name:arr[0],
        value:arr[1]
    }
}
const ModelStatementConverter = (data)=>{
    let arr = data.filter(isNotNullNorUndefined)
    return {
        type:'property',
        name:arr[0],
        propertyType:{
            ...arr[1],
            name:arr[1]['dataType'],
        },
        modifiers:arr[2]
    }
}
const ModelStatementsGroup = (data)=>{
    let output = {properties:[],pragmas:[]}
    for(let statement of data[0]){
        if(statement && statement.type)
        switch(statement.type){
            case 'pragma':
                output.pragmas.push(statement)
                break;
            case 'property':
                output.properties.push(statement)
                break;
        }
    }
    return output
}
const PaddedSpace = (data)=>data[1]
const DoublePaddedSpace = (data)=>data[2]
let count = 0;

const GroupByType = ([data])=>{
    let output = {}
    for(let def of data){
        if(def && def.type)
        output[def.type] = [...(output[def.type]??[]),def]
    }
    return output
}
const first_id = ([a])=>a
const first = ([a])=>[a]
%}
@lexer lexer
# @builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
@builtin "number.ne"
@builtin "string.ne" 

# Recurse[X] -> $X | Recurse[$X,$D] $D $X {% StatementsCollapse %}
Pad[X,D] -> $D $X $D {% ([_,a,])=>a %}

file
    -> %NL:* defs %NL:* {% PaddedSpace %}

defs -> _defs {% GroupByType %}
_defs
    -> def | _defs %NL def 
    {% StatementsCollapse %}


def
    -> model {% id %}
    | type {% id %}
    | enum {% id %}
    


# #region model
model 
    -> _ "model"  _ iden _ %lCurly NL model_statments NL %rCurly
    {% ModelBlockConverter %}

model_statments
    -> _model_statments {% ModelStatementsGroup %}

_model_statments
    -> Pad[model_statment,_] | _model_statments NL Pad[model_statment,_] {% StatementsCollapse %}

model_statment 
    ->  pragma
    |  iden _ data_type {% ModelStatementConverter %}
    |  iden _ data_type _ modifiers {% ModelStatementConverter %}

modifiers
    -> modifier {% first %} | modifiers __ modifier
    {% StatementsCollapse %}

modifier
    -> relation {% id %} 

relation 
    -> %annotate "Relation" %lParen _ %rParen
        {%
        (data)=>({
            type:"relation",
            name:null,
        })
        %}
    | %annotate "Relation" %lParen _ args _ %rParen
    {%
        (data)=>({
            type:"relation",
            name:data[4],
        })
    %}

# #endregion model

# #region type
type 
    -> _ "type" _ iden _ %lCurly _ NL type_statments NL %rCurly _
    {% BlockConverter %}

type_statments
    -> Pad[type_statment,_] | type_statments NL Pad[type_statment,_]
    {% StatementsCollapse %}

type_statment 
    -> iden _ data_type
    {% StatementConverter %}

# #endregion type

# #region Enum
enum 
    -> _ "enum" _ iden _ %lCurly _ NL enum_statments NL %rCurly _
    {% BlockConverter %}

enum_statments
    -> Pad[enum_statment,_]
    | enum_statments NL Pad[enum_statment,_] 
    {% StatementsCollapse %}


enum_statment
    -> iden _ value_assignment:?
    {% StatementConverter %}

# #endregion Enum   

data_type 
    -> iden
        {%
        (data)=>({
            dataType:data[0],
            isArray:false,
            optional:false
        })
        %}
    |iden %arrayMarker 
    {%
        (data)=>({
            dataType:data[0],
            isArray:true,
            optional:false
        })
    %}
    | data_type "?"
    {%
        (data)=>({
            ...data[0],
            optional:true
        })
    %}

value_assignment
    -> %assign _ value
        {%
        (data)=>{
            // let arr = data.filter(isNotNullNorUndefined)
            // return arr[1]
            return data[2]
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
    | btstring {% id %}

pragma
    -> pragma_marker iden %lParen args %rParen
    {% 
        ([type,name,_1,args,_2],reject)=>({type,name,args})
    %} 
    | pragma_marker iden %lParen _ %rParen
    {% 
        ([type,name,],reject)=>({type,name,args:null})
    %} 

args
    -> arg
    | args "," arg
    {% StatementsCollapse%} 

arg
    -> poistional_arg {% id %}
    |  named_arg {% id %}

poistional_args
    -> poistional_arg
    | poistional_args "," poistional_arg
    {% StatementsCollapse %} 

poistional_arg
    -> _ value _ {% PaddedSpace %} 

named_args
    -> named_arg
    | named_args "," named_arg
    {% StatementsCollapse %} 

named_arg
    -> _ iden _ ":" _ value _ {% (args)=> ({name:args[1],value:args[5]})%}


pragma_marker
    -> %pragma
    {% ()=>"pragma" %}



_ -> %WS:* {% nullify %}
__ -> %WS {% nullify %}

NL -> %NL {% nullify %}