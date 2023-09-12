const createError = require('http-errors')

const sysConst = require("../util/SysConst")
const redis = require("../dao/RedisDAO")
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"AuthBl.js"});


const checkUserToken = (req,res,next) => {
    const accessToken = req.headers[sysConst.HEADER_AUTH_TOKEN];
    if(accessToken == undefined){
        logger.warn("auth failed")
        return next(new createError.Unauthorized());
    }else{
        redis.getStringVal(sysConst.USER_TOKEN_PRE+accessToken,(err,res)=>{
            if(err){
                logger.error(' checkUserToken ' + err.stack);
                return next(new createError.Unauthorized());
            }
            try{
                userInfo = eval("(" + res + ")");
                
                req.params[sysConst.REQUEST_AUTH_NAME] = userInfo
                return next();
            }catch {
                logger.error(' checkUserToken ' + err.stack);
                return next(new createError.Unauthorized());
            }
        })        
    }    
}


module.exports = {
    checkUserToken 
}
