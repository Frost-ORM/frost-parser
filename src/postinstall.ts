#!/usr/bin/env node

import { compileFile, DEFAULT_INPUT, DEFAULT_OUTPUT } from '.'
import path from 'path';
import { existsSync } from 'fs';
import { FROST_DIR, PROJECT_DIR } from './dirs';

const npmConfig = require(path.resolve(PROJECT_DIR,'./package.json'))
async function main() {
	let final_input = npmConfig?.frost?.schema?.path ?? npmConfig?.frost?.schemaPath ?? DEFAULT_INPUT
    
    try {
        if(existsSync(path.resolve(FROST_DIR,'./frost-web-client')) && existsSync(path.resolve(PROJECT_DIR,final_input))){
            let file:string = (final_input);
            let outputPath: string =  DEFAULT_OUTPUT
        
            await compileFile(file,outputPath)
        }
    } catch (error) {
        
    }


}

main()