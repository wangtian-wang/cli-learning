const helpOptions = (program) => {
    program.option('-e --explain', 'a cli for quick start your vue project');
    program.option('-d --dest <dest>', 'a target project folder, such as -d /src/components');
    program.option('-f --framework <framework>', 'the popular web front end frame, such as vue');
    program.on('--help', () => {
    })

};
module.exports = helpOptions;