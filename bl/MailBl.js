
const path = require('path'); 
const fs = require('fs'); 

const wkhtmltopdf = require('wkhtmltopdf');
const createError = require('http-errors')

const config = require('../config')
const baseUtil = require('../util/BaseUtil.js');
const mailUtil = require('../util/MailUtil.js');
const tplUtil = require('../util/TplUtil.js');
const resUtil = require('../util/ResUtil.js');
const sysConst = require('../util/SysConst.js');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({file:"MailBl.js"});
const UserProfileDAO = require('../dao/UserProfileDAO')

const sendEmailActiveUrl = (req,res,next)=> {
    const reqBody = req.body ;
    const params = {
        url:config.apiServer+reqBody.url,
        callCenter:config.callCenter,
        host :config.msgServer
    }
    tplUtil.getEmailActiveTpl(params,(err,resStr)=>{
        if(err){
            logger.error("sendEmailActiveUrl" ,{message:err.stack})
        }else{
            mailUtil.sendMail(reqBody.email,"您的激活邮件",resStr,null)
            .then(v=> logger.info("sendEmailActiveUrl" ,{message:reqBody.email}))
            .catch(e=>logger.error("sendEmailActiveUrl" ,{message:e.stack}))
        }
    })
    res.status(200).send({email:reqBody.email}).end();
}

const sendProfileEmail = async(req,res,next)=> {
    const reqBody = req.body ;
    const userAuth = req.params[sysConst.REQUEST_AUTH_NAME];
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
    tplUtil.getUserProfileTpl(renderObj,(err,resStr)=>{
        if(err){
            logger.error("sendProfileEmail render " ,{message:err.stack})
            return next( createError(500, sysConst.ERROR_INTERNAL_MSG))
        }
        const fileUri = path.resolve(__dirname,'../uploads',userAuth.Phone+'.pdf')
        const pdfStream = wkhtmltopdf(resStr, { pageSize: 'A4' ,output: fileUri,marginTop:0,marginLeft:0,marginRight:0,marginBottom:0})
       
        pdfStream.on('close', () => {
            const attachments = [
                {   
                    filename: userAuth.Phone+'.pdf',
                    path: fileUri
                }
            ]
            mailUtil.sendMail(reqBody.email,"您的简历","您的简历，请注意查收附件!",attachments).then(v=> {
                logger.info("sendProfileEmail" ,{message:reqBody.email})
                fs.unlink(fileUri,(err,res)=>{logger.error("sendProfileEmail file unlink" ,{message:err})})
            }).catch(e=>{
                logger.error("sendProfileEmail" ,{message:e.stack})
                fs.unlink(fileUri,(err,res)=>{logger.error("sendProfileEmail file unlink" ,{message:err})})
            })
            resUtil.successRes(res,{email:reqBody.email},'')
        })
        

        /* pdfStream = wkhtmltopdf(resStr, { pageSize: 'A4' ,marginTop:0,marginLeft:0,marginRight:0,marginBottom:0})
        console.log("stream ready",new Date().toLocaleString())
        pdfStream.on('ready', () => {
            console.log('stream ready ',new Date().toLocaleString())
        })
        pdfStream.on('error', (err) => {
            logger.error("sendProfileEmail stream " ,{message:err})
            return next( createError(500, sysConst.ERROR_INTERNAL_MSG))
        })
        const fileUri = path.resolve(__dirname,'../uploads',userAuth.Phone+'.pdf')
        pdfStream.pipe(fs.createWriteStream(fileUri))

        pdfStream.on('finish', () => {
            console.log('stream finish ',new Date().toLocaleString())
            
        }) */
    })
    
    
}
module.exports = {
    sendEmailActiveUrl,
    sendProfileEmail
}