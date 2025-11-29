import inquirer from 'inquirer';
import { updateConfigFile } from './configMain.js';
import { readConfigFile } from './configMain.js';
import { checkConfigFileExists } from './configMain.js';
import chalk from 'chalk';


interface Questions {
    type: string;
    name: string;
    message: string;
    choices?: string[];
    default?: string |boolean;
}
// questions for the user to answer
export function initQuestions() :Questions[] {
    return [
        {
            type: 'input',
            name: 'apiKey',
            message: 'Please Enter your API Key: '
        },
        {
            type: 'list',
            name: 'provider',
            message: 'Please Select your AI Provider: ',
            choices: ['openrouter'],
            default: 'openrouter'
        },
        {
            type: 'input',
            name: 'model',
            message: 'Please Enter your Model Name: ',
            default: 'x-ai/grok-4.1-fast'
        },
        {
            type: 'confirm',
            name: 'cache',
            message: 'Do you want to enable caching? ',
            default: false
        }
    ] 
}

// asking user questions and updating the config file
export async function askingUserQuestions() : Promise<void>{
    await inquirer.prompt(initQuestions()).then(async(userInput) =>{
        await updateConfigFile(userInput);
    }).catch((error) =>{
        console.error(`Error initializing the CLI tool getting user input: ${error}`);
    })
}

export async function updateConfigQuestions()  {
    if(!checkConfigFileExists()){
        throw new Error(chalk.red('No config file found. Please run `ai init` to create one.'));
    }
    const currentConfig = await readConfigFile();
    const questions = [];
    for (const key in currentConfig) {
        questions.push({
            'type': currentConfig[key] === 'cache'? 'confirm' : 'input',
            'name': key,
            'message': `Please Enter your updated ${key}, the default will be displayed in the format (current value): `,
            'default': currentConfig[key]
        })
    }
    return questions;
}