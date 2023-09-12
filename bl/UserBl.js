const createError = require('http-errors')

const config = require("../config")
const sysConst = require("../util/SysConst")
const httpUtil = require("../util/HttpUtil")
const jwtUtil = require("../util/JwtUtil")
const resUtil = require("../util/ResUtil")
const redis = require("../dao/RedisDAO")
const userInfoDAO = require("../dao/UserInfoDAO")
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"UserBl.js"});


const loginByWechatId = (req,res,next) => {
    const data={}
    const msg='msg'
    resUtil.successRes(res,data,msg)
}

const activeEmail = async(req,res,next) => {
    const queryParams = req.query;
    const emailObj = jwtUtil.parseJwtToken(queryParams.code)
    if(emailObj == null){
        logger.warn("activeEmail failed")
        return next(new createError.BadRequest());
    }else{
        if(emailObj.userId == null || emailObj.email == null){
            logger.warn("activeEmail failed")
            return next(new createError.BadRequest());
        }else {
            console.log(userInfoDAO)
            
            //const userList = userInfoDAO.queryUserInfoBase({email:emailObj.email})
        }
    }
   
    const data=emailObj
    const msg='msg'
    resUtil.successRes(res,data,msg)
}

const refreshToken = async(req,res,next) => {
    const accessToken = req.headers[sysConst.HEADER_AUTH_TOKEN];
    if(accessToken == undefined){
        logger.warn("auth failed")
        return next(new createError.Unauthorized());
    }else{
        const resData = await redis.getStringValAsync(sysConst.USER_TOKEN_PRE+accessToken);
            
        if(resData == null){
            const tokenObj = jwtUtil.parseJwtToken(accessToken)            
            if(tokenObj == null){
                logger.error(' refreshToken error');
                return next(new createError.Unauthorized());
            }else{
                
                const newToken = jwtUtil.getUserToken(tokenObj.userId,tokenObj.wechatId) 
                const userObj = {userId:tokenObj.userId,wechatId:tokenObj.wechatId}
                redis.setStringVal({key:sysConst.USER_TOKEN_PRE+newToken,value:JSON.stringify(userObj),expired:jwtUtil.jwtExpired*30},(err,resJson)=>{
                    if(err){
                        logger.error(' refreshToken ' + err.stack);
                    }
                })
                resUtil.successRes(res,{...userObj,accessToken:newToken},'')
                return next()
            }
        }else{
            try {
                const userInfo = eval("(" + resData + ")");
                console.log(resData)
                const newToken = jwtUtil.getUserToken(userInfo.userId,userInfo.wechatId) 

                redis.setStringVal({key:sysConst.USER_TOKEN_PRE+newToken,value:JSON.stringify(userInfo),expired:jwtUtil.jwtExpired*30},(err,res)=>{
                    if(err){
                        logger.error(' refreshToken ' + err.stack);
                    }
                })
                redis.removeStringVal({key:sysConst.USER_TOKEN_PRE+accessToken},(err,res)=>{
                    if(err){
                        logger.error(' refreshToken ' + err.stack);
                    }
                })
                resUtil.successRes(res,{...userInfo,accessToken:newToken},'')
                return next()
            }catch(err){          
                redis.removeStringVal({key:sysConst.USER_TOKEN_PRE+accessToken},(err,res)=>{
                    if(err){
                        logger.error(' refreshToken ' + err.stack);
                    }
                })      
                logger.error(' refreshToken ' + err.stack);
                return next(new createError.Unauthorized());
            }
        }
    }    
}
module.exports = {
    activeEmail ,
    loginByWechatId,
    refreshToken
}