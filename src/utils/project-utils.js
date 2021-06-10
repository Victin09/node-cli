const chalk = require('chalk');

const messages = require('../constants/messages');

const projectGetStarted = options => {
    console.info(chalk.gray(messages.GET_STARTED_INFORMATION));
    console.info(`\t${chalk.gray(messages.CHANGE_DIR_COMMAND(options.name))}`);
    console.info(`\t${chalk.gray(messages.START_COMMAND(options.packageManager))}`);
};

module.exports = projectGetStarted;
