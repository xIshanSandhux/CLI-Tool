import { configDirPath, configFilePath } from './paths.js';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

// creates the config directory if it doesn't exist
export async function createConfigDir() {

    try{
        if (!fs.existsSync(configDirPath())) {
            await fsPromises.mkdir(configDirPath());
        }else{
        }
    } catch (error) {
        console.error(`Error creating config directory: ${error}`)
    }
}

// creates the config file if it doesn't exist
export async function createConfigFile() {
    try{
        if (!fs.existsSync(configFilePath())) {
           await fsPromises.writeFile(configFilePath(), JSON.stringify({}, null, 2)) 
        }else {
            console.debug('Config file already exists');
        }
    }catch (error) {
        console.error(`Error creating config file: ${error}`);
    }
}

// updates the config file with the user's input
export async function updateConfigFile(config) {
    try{
        await fsPromises.writeFile(configFilePath(), JSON.stringify(config, null, 2))
    }catch (error) {
        console.error(`Error updating config file: ${error}`);
    }
}
