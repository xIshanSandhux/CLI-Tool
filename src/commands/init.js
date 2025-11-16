// init command 
// This command is used to initialize the cli tool
// it will create a new dir (config folder) in the user's home directory
// it will create a new file (config.json)
// ask user for the API key, provider, model, and cache settings and save it to the config.json file
import { createConfigDir, createConfigFile, updateConfigFile } from '../config/configMain.js';
import inquirer from 'inquirer';

export default function initCommand(program) {
    program.command('init')
    .description('Initialize the CLI tool')
    .action(async () => {
        try {
            await createConfigDir();
            await createConfigFile();

            const userInput = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'apiKey',
                    message: 'Please Enter your API Key: '
                },
                {
                    type: 'list',
                    name: 'provider',
                    message: 'Please Select your AI Provider',
                    choices: ['groq', 'google'],
                    default: 'groq'
                },
                {
                    type: 'input',
                    name: 'model',
                    message: 'Please Enter your Model Name',
                    default: 'llama3.1-8b-instant'
                },
                {
                    type: 'confirm',
                    name: 'cache',
                    message: 'Do you want to enable caching?',
                    default: false
                }
            ]).then(async(userInput) =>{
                await updateConfigFile(userInput);
            }).catch((error) =>{
                console.error(`Error initializing the CLI tool getting user input: ${error}`);
            })
        } catch (error) {
            console.error(`Error initializing the CLI tool: ${error}`);
        }
    })
}