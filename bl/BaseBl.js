const createError = require('http-errors')

const config = require("../config")
const baseDAO = require("../dao/BaseDAO")
const resUtil = require('../util/ResUtil.js');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"BaseBl.js"});


const queryJobTypeSub = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await baseDAO.queryJobTypeSub(queryParams);
        if(queryRes != null){
            logger.info('queryJobTypeSub success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryJobTypeSub failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('queryJobTypeSub '+ e.stack)
        return next(new createError.InternalServerError());
    }
    
}

const queryBaseJob = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await baseDAO.queryBaseJob(queryParams);
        if(queryRes != null){
            logger.info('queryBaseJob success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryBaseJob failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('queryBaseJob '+ e.stack)
        return next(new createError.InternalServerError());
    }    
}

const queryBaseJobType = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await baseDAO.queryBaseJobType(queryParams);
        if(queryRes != null){
            logger.info('queryBaseJobType success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryBaseJobType failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('queryBaseJobType '+ e.stack)
        return next(new createError.InternalServerError());
    }    
}

const queryBaseJobTypeSub = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await baseDAO.queryBaseJobTypeSub(queryParams);
        if(queryRes != null){
            logger.info('queryBaseJobTypeSub success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryBaseJobTypeSub failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('queryBaseJobTypeSub '+ e.stack)
        return next(new createError.InternalServerError());
    }    
}

const queryProvidence = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await baseDAO.queryBaseProvidence(queryParams);
        if(queryRes != null){
            logger.info('queryProvidence success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryProvidence failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('queryProvidence '+ e.stack)
        return next(new createError.InternalServerError());
    }
    
}

const queryCity = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await baseDAO.queryBaseCity(queryParams);
        if(queryRes != null){
            logger.info('queryCity success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryCity failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('queryCity '+ e.stack)
        return next(new createError.InternalServerError());
    }
    
}

const queryArea = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await baseDAO.queryBaseArea(queryParams);
        if(queryRes != null){
            logger.info('queryArea success')
            resUtil.successRes(res,queryRes,'')
        }else{
            logger.info('queryArea failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('queryArea '+ e.stack)
        return next(new createError.InternalServerError());
    }
    
}

const getPrivacy = (req,res,next) => {
    const privacyString = ` 
    # h1 Heading 
    ## h2 Heading
    ### h3 Heading
    #### h4 Heading
    ##### h5 Heading
    ###### h6 Heading
  `
    resUtil.successRes(res,privacyString,'')
    return next();
}

module.exports ={
    queryJobTypeSub ,queryBaseJob, queryBaseJobType, queryBaseJobTypeSub, 
     queryProvidence, queryCity ,queryArea ,getPrivacy
}