const fs = require('fs');
const path = require('path');

const express = require('express');
const fileUpload = require('express-fileupload');
const createError = require('http-errors');
const wkhtmltopdf = require('wkhtmltopdf');

const serverLogger = require('./util/ServerLogger.js');
const logger = serverLogger.createLog({file:"server.js"});
const {checkUserToken} = require("./bl/AuthBl");
const {sendEmailActiveUrl,sendProfileEmail} = require("./bl/MailBl.js");
const {getUserProfilePdf} = require("./bl/PdfBl.js");
const {activeEmail,refreshToken,loginByWechatId, userLogin,getUserSelf, updateUserInfo} = require("./bl/UserBl.js");
const {queryFeedback,createFeedback} = require("./bl/FeedbackBl.js");
const {queryJobTypeSub, queryProvidence, queryCity, queryArea, queryBaseJob, queryBaseJobType, queryBaseJobTypeSub, getPrivacy} = require("./bl/BaseBl.js");
const profileBl = require("./bl/ProfileBl.js");
const {uploadImage} = require("./bl/ImageBl.js");
const {createProfileTpl,updateProfileTpl,queryProfileTpl} = require("./bl/ProfileTplBl.js");
const {getUserIdByCode} = require("./bl/WechatBl.js")

// URL

const createServer = () => {
    const app = express();
    
    app.all("*",(req, res, next) =>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");    
        
        next();
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'uploads')))
    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : './tmp/'
    }));
    //user admin api
    app.get('/api/admin/feedback',queryFeedback)
    app.get('/api/admin/profileTpl',queryProfileTpl)
    app.post('/api/admin/profileTpl',createProfileTpl)
    app.put('/api/admin/profileTpl/:profileTplId',updateProfileTpl)


    //user private api
    app.post('/api/private/feedback',createFeedback)

    app.get('/api/private/user',checkUserToken,getUserSelf)
    app.put('/api/private/user',checkUserToken,updateUserInfo)

    app.get('/api/private/profile',checkUserToken,profileBl.queryUserProfile)
    app.post('/api/private/profile',checkUserToken,profileBl.createProfile)
    app.put('/api/private/profile/:profileId',checkUserToken,profileBl.updateProfile)

    app.post('/api/private/profileOpt',checkUserToken,profileBl.createProfileOpt)
    app.get('/api/private/profileOpt',checkUserToken,profileBl.queryProfileOpt)
    app.put('/api/private/profileOpt/:profileOptId',checkUserToken,profileBl.updateProfileOpt)

    app.post('/api/private/profileEdu',checkUserToken,profileBl.createProfileEdu)
    app.get('/api/private/profileEdu',checkUserToken,profileBl.queryProfileEdu)
    app.put('/api/private/profileEdu/:profileEduId',checkUserToken,profileBl.updateProfileEdu)

    app.post('/api/private/profileWork',checkUserToken,profileBl.createProfileWork)
    app.get('/api/private/profileWork',checkUserToken,profileBl.queryProfileWork)
    app.put('/api/private/profileWork/:profileWorkId',checkUserToken,profileBl.updateProfileWork)

    app.post('/api/private/profileProject',checkUserToken,profileBl.createProfileProject)
    app.get('/api/private/profileProject',checkUserToken,profileBl.queryProfileProject)
    app.put('/api/private/profileProject/:profileProjectId',checkUserToken,profileBl.updateProfileProject)

    app.get('/api/private/profile',checkUserToken,profileBl.queryUserProfile)
    app.put('/api/private/profile/:profileId',checkUserToken,profileBl.updateProfile)

    app.post('/api/private/image',checkUserToken,uploadImage)

    app.get('/api/profile.pdf',checkUserToken,getUserProfilePdf)
    app.post('/api/profileMail',checkUserToken ,sendProfileEmail)
    app.post('/api/token',refreshToken)
    app.post('/api/wechatLogin',loginByWechatId)
    app.post('/api/login',userLogin)
    app.get('/api/activeEmail',activeEmail)
    app.get('/api/public/wechat/:code/openid',getUserIdByCode);
    // public api
    app.get('/api/public/baseJobTypeSub',queryJobTypeSub) 
    app.get('/api/public/profileTpl',queryProfileTpl)
    app.get('/api/public/job',queryBaseJob) 
    app.get('/api/public/jobType',queryBaseJobType) 
    app.get('/api/public/jobTypeSub',queryBaseJobTypeSub) 
    app.get('/api/public/providence',queryProvidence) 
    app.get('/api/public/city',queryCity) 
    app.get('/api/public/area',queryArea) 
    app.get('/api/public/privacy',getPrivacy)
    
    app.get('/',(req,res,next) => {
        return next( createError.NotFound())
    } )

    app.get('/index.html', (req, res) => {
        console.log(req.query)
        res.send('hello world')
    })
    app.post('/', (req, res) => {
        res.send('This a message server ,your request is unautherized !')
    })
    
    
   
    logger.info("init router success ")
    return app;

}

module.exports = {
    createServer
}
