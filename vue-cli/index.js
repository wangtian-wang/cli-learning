#! /usr/bin/env node

const program = require('commander');
const helpOptions = require('./lib/command/options');
const createCommand = require('./lib/command/create');
program.version(require('./package-lock.json').version);

// option 使用--help查看当前所有的命令选项 运行命令 hello -e 让程序为你做一些事情
helpOptions(program);

// 创建项目的命令
createCommand(program);









program.parse(process.argv); // 解析执行hello 命令 后面带的参数
// npm link 将命令连接到全局