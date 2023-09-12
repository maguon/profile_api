const moment = require('moment')

const serverLogger = require('./ServerLogger.js');
const logger = serverLogger.createLog('BaseUtil.js');

const Json2String = (obj) => {
    try{
        return JSON.stringify(obj);
    }catch(e){
        logger.error('Json2String error:' +obj);
        return null;
    }
}

const String2Json = (string) => {
    try{
        return JSON.parse(string);
    }catch(e){
        logger.error('String2Json error:' +string);
        return null;
    }
}

const getProfileRender = (profile) => {
    profile.gender = profile.gender == 1 ? "男":"女"
    profile.birthStr = moment(profile.birth).format("YYYY-MM")

    return profile
}

module.exports = {
    Json2String ,
    String2Json ,
    getProfileRender
}

