const { promisify } = require('util');
const { vueRepo } = require('../config-repo/repo-config');
const { commandSpawn } = require('../terminal/index');
const compile = require('../utils/compile');
const { fileWriter, createDir } = require('../utils/writefiles');

const download = promisify(require('download-git-repo'));
const open = require('open');
const path = require('path');

const createProjectAction = async (projectDirectory) => {
    try {
        // download file 
        await download(vueRepo, projectDirectory, { clone: true });
        // exec terminal command
        const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        await commandSpawn(command, ['install'])
        open('http://localhost:8080/');

        await commandSpawn(command, ['run', 'serve'])
    } catch (err) {

    }

};
const addVueComponents = async (compoName, location) => {
    try {
        let res = await compile('vue-components.ejs', { name: compoName, lowername: compoName.toLowerCase() })
        console.log(res)
    } catch (err) {
        console.log(err, 'create new components failed')
    }
    //  将模板写入指定的文件夹
    const targetPath = path.resolve(location, `${compoName}.vue`)
    fileWriter(location, res)
}
const addNewPage = async (compoName, location) => {
    let data = { name: compoName, lowername: compoName.toLowerCase() };
    console.log(data, 'in add new pages data')// 目前为止，这一步是正常的 就是模板编译 ejs.readfile 方法有问题
    let res, resRouter;
    try {
        res = await compile('vue-components.ejs', data)
        resRouter = await compile('vue-router.ejs', data)
    } catch (err) {
        console.log(err, 'create new pages failed')
    }
    //先创建页面的文件夹
    if (createDir(location)) {
        //  将模板写入指定的文件夹
        location = path.resolve(location, compoName.toLocaleLowerCase());
        const targetPath = path.resolve(location, `${compoName}.vue`);
        const targetPathRouer = path.resolve(location, 'router.js')

        fileWriter(targetPath, res);
        fileWriter(targetPathRouer, resRouter);
    }


}
const addStore = async (compoName, location) => {
    let data = { name: compoName, lowername: compoName.toLowerCase() };
    let res, typesResult;
    try {
        res = await compile('vuex-store.ejs', {});
        typesResult = await compile('vuex-types.ejs', {});
    } catch (err) {
        console.log(err, 'create new components failed')
    }
    //先创建页面的文件夹
    if (createDir(location)) {
        //  将模板写入指定的文件夹
        const targetPath = path.resolve(location, `${compoName}.js`);
        const targetPathRouer = path.resolve(location, 'types.js')

        fileWriter(targetPath, res);
        fileWriter(targetPathRouer, resRouter);
    }


}
module.exports = {
    createProjectAction,
    addVueComponents,
    addNewPage,
    addStore
}