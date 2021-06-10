const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const generateProject = require('./utils/questions-utils');

// Check if package.json exists in the location
const packagePath = path.join(process.cwd(), 'now.json');
const existingPackage = fs.existsSync(packagePath);

// Run cli project setup
const runProjectSetup = async () => {
    generateProject();
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
