const fs = require('fs');
const path = require('path');

const Spinner = require('../utils/spinner-utils');
const messages = require('../constants/messages');
const gitDefault = require('../config/git-default');
const installNodeModules = require('../utils/package-utils');

/**
 * Copy files excluding node_modules.
 * @param {*} templateSrc path to template
 * @param {*} projectPath project path
 */
const copyTemplateFiles = (templateSrc, projectPath) => {
    const spinner = new Spinner().color('magenta').spinner('arrows');
    spinner.spin(messages.TEMPLATE_INSTALLATION_IN_PROCESS);
    const list = fs.readdirSync(templateSrc);
    let src;
    let dst;
    list.forEach(file => {
        src = `${templateSrc}/${file}`;
        dst = `${projectPath}/${file}`;
        const stat = fs.statSync(src);
        // Ignore .git files, node_modules, .eslint, .prettier
        // && !src.includes('eslint') && !src.includes('git') && !src.includes('prettier')
        if (!src.includes('node_modules') && !src.includes('git')) {
            if (stat && stat.isDirectory()) {
                try {
                    fs.mkdirSync(dst);
                } catch (e) {
                    // console.log(`directory already exists: ${dst}`);
                    spinner.fail(messages.TEMPLATE_INSTALLATION_ERROR);
                    process.exit();
                }
            } else {
                try {
                    fs.writeFileSync(dst, fs.readFileSync(src));
                } catch (e) {
                    // console.log(`could't copy file: ${dst}`);
                    spinner.fail(messages.TEMPLATE_INSTALLATION_ERROR);
                    process.exit();
                }
            }
        }
    });
    spinner.success(messages.TEMPLATE_INSTALLATION_SUCCESS);
};

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
    copyTemplateFiles(path.join(__dirname, '../templates/express'), projectOptions.path);
    installNodeModules(projectOptions);
};

module.exports = generateExpressTemplate;
