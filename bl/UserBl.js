const createError = require('http-errors')

const config = require("../config")
const sysConst = require("../util/SysConst")
const httpUtil = require("../util/HttpUtil")
const jwtUtil = require("../util/JwtUtil")
const resUtil = require("../util/ResUtil")
const encrypt = require('../util/Encrypt')
const redis = require("../dao/RedisDAO")
const userInfoDAO = require("../dao/UserInfoDAO")
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"UserBl.js"});


const loginByWechatId = (req,res,next) => {
    const data={}
    const msg='msg'
    resUtil.successRes(res,data,msg)
}
const userLogin = async (req,res,next)=>{
    let params = req.body;
    params.password = encrypt.encryptByMd5NoKey(params.password);
    console.log(params.password)
    try{
        const rows = await userInfoDAO.queryUserInfoBase({phone:params.phone, password:params.password});
        
        if(rows == null || rows.length<1){
            logger.warn(' userLogin ' + params.phone + ' password error');
            resUtil.failedRes(res,{},'用户名或密码错误');
            return next();
        }else{
            console.log(rows)
            let userInfo = {
                userId : rows[0].id,
                status : rows[0].status
            }
           
            userInfo.accessToken = jwtUtil.getUserToken(userInfo.userId) 
            
            redis.setStringVal({key:sysConst.USER_TOKEN_PRE+userInfo.accessToken,value:JSON.stringify(userInfo),expired:jwtUtil.jwtExpired*30},(err,res)=>{
                if(err){
                    logger.error(' userLogin ' + err.stack);
                }
            })
            logger.info(' userLogin ' + 'success');
            resUtil.successRes(res,userInfo,null);
            return next();
        }
    }catch (e) {
        logger.error(" userLogin error",e.stack);
        return next(new createError.InternalServerError());
    }
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
                
                const newToken = jwtUtil.getUserToken(tokenObj.userId) 
                const userObj = {userId:tokenObj.userId}
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

const getUserSelf = async(req,res,next) => {
    const userAuth = req.params[sysConst.REQUEST_AUTH_NAME]
    try{
        const queryRes = await userInfoDAO.queryUserInfoBase({userId:userAuth.userId});
        if(queryRes != null){
            logger.info('queryProfileEdu success')
            queryRes.password = ""
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryProfileEdu failed')
            resUtil.failedRes(res,{},"query failed")
        }
    }catch(e){
        logger.error('queryProfileEdu '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const updateUserInfo = async(req,res,next) => {
    
    const bodyParams = req.body;
    
    const userAuth = req.params[sysConst.REQUEST_AUTH_NAME]
    bodyParams.id = userAuth.userId
    
    try{
        const updateRes = await userInfoDAO.updateUserInfo(bodyParams);
        if(updateRes != null){
            logger.info('updateUserInfo success')
            resUtil.successRes(res,updateRes,'')
        }else{
            logger.info('updateUserInfo failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('updateUserInfo '+ e.stack)
        return next(new createError.InternalServerError());
    }
}
module.exports = {
    activeEmail ,
    userLogin,
    loginByWechatId,
    refreshToken ,
    getUserSelf,
    updateUserInfo
}