import {Command} from 'commander';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { Messages } from '../../LLM/MessageInterface.js';
import { chat } from '../../LLM/llm.js';
import chalk from 'chalk';
import pager from 'less-pager-mini';

export default function reviewCommand(program: Command){
    program.command('review')
    .description('AI powered code review and feedback')
    .requiredOption('-f, --file <filePath>', 'Path (absolute or relative) to the code file to be reviewed')
    .action(async (options)=>{
        let systemPrompt: string = '';
        let fileContent: string = '';

        if(options.file){
            try{
                console.log("🔍 " + chalk.yellow("Searching File..."))
                systemPrompt = await readSystemPrompt('src/commands/review/sysPrompt.md');
                fileContent = await readFileContent(options.file);
                console.log("📄 " + chalk.green("File Found!"))
                console.log("📖 "+chalk.blue("Reading File..."))
                fileContent = fileContent.replace(/[ \t]+$/gm,"").replace(/\r\n/g, "\n") .replace(/(^[ \t]*\n){2,}/gm, "\n");
            }catch(error){
                console.error(`Error : ${error}`);
                throw error;
            }
            const messages: Messages[] =[
                {'role': 'system', 'content': systemPrompt},
                {'role':'user', 'content': `Review the code: ${fileContent}`}
            ]
            
            console.log("🧠 "+chalk.magenta("Reviewing Code..."));
            const response = await chat(messages);
            const finalResponse = "💡 "+chalk.yellow("Review Feedback: \n") + response;
            await pager(finalResponse);

        }else{
            throw new Error('No file path provided');
        }
    })
}

async function readSystemPrompt(filePath: string): Promise<string>{

    try{
        const curFilePath = path.resolve(filePath)
        const fileContent = await fsPromises.readFile(curFilePath, 'utf8')
        return fileContent;
    } catch(error){
        console.error(`Error reading system prompt: ${error}`);
        throw error;
    }
}

async function readFileContent(filePath: string): Promise<string>{
    try{
        const curFilePath = path.resolve(filePath)
        const fileContent = await fsPromises.readFile(curFilePath, 'utf8')
        return fileContent;
    } catch(error){
        console.error(`Error reading file content: ${error}`);
        throw error;
    }
}
