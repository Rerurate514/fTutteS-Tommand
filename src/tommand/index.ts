#!/usr/bin/env node

import { Command } from 'commander';
import { createFtuttesCommand } from './modules/commands/create-ftuttes';
import { createTransitusCommand } from './modules/commands/create-transitus-ftuttes';

const program = new Command();

program
    .name("tommand")
    .description("setup ftuttes project")
    .version("1.3.1");

program.addCommand(createFtuttesCommand);
program.addCommand(createTransitusCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.help();
}
