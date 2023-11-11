const wkhtmltopdf = require('wkhtmltopdf');
const createError = require('http-errors')

const sysConst = require("../util/SysConst")
const tplUtil = require("../util/TplUtil")
const baseUtil = require("../util/BaseUtil")
const serverLogger = require('../util/ServerLogger.js');
const UserProfileDAO = require('../dao/UserProfileDAO');
const { queryProfileTpl } = require('../dao/ProfileTplDAO.js');
const logger = serverLogger.createLog({file:"PdfBl.js"});

const getUserProfilePdf = async (req,res,next) => {
    //console.log(new Date().toLocaleString())
    const queryParams = req.query;
    userAuth = req.params[sysConst.REQUEST_AUTH_NAME]
    logger.info("getUserProfilePdf",{"message":req.params[sysConst.REQUEST_AUTH_NAME].ID})
    const profileRes = await UserProfileDAO.queryUserProfile({userId:userAuth.userId});
    const optRes = await UserProfileDAO.queryUserProfileOpt({userId:userAuth.userId});
    const eduRes = await UserProfileDAO.queryUserProfileEdu({userId:userAuth.userId});
    const workRes = await UserProfileDAO.queryUserProfileWork({userId:userAuth.userId});
    const projectRes = await UserProfileDAO.queryUserProfileProject({userId:userAuth.userId});
    
    const renderObj = {
        profile:baseUtil.getProfileRender(profileRes[0]),
        opt : optRes,
        edu : eduRes,
        work : workRes,
        project : projectRes,
    }
    const rows = await queryProfileTpl({id:queryParams.id})
    if(rows == null || rows.length<1){
        logger.warn(' userLogin ' + params.phone + ' password error');
        resUtil.failedRes(res,{},'用户名或密码错误');
        return next();
    }else{
        const tplPath = rows[0].tpl_path
        tplUtil.getUserProfileTpl(tplPath,renderObj,(err,resStr)=>{
            if(err){
                logger.error("getUserProfilePdf render " ,{message:err.stack})
                return next( createError(500, sysConst.ERROR_INTERNAL_MSG))
            }
            
            res.writeHead(200, { 'Content-Type': 'application/pdf'})
            pdfStream = wkhtmltopdf(resStr, { pageSize: 'A4' ,marginTop:0,marginLeft:0,marginRight:0,marginBottom:0})
        
            pdfStream.on('error', (err) => {
                console.log(err)
                logger.error("getUserProfilePdf stream " ,{message:err})
                return next( createError(500, sysConst.ERROR_INTERNAL_MSG))
            })
            logger.info("getUserProfilePdf" ,{message:renderObj.profile.id})
            pdfStream.pipe(res)
        })
    }
    
}

module.exports = {
    getUserProfilePdf
}