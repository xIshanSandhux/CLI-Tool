#!/usr/bin/env node
import { Command } from 'commander';
import initCommand from './commands/init.js';
import ConfigCommand from './commands/viewConfig.js';
import explainCommand from './commands/explain/explainCommand.js';
import reviewCommand from './commands/review/reviewCommand.js';
const program = new Command();

console.log('Hello World');


initCommand(program);
ConfigCommand(program);
explainCommand(program);
reviewCommand(program);
program.parse();