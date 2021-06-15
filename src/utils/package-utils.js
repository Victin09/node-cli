const chalk = require('chalk');
const cp = require('child_process');

const Spinner = require('./spinner-utils');
const messages = require('../constants/messages');
const { projectGetStarted } = require('./project-utils');

const installNodeModules = async projectOptions => {
    const options = {
        cwd: projectOptions.path,
        stdio: 'pipe',
        shell: true
    };
    const spinner = new Spinner().color('cyan').spinner('dots');
    spinner.spin(messages.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS);
    return new Promise((resolve, reject) => {
        const child = cp.spawn('npm', ['install'], options);
        child.on('close', code => {
            if (code === 0) {
                resolve(null);
                spinner.success(messages.PACKAGE_MANAGER_INSTALLATION_SUCCEED(projectOptions.name));
                projectGetStarted({ name: projectOptions.name, packageManager: projectOptions.config.packageManager });
            } else {
                reject();
                spinner.fail(chalk.red(messages.RUNNER_EXECUTION_ERROR(`${this.binary}`)));
            }
        });
    });
};

module.exports = installNodeModules;
