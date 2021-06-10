const rdl = require('readline');
const chalk = require('chalk');

const spinners = {
    dots: {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    },
    dots2: {
        interval: 80,
        frames: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']
    },
    line: {
        interval: 130,
        frames: ['-', '\\', '|', '/']
    },
    arc: {
        interval: 100,
        frames: ['◜', '◠', '◝', '◞', '◡', '◟']
    },
    arrows: {
        interval: 120,
        frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸']
    }
};

class Spinner {
    constructor() {
        this.timer = null;
        this.random = false;
        this.spinnerName = 'dots';
        this.spinnerColor = 'cyan';
    }

    spin(text) {
        process.stderr.write('\x1B[?25l');
        const spin = spinners[this.spinnerName];
        const spinnerFrames = spin.frames;
        const spinnerTimeInterval = spin.interval;
        let index = 0;
        this.timer = setInterval(() => {
            let now = spinnerFrames[index];
            if (now === undefined) {
                index = 0;
                now = spinnerFrames[index];
            }
            if (this.random) this.randomise();
            process.stderr.write(`${chalk.keyword(this.spinnerColor)(now)} ${text}`);
            rdl.cursorTo(process.stderr, 0, now);
            index = index >= spinnerFrames.length ? 0 : index + 1;
        }, spinnerTimeInterval);
    }

    spinner(spinnerName) {
        if (spinnerName) this.spinnerName = spinnerName;
        return this;
    }

    success(text) {
        process.stderr.write(`${chalk.green('✔️')} ${text}\n`);
        clearInterval(this.timer);
        return this;
    }

    fail(text) {
        process.stderr.write(`${chalk.green('❌')}${text}\n`);
        clearInterval(this.timer);
        return this;
    }

    randomise() {
        if (this.random !== true) {
            this.random = true;
            return this;
        }
        const colors = ['red', 'green', 'blue', 'magenta', 'cyan', 'gray'];

        this.setColor(colors[Math.floor(Math.random() * colors.length)]);
        return this;
    }

    color(colorName) {
        this.setColor(colorName);
        return this;
    }

    setColor(colorName) {
        this.spinnerColor = colorName;
    }
}

module.exports = Spinner;
