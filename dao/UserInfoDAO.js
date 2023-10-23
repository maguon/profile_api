const moment = require('moment')
const {pgDb,pgp} = require('../db/connection/DBCon');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({'file':'UserInfoDAO.js'});
const dbUtile = require('../util/DbUtil');

class UserInfoDAO {

    static async createUserInfo (params) {
        let paramObj = {};
        
        if(params.phone){            
            paramObj.phone = params.phone;
        }
        if(params.email){            
            paramObj.email = params.email;
        }
        if(params.name){            
            paramObj.name = params.name;
        }
        if(params.avatar){            
            paramObj.avatar = params.avatar;
        }
        if(params.wechatId){            
            paramObj.wechat_id = params.wechatId;
        }
        if(params.wechatName){            
            paramObj.wechat_name = params.wechatName;
        }
        if(params.wechatAvatar){            
            paramObj.wechat_avatar = params.wechatAvatar;
        }
        if(params.gender){            
            paramObj.gender = params.gender;
        }
        if(params.status){
            paramObj.status = params.status;
        }
        if(params.password){           
            paramObj.password = params.password;
        }
        if(params.birth){           
            paramObj.birth = params.birth;
        }
        
        paramObj.date_id = moment(new Date()).format('YYYYMMDD')
        paramObj.login_date_id = moment(new Date()).format('YYYYMMDD')
        paramObj.login_at = new Date()
        let query = ' INSERT INTO user_info (${this:name}) VALUES (${this:csv}) RETURNING *';
        return await pgDb.one(query,paramObj);
        
    }

    static async queryUserInfoBase(params) {
        let query = `select * from user_info where id is not null `;
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.wechatId){
            query += " and wechat_id = ${wechatId} ";
            filterObj.wechatId = params.wechatId;
        }
        if(params.phone){
            query += " and phone = ${phone} ";
            filterObj.phone = params.phone;
        }
        if(params.password){
            query += " and password = ${password} ";
            filterObj.password = params.password;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        if(params.gender){
            query += " and gender = ${gender} ";
            filterObj.gender = params.gender;
        }
        if(params.email){
            query += " and email = ${email} ";
            filterObj.email = params.email;
        }
        query = query + '  order by id desc ';

        if(params.start){
            query += " offset ${start} ";
            filterObj.start = params.start;
        }
        if(params.size){
            query += " limit ${size} ";
            filterObj.size = params.size;
        }
        logger.debug(' queryUserInfoBase ');
        return await pgDb.any(query,filterObj);
    }


    static async updateUserInfo (params) {
        let paramObj = {};
        let columnArray = []
        if(params.id){
            paramObj.id = params.id;
            columnArray.push('id');
        }
        if(params.phone){            
            paramObj.phone = params.phone;
            columnArray.push('phone');
        }
        if(params.name){            
            paramObj.name = params.name;
            columnArray.push('name');
        }
        if(params.status){
            paramObj.status = params.status;
            columnArray.push('status');
        }
        if(params.gender){           
            paramObj.gender = params.gender;
            columnArray.push('gender');
        }
        if(params.avatar){           
            paramObj.avatar = params.avatar;
            columnArray.push('avatar');
        }
        if(params.wechatAvatar){           
            paramObj.wechat_avatar = params.wechatAvatar;
            columnArray.push('wechat_avatar');
        }
        if(params.wechatId){           
            paramObj.wechat_id = params.wechatId;
            columnArray.push('wechat_id');
        }
        if(params.wechatName){           
            paramObj.wechat_name = params.wechatName;
            columnArray.push('wechat_name');
        }
        if(params.birth){           
            paramObj.birth = params.birth;
            columnArray.push('birth');
        }
        if(params.email){           
            paramObj.email = params.email;
            columnArray.push('email');
        }
        if(params.password){           
            paramObj.password = params.password;
            columnArray.push('password');
        }
        if(params.loginAt){           
            paramObj.login_at = params.loginAt;
            columnArray.push('login_at');
        }
        if(params.loginDateId){           
            paramObj.login_date_id = params.loginDateId;
            columnArray.push('login_date_id');
        }
        const cs = new pgp.helpers.ColumnSet(columnArray);
        const query = pgp.helpers.update(paramObj, cs, 'user_info');
        logger.debug(' updateUserInfo ');
        return await pgDb.one(query +' where id = $1 RETURNING *',[params.id]);

    }

}

module.exports = UserInfoDAO