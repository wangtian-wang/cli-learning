const ejs = require('ejs');
const path = require('path');
const compile = (template, data) => {
    const templateLocation = `../templates/${template}`;
    const templatePath = path.resolve(__dirname, templateLocation);
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, { data }, {}, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result)
        })
    })

}
module.exports = compile