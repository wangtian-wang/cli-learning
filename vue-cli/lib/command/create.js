const { createProjectAction, addVueComponents, addNewPage } = require('../command/actions')
const createCommand = (program) => {
    program
        .command('create <project name> [other...]')
        .description('clone a repo in your project')
        .action(createProjectAction);
    program
        .command('addcompo <conponent name>')
        .description('add vue component such as hello addcompo HeaderBar -d src/components')
        .action((name) => {
            addVueComponents(name, program.dest || 'src/components')
        });
    program
        .command('addpages <pages name>')
        .description('add vue component  pages such as page hello.vue and router HeaderBar -d src/router')
        .action((name) => {
            addNewPage(name, program.dest || 'src/pages')
        });
    program
        .command('addstore <vue store>')
        .description('add vuex')
        .action((name) => {
            addStore(name, program.dest || 'src/store/modules')
        });

}
module.exports = createCommand