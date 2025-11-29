#!/usr/bin/env node
import { Command } from 'commander';
import initCommand from './commands/init.js';
import ConfigCommand from './commands/viewConfig.js';
import explainCommand from './commands/explain/explainCommand.js';
import reviewCommand from './commands/review/reviewCommand.js';
const program = new Command();


program.name('acli')
.description('An AI-powered coding assistant for explaining, reviewing, and improving your code — right from the terminal.')
.version('0.1.0');


initCommand(program);
ConfigCommand(program);
explainCommand(program);
reviewCommand(program);
program.parse();