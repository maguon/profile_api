const fs = require('fs');
const createError = require('http-errors')

const config = require("../config")
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"ImageBl.js"});
const resUtil = require('../util/ResUtil.js');

const imagePath = "./uploads/"
const uploadImage = async(req,res,next) => {
    fs.rename(req.files.file.tempFilePath, imagePath+ req.files.file.name,(err ,s)=>{
        if(err){
            logger.error("sendProfileEmail" ,{message:err.stack})
            resUtil.failedRes(res,{},'failed');
        }else{
            logger.info('uploadImage success '+ req.files.file.name)
            resUtil.successRes(res,{url: req.files.file.name},'')
        }
    });
}

module.exports ={
    uploadImage
}