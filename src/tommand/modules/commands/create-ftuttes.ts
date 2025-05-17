#!/usr/bin/env node

import { Command } from 'commander';
import path from "path";
import fs from "fs";
import fse from "fs-extra";
import { execSync } from "child_process";
import { fileURLToPath } from 'url';

export const createFtuttesCommand = new Command('create-ftuttes')
    .description('Create a new ftuttes project')
    .argument('<project-name>', 'Name of the project')
    .action((projectName: string) => {
        const projectPath = path.resolve(process.cwd(), projectName);

        if (fs.existsSync(projectPath)) {
            console.error(`Directory "${projectName}" already exists.`);
            process.exit(1);
        }

        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);

        const templatePath = path.resolve(__dirname, "../", "template");

        fse.copySync(templatePath, projectPath);

        updatePackageJson(projectPath, projectName);

        try {
            console.log("Installing dependencies. This may take a while...");
            execSync("npm install", { cwd: projectPath, stdio: "inherit" });
            console.log("Dependencies installed successfully.");
        } catch (err) {
            console.error("Failed to install dependencies:", err);
            process.exit(1);
        }

        console.log(`\nProject "${projectName}" has been created successfully!`);
        console.log(`Navigate to the project directory with:\n  cd ${projectName}`);
        console.log(`Then start using the tommand CLI tool.`);
    });

function updatePackageJson(projectPath: string, projectName: string): void {
    const packageJsonPath = path.join(projectPath, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        console.error("package.json not found in template. Exiting...");
        process.exit(1);
    }

    const raw = fs.readFileSync(packageJsonPath, "utf-8");
    const obj = JSON.parse(raw);

    obj.name = projectName;

    const updated = JSON.stringify(obj, null, 2);
    fs.writeFileSync(packageJsonPath, updated);
}
