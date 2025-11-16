#!/usr/bin/env node
import { Command } from 'commander';
import initCommand from './src/commands/init.js';
const program = new Command();

initCommand(program);
program.parse();


