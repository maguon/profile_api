const jwt = require('jsonwebtoken');
const jwtKey = 'jwt_key' ;
const jwtExpired = 60*60*24 ;// 1day
const genJwtToken = (obj) => {    
    const token = jwt.sign({...obj,expiredAt:Math.floor(Date.now() / 1000) +jwtExpired}, jwtKey);
    return token
}

const parseJwtToken = (token) => {
    try {
        const decoded = jwt.verify(token, jwtKey);
        return decoded
    }catch {
        return null
    }
    
}

const getActiveEmailUrl = (userId,email) => {
    const token = jwt.sign({userId,email,expiredAt:Math.floor(Date.now() / 1000) +jwtExpired*3}, jwtKey);
    return token
}

const getUserToken = (userId) => {
    const token = jwt.sign({userId,expiredAt:Math.floor(Date.now() / 1000) +jwtExpired*30}, jwtKey);
    return token
}
module.exports = {
    jwtExpired,
    genJwtToken ,
    parseJwtToken,
    getActiveEmailUrl ,
    getUserToken,
}