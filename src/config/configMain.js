import { configDirPath, configFilePath } from './paths.js';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

console.log(configDirPath());
console.log(configFilePath());

// creates the config directory if it doesn't exist
export async function createConfigDir() {

    try{
        if (!fs.existsSync(configDirPath())) {
            console.debug('Config directory not found');
            await fsPromises.mkdir(configDirPath());
            console.debug('Config directory created');
        }else{
            console.debug('Config directory found');
        }
    } catch (error) {
        console.error(`Error creating config directory: ${error}`)
    }
}

// creates the config file if it doesn't exist
export async function createConfigFile() {
    try{
        
        const defaultConfig = {
            apiKey: "",
            provider: "groq",
            model: "xyz",
            cache: true
        };

        if (!fs.existsSync(configFilePath())) {
           await fsPromises.writeFile(configFilePath(), JSON.stringify(defaultConfig, null, 2)) 
           console.debug('Config file created');
        }else {
            console.debug('Config file already exists');
        }

    }catch (error) {
        console.error(`Error creating config file: ${error}`);
    }
}
createConfigDir();
createConfigFile();
