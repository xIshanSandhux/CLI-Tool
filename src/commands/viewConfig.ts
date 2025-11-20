// viewConfig command
// This command will show the user the current config
import { Command } from 'commander';

export default function ConfigCommand(program: Command) {
    program.command('config')
    .option('-v, --view', 'View Current Config')
    .option('-u, --update', 'Update Config')
    .action((options)=>{
       
    })

}
