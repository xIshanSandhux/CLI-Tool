#!/usr/bin/env node
import { Command } from 'commander';
import initCommand from './src/commands/init.js';
import ConfigCommand from './dist/src/commands/viewConfig.js';
const program = new Command();


initCommand(program);
ConfigCommand(program);
program.parse();