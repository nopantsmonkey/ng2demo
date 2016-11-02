/**
 * Created by Aamir on 15/05/2016.
 */
var path = require('path');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function projectRoot(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [process.cwd()].concat(args));
}

function modulesRoot(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [process.cwd() + '/node_modules'].concat(args));
}

module.exports = {
    root: root,
    projectRoot: projectRoot,
    modulesRoot: modulesRoot
};