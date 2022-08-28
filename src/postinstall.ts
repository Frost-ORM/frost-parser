#!/usr/bin/env node

import { compileFile, DEFAULT_INPUT, DEFAULT_OUTPUT } from '.'
import path from 'path';
import { existsSync } from 'fs';
import { FROST_DIR, PROJECT_DIR } from './dirs';

const npmConfig = require(path.resolve(PROJECT_DIR,'./package.json'))
async function main() {
    
    try {
        if(existsSync(path.resolve(FROST_DIR,'./frost-web-client'))){
            let file:string = (npmConfig?.frost?.schemaPath ?? DEFAULT_INPUT);
            let outputPath: string =  DEFAULT_OUTPUT
        
            await compileFile(file,outputPath)
        }
    } catch (error) {
        
    }


}

main()