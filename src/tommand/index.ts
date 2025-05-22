#!/usr/bin/env node

import { Command } from 'commander';
import { createFtuttesCommand } from './modules/commands/create-ftuttes';

const program = new Command();

program
    .name("tommand")
    .description("setup ftuttes project")
    .version("1.0.3");

program.addCommand(createFtuttesCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.help();
}
