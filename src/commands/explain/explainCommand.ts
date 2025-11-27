import { chat } from "../../LLM/llm.js";
import { Messages } from "../../LLM/MessageInterface.js";
import { Command } from "commander";
import fs from 'node:fs';
import path from 'node:path';


export default function explainCommand(program: Command){

    program.command('explain')
    .description('Explain full code file or specific code block (line numbers)')
    .option('-f, --file <filePath>', 'Path to the code file to explain')
    .action(async (options)=>{
        
        let systemPrompt: string = '';
        let fileContent: string = '';
        let filePath: string = '';
        try{
            systemPrompt = fs.readFileSync('src/commands/explain/sysPrompt.md', 'utf8');
            filePath = path.resolve(options.file);
            fileContent = fs.readFileSync(path.resolve(options.file), 'utf8');
            console.log(`File length before white space removal: ${fileContent.length}`);
            const TrimmedSpaceRemoved : string = fileContent.replace(/[ \t]+$/gm,"");
            const removeBlankLines : string = TrimmedSpaceRemoved.replace(/^\s*$/gm,"");
            fileContent = removeBlankLines;
        }catch(error){
            console.error(`Error reading system prompt: ${error}`);
        }
        const messages: Messages[] =[
            {'role': 'system', 'content': systemPrompt},
            {'role':'user', 'content': `Explain the code: ${fileContent}`}
        ]
        console.log(messages);
        console.log(options);
        if('file' in options){
            const response = await chat(options.file, messages);
            // console.log(marked.parse(response));
            // console.log(md.render(response));
            console.log(response);
        }else{
            console.error('No file path provided');
        }
    })

}