const moment = require('moment')
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"WechatBl.js"});
const httpUtil = require('../util/HttpUtil.js');
const resUtil = require('../util/ResUtil.js');
const jwtUtil = require("../util/JwtUtil")
const sysConst = require('../util/SysConst.js');
const config = require ('../config')
const userInfoDAO = require("../dao/UserInfoDAO")

const getUserIdByCode = async(req,res,next) =>{
    
    const paramObj = {
        appid : config.wechatConfig.mpAppId,
        secret : config.wechatConfig.mpSecret,
        js_code : req.params.code,
        grant_type : 'authorization_code'
    }
    const headers = {'Content-Type':'application/json;charset=utf-8'}
    const url = `${config.wechatConfig.mpHost}/sns/jscode2session?${httpUtil.objectToUrl(paramObj)}`;
    
    const wechatResultObj =  await httpUtil.get(url,headers);

    if(wechatResultObj.openid != null){
        logger.info(" getUserIdByCode " +wechatResultObj.openid)
        const queryRes = await userInfoDAO.queryUserInfoBase({wechatId:wechatResultObj.openid});
        if(queryRes != null && queryRes.length>0){
            const updateRes = await userInfoDAO.updateUserInfo({id:queryRes[0].id,loginAt:new Date().getTime(),loginDateId : moment(new Date()).format('YYYY-MM-DD')})
            const newToken = jwtUtil.getUserToken(queryRes[0].id,tokenObj.wechatId)
            wechatResultObj.authToken = newToken
        }else{
            const insertRes = await userInfoDAO.createUserInfo({wechatId:wechatResultObj.openid,status:1})
            const newToken = jwtUtil.getUserToken(insertRes.id,tokenObj.wechatId)
            wechatResultObj.authToken = newToken
        }
        resUtil.successRes(res,wechatResultObj,'')
    }else{
        logger.warn(" getUserIdByCode " +req.params.code)
        resUtil.failedRes(res,wechatResultObj,'')
    }
    
    httpUtil.get(url,headers).then(result => {
        
        
        
    }).catch(error => {
        logger.error("getUserIdByCode" + error.stack)
        return next( createError(500, sysConst.ERROR_INTERNAL_MSG))
    })
}

module.exports = {
    getUserIdByCode
}