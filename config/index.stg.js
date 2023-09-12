const logLevel = 'debug';
const logName = '../logs/profile_api_%DATE%.log'

const serverPort = 8887;

const systemToken = "message_server_token"

const redisConfig = {
    url : "redis://127.0.0.1:6379"
}

const dbConfig = {
    initOptions :{native:true},
    connectOptions :{
        host: 'localhost',
        port: 5432,
        database: 'profile_tool',
        user: "profile_dev" ,
        password : "profile_tool_2023"
    }
}


const mongoConfig = {
    connect : 'mongodb://127.0.0.1:27017/yepin_records'
}


const mailConfig = {
    host: "smtp.sohu.com",
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "xueling794@sohu.com", // generated ethereal user
      pass: "IKZBL7HNP4S", // generated ethereal password
    }
}

const wechatConfig = {
    mpAppId : "wx694764f7676e75c3",
    mpSecret : "08baba525260e016ce793c7267133035",
    mpHost : "api.weixin.qq.com",
    paymentHost : "api.mch.weixin.qq.com",
    mchId : "1517493001",
    notifyUrl : "https://stg.myxxjs.com/api/wechatPayment",
    paymentKey:'a7c5c6cd22d89a3eea6c739a1a3c74d1',
    paymentCert : './config/wechat_payment.p12'
}
module.exports = {
    logLevel,
    logName ,
    serverPort,
    systemToken ,
    redisConfig,
    dbConfig,
    mongoConfig,
    mailConfig ,
    wechatConfig,

}
