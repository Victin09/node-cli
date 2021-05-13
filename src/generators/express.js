const inquirer = require('inquirer');
const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const expressJavaScriptJSON = require('../templates/express/express-js/package.json');
const expressTypeScriptJSON = require('../templates/express/express-ts/package.json');

const generateTypeScriptProject = async projectName => {
    expressTypeScriptJSON.name = projectName;
    await fse.copy(path.join(__dirname, '../templates/express/express-ts'), path.join(__dirname, projectName));
    console.log(chalk.green('Express TypeScript project created'));
};

const generateJavaScriptProject = async projectName => {
    expressJavaScriptJSON.name = projectName;
    await fse.copy(path.join(__dirname, '../templates/express/express-js'), path.join(__dirname, projectName));
    console.log(chalk.green('Express project created'));
};

const generateExpressProject = async projectName => {
    const typescript = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'typescript',
            message: 'This project will use TypeScript? 📦',
            default: 'yes'
        }
    ]);

    if (typescript) generateTypeScriptProject(projectName);
    else generateJavaScriptProject(projectName);
};

module.exports = generateExpressProject;
