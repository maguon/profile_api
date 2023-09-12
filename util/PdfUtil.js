const moment = require('moment')
const config = require('../config')
const formatYearMonth = (monthDate) => {
    if(monthDate == null || monthDate ==""){
        return "至今"
    }else{
        return moment(monthDate).format("YYYY.MM")
    }
}

const formatEduTitle = (eduObj) => {
    let eduStr = eduObj.edu_name;
    if (eduObj.edu_level >3){
        eduStr +=  eduObj.edu_type == 1 ? " ｜ 统招":" ｜ 非统招"
        if(eduObj.major){
            eduStr += ' ｜ ' + eduObj.major
        }
    }
    return eduStr
}

const getImageFullUrl = (url) => {
    return config.fileServer+url
}
module.exports ={
    formatYearMonth ,
    formatEduTitle ,
    getImageFullUrl
}

