const ejs = require('ejs')
const path = require('path');
const pdfUtil = require('./PdfUtil')
/* ejs.locals.monthFormat = (dateMonth) => {
    return moment(dateMonth).format('YYYY-MM');
} */
const getUserProfileTpl = (tplPath,params,callback) => {
    
    ejs.renderFile(path.join(__dirname, tplPath||'/template/index.html'), {...params,pdfUtil} , {}, (err, str)=>{
        callback(err,str)
    });
}
const getEmailActiveTpl = (params,callback) => {
    ejs.renderFile(path.join(__dirname, '/template/email.html'), params , {}, (err, str)=>{
        callback(err,str)
    });
}
module.exports = {
    getUserProfileTpl ,
    getEmailActiveTpl
}
