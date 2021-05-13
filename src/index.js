const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const createProjectFolder = require('./utils/project-utils');
const generateExpressProject = require('./generators/express');

// Check if package.json exists in the location
const packagePath = path.join(process.cwd(), 'now.json');
const existingPackage = fs.existsSync(packagePath);

// Run cli project setup
const runProjectSetup = async () => {
    const projectSetup = await inquirer.prompt([
        // Ask for package manager
        // {
        //     type: 'list',
        //     name: 'type',
        //     message: 'What type of project? 📦',
        //     choices: ['express', 'react', 'vue']
        // },
        {
            type: 'list',
            name: 'type',
            message: 'What type of project? 📦',
            choices: ['express', 'react', 'vue']
        },
        {
            type: 'text',
            name: 'projectName',
            message: 'What is the name of the project? 🤔',
            default: path.basename(process.cwd())
        }
    ]);
    if (projectSetup.projectName !== '.') createProjectFolder(projectSetup.projectName);
    switch (projectSetup.type) {
        case 'express':
            generateExpressProject(projectSetup.projectName);
            break;
        default:
            break;
    }
};

// Run CLI
const runCLI = () => {
    if (existingPackage) {
        inquirer
            .prompt([
                {
                    type: 'confirm',
                    name: 'overwritePackage',
                    message: '🚫🚨 package.json already exists. Would you like to overwrite it? 🚨🚫',
                    default: false
                }
            ])
            .then(answers => {
                if (answers.overwritePackage) {
                    runProjectSetup();
                } else {
                    console.log(chalk.blue('Goodbye! 👋'));
                }
            });
    } else {
        runProjectSetup();
    }
};

module.exports = runCLI;
