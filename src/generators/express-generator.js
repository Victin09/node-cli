const fs = require('fs');
const path = require('path');

const Spinner = require('../utils/spinner-utils');
const messages = require('../constants/messages');
const gitDefault = require('../config/git-default');
const { copyFolderSync } = require('../utils/project-utils');
const installNodeModules = require('../utils/package-utils');

/**
 * Initialize Git repository
 * @param {*} projectPath Destination path
 */
const initGitRepository = async projectPath => {
    const spinner = new Spinner().color('yellow').spinner('dots');
    try {
        spinner.text = messages.GIT_INITIALIZATION_IN_PROGRESS;
        spinner.spin();
        fs.writeFileSync(path.join(projectPath, '.gitignore'), gitDefault);
        spinner.success(messages.GIT_INITIALIZATION_SUCCESS);
    } catch (error) {
        spinner.fail(messages.GIT_INITIALIZATION_ERROR);
        process.exit();
    }
};

/**
 * Generate a express project by stages
 * @param {*} projectOptions All project options needed to generate files
 */
const generateExpressTemplate = async projectOptions => {
    if (projectOptions.config.git) initGitRepository(projectOptions.path);
    copyFolderSync(path.join(__dirname, '../templates/express'), projectOptions.path);
    installNodeModules(projectOptions);
};

module.exports = generateExpressTemplate;
