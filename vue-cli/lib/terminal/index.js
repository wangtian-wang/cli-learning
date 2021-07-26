/**
 * 让程序自己执行终端命令代码的封装
 */
const { spawn} = require('child_process');
const commandSpawn = (...argus) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(...argus);
        childProcess.stdout.pipe(process.stdout);
        childProcess.stdout.pipe(process.stderr);
        childProcess.on('close', () => {
            resolve();
        })
    })
}
module.exports = {
    commandSpawn
}