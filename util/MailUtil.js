const nodemailer = require("nodemailer");

const config = require('../config/index');



const sendMail = async (receiver,subject,msg,attachments) => {
    let transporter = nodemailer.createTransport(config.mailConfig)
    const dataObj = {
        from: config.mailConfig.auth.user, // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        html: msg, // html body
    }
    if(attachments && attachments.length>0){
        dataObj = {...dataObj,attachments}
    }
    return await transporter.sendMail(dataObj);
}

const sendMailAttach = async (receiver,subject,msg,attachments) => {
    let transporter = nodemailer.createTransport(config.mailConfig)
    const dataObj = {
        from: config.mailConfig.auth.user, // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        html: msg, // html body
        attachments
    }
    console.log(dataObj)
    return await transporter.sendMail(dataObj);
}

module.exports = {
    sendMail,
    sendMailAttach
}

