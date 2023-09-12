const fs = require("fs")
const path = require('path');
const zipFolder = require('zip-a-folder');

const createDir = (dirName,callback) => {
    dirPath = path.join('./zip',dirName)
    fs.mkdir(dirPath,err=>callback(err))
}

const removeDir = (dirName,callback) => {
    dirPath = path.join('./zip',dirName)
    //删除目录以及下属的文件及文件夹
    fs.rmdir(dirPath,{recursive:true},err=>callback(err))
}

const zipDir = async (dirName) => {  
    dirPath  =path.join('./zip',dirName)
    zipName = path.join('./zip',dirName+".zip")
    return zipFolder.zip(dirPath, zipName);    
}

module.exports = {
    createDir,
    removeDir,
    zipDir
}

