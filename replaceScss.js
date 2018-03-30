var fs = require("fs");
 
readDir(__dirname + '/src/app');
 
function readDir(path) {  
    fs.readdir(path,function(err, dirContent) {
        if(!dirContent) {
           return;
        }
        dirContent.forEach(function(ele) {
            fs.stat(path+"/"+ele, function(err, info){
                if (info.isDirectory()) {
                    readDir(path+"/" + ele);
                } else if (info.isFile()) {
                    if (getFileType(ele) === 'scss' && path.indexOf('/share/css') === -1) {
                        console.log("file: " + ele);
                        fs.readFile(path+"/" + ele, function(err, data){
                            if(err){
                                return console.log(err);
                            }
                            let newContent = replaceContent(data.toString());
                            if (newContent !== data.toString()) {
                                fs.writeFile(path+"/" + ele, newContent, function(err) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                }); 
                            }
                        });
                    }
                }
            });
        });        
    });
}
 
function getFileType(fileName) {
    var splitName = fileName.split('.');
    let splitLength = splitName.length;
    var type = splitName[splitLength - 1];
    return type;
}
 
function replaceContent(content) {
    if (!/_loader.scss/g.test(content)) {
        content = '@import \'src/app/share/css/_loader.scss\';\n' + content;
    }
    content = remToPx(content);
    return content;
}
 
function pxToRem(content) {
    return content.replace(/([:\s])(-?\d+.?\d?)px/g, '$1' + 'rem(' + '$2' + ')');
}
 
function remToPx(content) {
    return content.replace(/rem\((-?\d+.?\d?)\)/g, '$1' + 'px');
}