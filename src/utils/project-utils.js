const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const Spinner = require('./spinner-utils');
const messages = require('../constants/messages');

/**
 * Copy files excluding node_modules.
 * @param {*} from path to template
 * @param {*} to project path
 */
const copyFolderSync = (from, to) => {
    const spinner = new Spinner().color('magenta').spinner('arrows');
    spinner.spin(messages.TEMPLATE_INSTALLATION_IN_PROCESS);
    try {
        if (!fs.existsSync(to)) {
            fs.mkdirSync(to);
        }
        fs.readdirSync(from).forEach(element => {
            if (!from.includes('node_modules') && !from.includes('git')) {
                if (fs.lstatSync(path.join(from, element)).isFile()) {
                    fs.copyFileSync(path.join(from, element), path.join(to, element));
                } else {
                    copyFolderSync(path.join(from, element), path.join(to, element));
                }
            }
        });
    } catch (err) {
        spinner.fail(messages.TEMPLATE_INSTALLATION_ERROR);
    }
    spinner.success(messages.TEMPLATE_INSTALLATION_SUCCESS);
};

/**
 * Get started messages
 * @param {name, packageManager} options options to display
 */
const projectGetStarted = options => {
    console.info(chalk.gray(messages.GET_STARTED_INFORMATION));
    console.info(`\t${chalk.gray(messages.CHANGE_DIR_COMMAND(options.name))}`);
    console.info(`\t${chalk.gray(messages.START_COMMAND(options.packageManager))}`);
};

module.exports = { copyFolderSync, projectGetStarted };
