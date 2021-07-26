const fs = require('fs');
const path = require('path');
const fileWriter = (path, data) => {
    return fs.promises.writeFile(path, data)
}
const createDir = (pathname) => {
    if (fs.existsSync(pathname)) {
        return true;
    } else {
        if (createDir(path.dirname(pathname))) {
            fs.mkdirSync(pathname);
            return true
        }
    }
}
module.exports = { fileWriter, createDir }