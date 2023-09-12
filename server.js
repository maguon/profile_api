const fs = require('fs');
const path = require('path');

const express = require('express');
const createError = require('http-errors');
const wkhtmltopdf = require('wkhtmltopdf');

const serverLogger = require('./util/ServerLogger.js');
const logger = serverLogger.createLog({file:"server.js"});
const {checkUserToken} = require("./bl/AuthBl");
const {sendEmailActiveUrl,sendProfileEmail} = require("./bl/MailBl.js");
const {getUserProfilePdf} = require("./bl/PdfBl.js");
const {activeEmail,refreshToken,loginByWechatId} = require("./bl/UserBl.js");
const {queryFeedback,createFeedback} = require("./bl/FeedbackBl.js");
const {queryJobTypeSub} = require("./bl/BaseBl.js");
const profileBl = require("./bl/ProfileBl.js");
const {uploadImage} = require("./bl/ImageBl.js");
const {createProfileTpl,updateProfileTpl,queryProfileTpl} = require("./bl/ProfileTplBl.js");

// URL

const createServer = () => {
    const app = express()
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'uploads')))
    
    //user admin api
    app.get('/api/admin/feedback',queryFeedback)
    app.get('/api/admin/profileTpl',queryProfileTpl)
    app.post('/api/admin/profileTpl',createProfileTpl)
    app.put('/api/admin/profileTpl/:profileTplId',updateProfileTpl)


    //user private api
    app.post('/api/private/feedback',createFeedback)

    app.get('/api/private/profile',profileBl.queryUserProfile)
    app.put('/api/private/profile/:profileId',profileBl.updateProfile)

    app.post('/api/private/profileOpt',profileBl.createProfileOpt)
    app.get('/api/private/profileOpt',profileBl.queryProfileOpt)
    app.put('/api/private/profileOpt/:profileOptId',profileBl.updateProfileOpt)

    app.post('/api/private/profileEdu',profileBl.createProfileEdu)
    app.get('/api/private/profileEdu',profileBl.queryProfileEdu)
    app.put('/api/private/profileEdu/:profileEduId',profileBl.updateProfileEdu)

    app.post('/api/private/profileWork',profileBl.createProfileWork)
    app.get('/api/private/profileWork',profileBl.queryProfileWork)
    app.put('/api/private/profileWork/:profileWorkId',profileBl.updateProfileWork)

    app.post('/api/private/profileProject',profileBl.createProfileProject)
    app.get('/api/private/profileProject',profileBl.queryProfileProject)
    app.put('/api/private/profileProject/:profileProjectId',profileBl.updateProfileProject)

    app.get('/api/private/profile',profileBl.queryUserProfile)
    app.put('/api/private/profile/:profileId',profileBl.updateProfile)

    app.post('/api/private/image',uploadImage)

    app.get('/api/profile.pdf',getUserProfilePdf)
    app.post('/api/profileMail',checkUserToken ,sendProfileEmail)
    app.post('/api/token',refreshToken)
    app.post('/api/login',loginByWechatId)
    app.get('/api/activeEmail',activeEmail)

    // public api
    app.get('/api/public/baseJobTypeSub',queryJobTypeSub) 
    
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
    
    app.use(function(req, res, next) {
        console.log(req.path)
        console.log(req.body)
        return next(new createError.NotFound())
    });
   
    logger.info("init router success ")
    return app;

}

module.exports = {
    createServer
}
