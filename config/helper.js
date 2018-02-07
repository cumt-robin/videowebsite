var path = require('path');
 
const dirRoot = path.resolve(__dirname, '../');
 
function getRoot(subPath) {
    return path.join(dirRoot, subPath);
}
 
exports.getRoot = getRoot;