const path = require('path');
const fs = require('fs');

const Spinner = require('../utils/spinner-utils');
const messages = require('../constants/messages');
const generateExpressTemplate = require('./express-generator');

/**
 * Check the projet type and calls to apropiate function
 * @param {*} projectOptions All project options needed to generate files
 */
const generateTemplate = projectOptions => {
    switch (projectOptions.config.type) {
        case 'express':
            generateExpressTemplate(projectOptions);
            break;
        case 'react':
            break;
        case 'nextjs':
            break;
        case 'vue':
            break;
        default:
            break;
    }
};

/**
 * Generate project folder if name is not equals to create folder. Calls next stage
 * @param {*} projectOptions All project options needed to generate files
 * @returns
 */
const generateProjectFolder = projectOptions => {
    const spinner = new Spinner().color('yellow').spinner('line');
    spinner.text = messages.PROJECT_FOLDER_IN_PROGRESS;
    const projectName = projectOptions.name;
    const options = projectOptions;
    if (projectName !== '.' && path.basename(process.cwd()) !== projectName) {
        try {
            spinner.spin();
            const projectPath = path.join(process.cwd(), projectName);
            fs.mkdirSync(projectPath);
            options.path = projectPath;
            spinner.success(messages.PROJECT_FOLDER_SUCCESS);
            generateTemplate(options);
            return;
        } catch (error) {
            console.log(error);
            spinner.fail(messages.PROJECT_FOLDER_ERROR);
            process.exit();
        }
    }
    options.path = process.cwd();
    generateTemplate(options);
};

module.exports = generateProjectFolder;
