const createError = require('http-errors')

const config = require("../config")
const baseDAO = require("../dao/BaseDAO")
const resUtil = require('../util/ResUtil.js');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"BaseBl.js"});


const queryJobTypeSub = async(req,res,next) => {
    const queryParams = req.query;
    try{
        const queryRes = await baseDAO.queryBaseJobTypeSub(queryParams);
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


module.exports ={
    queryJobTypeSub
}