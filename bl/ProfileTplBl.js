const createError = require('http-errors')

const config = require("../config")
const profileTplDAO = require("../dao/ProfileTplDAO.js")
const resUtil = require('../util/ResUtil.js');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"ProfileTplBl.js"});


const queryProfileTpl = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await profileTplDAO.queryProfileTpl(queryParams);
        if(queryRes != null){
            logger.info('queryProfileTpl success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryProfileTpl failed')
            resUtil.successRes(res,{},"query failed")
        }
    }catch(e){
        logger.error('queryProfileTpl '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const createProfileTpl = async(req,res,next) => {
    const bodyParams = req.body;
    try{
        const createRes = await profileTplDAO.createProfileTpl(bodyParams);
        if(createRes != null){
            logger.info('createProfileTpl success')
            resUtil.successRes(res,createRes,'')
        }else{
            logger.info('createProfileTpl failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('createProfileTpl '+ e.stack)
        return next(new createError.InternalServerError());
    }
}


const updateProfileTpl = async(req,res,next) => {
    const bodyParams = req.body;
    bodyParams.id = req.params.profileTplId;
   
    try{
        const updateRes = await profileTplDAO.updateProfileTpl(bodyParams);
        if(updateRes != null){
            logger.info('updateProfileTpl success')
            resUtil.successRes(res,updateRes,'')
        }else{
            logger.info('updateProfileTpl failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('updateProfileTpl '+ e.stack)
        return next(new createError.InternalServerError());
    }
}

module.exports = {
    queryProfileTpl,
    createProfileTpl,
    updateProfileTpl
}