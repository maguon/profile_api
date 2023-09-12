const ejs = require('ejs')
const path = require('path');
const pdfUtil = require('./PdfUtil')
/* ejs.locals.monthFormat = (dateMonth) => {
    return moment(dateMonth).format('YYYY-MM');
} */
const getUserProfileTpl = (params,callback) => {
    ejs.renderFile(path.join(__dirname, '/template/index.html'), {...params,pdfUtil} , {}, (err, str)=>{
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
