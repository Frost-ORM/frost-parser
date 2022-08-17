const fs = require('fs/promises')
const { lexer } = require('./lexer')
const { parser } = require('./parse.js')
require('util').inspect.defaultOptions.depth = 10

async function main(){
await test2()
}

async function test1(){
    const code = (await fs.readFile('./examples/test_1.fs')).toString()
    lexer.reset(code)
    for (const token of lexer) {
        console.log(token) 
    }
}
async function test2(){
    const code = (await fs.readFile('./examples/test_5.fs')).toString()
    parser.feed(code)
    console.log(code,"\n",parser.results)
}
main()