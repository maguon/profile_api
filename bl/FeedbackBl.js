const createError = require('http-errors')

const config = require("../config")
const feedbackDAO = require("../dao/FeedbackDAO")
const resUtil = require('../util/ResUtil.js');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"FeedbackBl.js"});

const queryFeedback = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const feedbackRes = await feedbackDAO.queryFeedback(queryParams);
        if(feedbackRes != null){
            logger.info('queryFeedback success')
            resUtil.successRes(res,feedbackRes,'')
        }else{
            logger.info('queryFeedback failed')
            resUtil.successRes(res,{},msg)
        }
    }catch(e){
        logger.error('queryFeedback '+ e.stack)
        return next(new createError.InternalServerError());
    }
    
}


const createFeedback = async(req,res,next) => {
    const bodyParams = req.body;
    try{
        const feedbackRes = await feedbackDAO.createFeedback(bodyParams);
        if(feedbackRes != null){
            logger.info('createFeedback success')
            resUtil.successRes(res,feedbackRes,'')
        }else{
            logger.info('createFeedback failed')
            resUtil.failedRes(res,{},'')
        }
    }catch(e){
        logger.error('createFeedback '+ e.stack)
        return next(new createError.InternalServerError());
    }
    
}
module.exports ={
    queryFeedback,
    createFeedback,
}