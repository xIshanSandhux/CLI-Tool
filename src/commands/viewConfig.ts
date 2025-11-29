// viewConfig command
// This command will show the user the current config
import { Command } from 'commander';
import { readConfigFile, checkConfigFileExists, updateConfigFile } from '../config/configMain.js';
import { updateConfigQuestions } from '../config/questions.js';
import chalk from 'chalk';
import inquirer from 'inquirer';

export default function ConfigCommand(program: Command) {
    program.command('config')
    .description('View or update current config')
    .option('-v, --view', 'View current config')
    .option('-u, --update', 'Update current config')
    .action(async (options)=>{
        let currentConfig: Record<string, string>;
        if(checkConfigFileExists()){
            currentConfig = await readConfigFile();
        }else{
            throw new Error(chalk.red('No config file found. Please run `acli init` to create one.'));
        }
        if('view' in options ){
            const heading : string = '⚙️ Current Config';
            console.log(chalk.bold(heading));
            console.log(chalk.dim("───────────────────────"));

            Object.keys(currentConfig).forEach((key:string) =>{
                console.log(chalk.cyan(key), `: ${currentConfig[key]}`)
            })
            console.log(chalk.dim("────────────────────────"));
        }
        if('update' in options ){
            console.log("🔧 Config Update");
            console.log(chalk.dim("───────────────────────"));
            const questions = await updateConfigQuestions();
            const answers = await inquirer.prompt(questions)
            await updateConfigFile(answers);
            console.log(chalk.dim("───────────────────────"));
        }

    })
}
