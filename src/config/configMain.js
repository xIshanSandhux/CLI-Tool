import { configDirPath, configFilePath } from './paths.js';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

// creates the config directory if it doesn't exist
export async function createConfigDir() {

    try{
        console.log(configDirPath());
        await fsPromises.mkdir(configDirPath());
    } catch (error) {
        console.error(`Error creating config directory: ${error}`)
    }
}

// creates the config file if it doesn't exist
export async function createConfigFile() {
    try{
           await fsPromises.writeFile(configFilePath(), JSON.stringify({}, null, 2)) 
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

export function checkConfigDirExists() {
    console.log(configDirPath());
    if (!fs.existsSync(configDirPath())) {
        return false;
    }else {
        return true;
    }
}

export function checkConfigFileExists() {
    if (!fs.existsSync(configFilePath())) {
        return false;
    }else {
        return true;
    }
}

export async function readConfigFile(){
    try{
        const data = await fsPromises.readFile(configFilePath(), 'utf8');
        return JSON.parse(data);
    }catch (error) {
        console.error(`Error reading config file: ${error}`);
    }
}
