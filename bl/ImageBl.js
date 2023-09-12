const createError = require('http-errors')

const config = require("../config")
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"ImageBl.js"});
const resUtil = require('../util/ResUtil.js');

const uploadImage = async(req,res,next) => {
    const bodyParams = req.body;
    console.log(req)
    console.log(req.body)
    console.log(req.file)
    resUtil.successRes(res,{},'')

}

module.exports ={
    uploadImage
}