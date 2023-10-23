const createError = require('http-errors')

const config = require("../config")
const userProfileDAO = require("../dao/UserProfileDAO.js")
const resUtil = require('../util/ResUtil.js');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"ProfileBl.js"});


const queryProfileOpt = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await userProfileDAO.queryUserProfileOpt(queryParams);
        if(queryRes != null){
            logger.info('queryProfileOpt success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryProfileOpt failed')
            resUtil.failedRes(res,{},"query failed")
        }
    }catch(e){
        logger.error('queryProfileOpt '+ e.stack)
        return next(new createError.InternalServerError());
    }
}

const queryProfileEdu = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await userProfileDAO.queryUserProfileEdu(queryParams);
        if(queryRes != null){
            logger.info('queryProfileEdu success')
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


const queryProfileWork = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await userProfileDAO.queryUserProfileWork(queryParams);
        if(queryRes != null){
            logger.info('queryProfileWork success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryProfileWork failed')
            resUtil.failedRes(res,{},"query failed")
        }
    }catch(e){
        logger.error('queryProfileWork '+ e.stack)
        return next(new createError.InternalServerError());
    }
}

const queryProfileProject = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await userProfileDAO.queryUserProfileProject(queryParams);
        if(queryRes != null){
            logger.info('queryProfileProject success')            
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryProfileProject failed')
            resUtil.failedRes(res,{},"query failed")
        }
    }catch(e){
        logger.error('queryProfileProject '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const queryUserProfile = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await userProfileDAO.queryUserProfileBase(queryParams);
        if(queryRes != null){
            logger.info('queryUserProfile success')
            console.log(queryRes)
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryUserProfile failed')
            resUtil.failedRes(res,{},"query failed")
        }
    }catch(e){
        logger.error('queryUserProfile '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const createProfileOpt = async(req,res,next) => {
    const bodyParams = req.body;
    try{
        const createRes = await userProfileDAO.createUserProfileOpt(bodyParams);
        if(createRes != null){
            logger.info('createProfileOpt success')
            resUtil.successRes(res,createRes,'')
        }else{
            logger.info('createProfileOpt failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('createProfileOpt '+ e.stack)
        return next(new createError.InternalServerError());
    }
}

const createProfileEdu = async(req,res,next) => {
    const bodyParams = req.body;
    try{
        const createRes = await userProfileDAO.createUserProfileEdu(bodyParams);
        if(createRes != null){
            logger.info('createProfileEdu success')
            resUtil.successRes(res,createRes,'')
        }else{
            logger.info('createProfileEdu failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('createProfileEdu '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const createProfileWork = async(req,res,next) => {
    const bodyParams = req.body;
    try{
        const createRes = await userProfileDAO.createUserProfileWork(bodyParams);
        if(createRes != null){
            logger.info('createProfileWork success')
            resUtil.successRes(res,createRes,'')
        }else{
            logger.info('createProfileWork failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('createProfileWork '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const createProfileProject = async(req,res,next) => {
    const bodyParams = req.body;
    try{
        const createRes = await userProfileDAO.createUserProfileProject(bodyParams);
        if(createRes != null){
            logger.info('createProfileProject success')
            resUtil.successRes(res,createRes,'')
        }else{
            logger.info('createProfileProject failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('createProfileProject '+ e.stack)
        return next(new createError.InternalServerError());
    }
}

const createProfile = async(req,res,next) => {
    const bodyParams = req.body;
    try{
        const createRes = await userProfileDAO.createUserProfile(bodyParams);
        if(createRes != null){
            logger.info('createProfile success')
            resUtil.successRes(res,createRes,'')
        }else{
            logger.info('createProfile failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('createProfile '+ e.stack)
        return next(new createError.InternalServerError());
    }
}

const updateProfileOpt = async(req,res,next) => {
    const bodyParams = req.body;
    bodyParams.id = req.params.profileOptId;
   
    try{
        const updateRes = await userProfileDAO.updateUserProfileOpt(bodyParams);
        if(updateRes != null){
            logger.info('updateProfileOpt success')
            resUtil.successRes(res,updateRes,'')
        }else{
            logger.info('updateProfileOpt failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('updateProfileOpt '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const updateProfileEdu = async(req,res,next) => {
    const bodyParams = req.body;
    bodyParams.id = req.params.profileEduId;
    /* 
    userAuth = req.params[sysConst.REQUEST_AUTH_NAME]
    bodyParams.userId = userAuth.id
     */
    try{
        const updateRes = await userProfileDAO.updateUserProfileEdu(bodyParams);
        if(updateRes != null){
            logger.info('updateProfileEdu success')
            resUtil.successRes(res,updateRes,'')
        }else{
            logger.info('updateProfileEdu failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('updateProfileEdu '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const updateProfileWork = async(req,res,next) => {
    const bodyParams = req.body;
    bodyParams.id = req.params.profileWorkId;
    /* 
    userAuth = req.params[sysConst.REQUEST_AUTH_NAME]
    bodyParams.userId = userAuth.id
     */
    try{
        const updateRes = await userProfileDAO.updateUserProfileWork(bodyParams);
        if(updateRes != null){
            logger.info('updateProfileWork success')
            resUtil.successRes(res,updateRes,'')
        }else{
            logger.info('updateProfileWork failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('updateProfileWork '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const updateProfileProject = async(req,res,next) => {
    const bodyParams = req.body;
    bodyParams.id = req.params.profileProjectId;
    /* 
    userAuth = req.params[sysConst.REQUEST_AUTH_NAME]
    bodyParams.userId = userAuth.id
     */
    try{
        const updateRes = await userProfileDAO.updateUserProfileProject(bodyParams);
        if(updateRes != null){
            logger.info('updateProfileProject success')
            resUtil.successRes(res,updateRes,'')
        }else{
            logger.info('updateProfileProject failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('updateProfileProject '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const updateProfile = async(req,res,next) => {
    const bodyParams = req.body;
    bodyParams.id = req.params.profileId;
    /* 
    userAuth = req.params[sysConst.REQUEST_AUTH_NAME]
    bodyParams.userId = userAuth.id
     */
    try{
        const updateRes = await userProfileDAO.updateUserProfile(bodyParams);
        if(updateRes != null){
            logger.info('updateProfile success')
            resUtil.successRes(res,updateRes,'')
        }else{
            logger.info('updateProfile failed')
            resUtil.failedRes(res,{},msg)
        }
    }catch(e){
        logger.error('updateProfile '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


module.exports = {
    queryProfileOpt,
    queryProfileEdu,
    queryProfileWork,
    queryProfileProject,
    queryUserProfile,
    createProfileOpt,
    createProfileEdu,
    createProfileWork,
    createProfileProject,
    createProfile,
    updateProfileOpt,
    updateProfileEdu,
    updateProfileWork,
    updateProfileProject,
    updateProfile
}