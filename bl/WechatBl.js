const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"WechatBl.js"});
const httpUtil = require('../util/HttpUtil.js');
const resUtil = require('../util/ResUtil.js');
const sysConst = require('../util/SysConst.js');
const config = require ('../config')
const getUserIdByCode = (req,res,next) =>{
    
    const paramObj = {
        appid : config.wechatConfig.mpAppId,
        secret : config.wechatConfig.mpSecret,
        js_code : req.params.code,
        grant_type : 'authorization_code'
    }
    const headers = {'Content-Type':'application/json;charset=utf-8'}
    const url = `${config.wechatConfig.mpHost}/sns/jscode2session?${httpUtil.objectToUrl(paramObj)}`;
    
    httpUtil.get(url,headers).then(result => {
        logger.info(" getUserIdByCode " +req.params.code)
        resUtil.successRes(res,JSON.stringify(result),'')
    }).catch(error => {
        logger.error("getUserIdByCode" + error.stack)
        return next( createError(500, sysConst.ERROR_INTERNAL_MSG))
    })
}

module.exports = {
    getUserIdByCode
}