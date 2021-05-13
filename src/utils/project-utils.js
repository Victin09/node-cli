const fs = require('fs');

const generateProjectFolder = async projectName => {
    console.log('projectName', projectName);
    fs.mkdirSync(`./${projectName}`);
    console.log('File folder created');
};

module.exports = generateProjectFolder;
