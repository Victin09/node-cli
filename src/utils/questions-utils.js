const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');

const messages = require('../constants/messages');
const buildProject = require('../generators/template-generator');
// const generateTemplate = require('./template-utils');

/**
 * Get all options needed to generate project, also check if project folder name exists
 * @returns
 */
const generateProjectConfig = async () => {
    const project = await inquirer.prompt({
        type: 'text',
        name: 'name',
        message: messages.PROJECT_NAME_QUESTION,
        default: path.basename(process.cwd())
    });
    if (fs.existsSync(project.name)) {
        console.log(chalk.yellow('There is a folder with that name ❌, select other project name'));
        generateProjectConfig();
        return;
    }
    const projectConfig = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: messages.PROJECT_SELECTION_QUESTION,
            choices: ['express', 'react', 'vue']
        },
        {
            type: 'list',
            name: 'packageManager',
            message: messages.PACKAGE_MANAGER_QUESTION,
            choices: ['npm', 'yarn']
        },
        {
            type: 'confirm',
            name: 'git',
            message: messages.GIT_QUESTION,
            default: 'yes'
        }
    ]);
    project.config = projectConfig;

    console.info(messages.PROJECT_INFORMATION_START);
    buildProject(project);
};

module.exports = generateProjectConfig;
