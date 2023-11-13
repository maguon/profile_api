const {pgDb,pgp} = require('../db/connection/DBCon');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({'file':'CmsDAO.js'});


class CmsDAO {

    static async createCmsContent (params) {
        let paramObj = {};
        
        if(params.sysUser){            
            paramObj.sys_user = params.sysUser;
        }
        if(params.typeId){            
            paramObj.type_id = params.typeId;
        }
        if(params.title){            
            paramObj.title = params.title;
        }
        if(params.content){            
            paramObj.content = params.content;
        }
        if(params.remark){            
            paramObj.remark = params.remark;
        }
        if(params.status){            
            paramObj.status = params.status;
        }
        let query = ' INSERT INTO cms_content (${this:name}) VALUES (${this:csv}) RETURNING *';
        logger.debug(' createCms ');
        return await pgDb.one(query,paramObj);
        
    }   
    
    static async queryCmsContent(params) {
        let query = `select * from cms_content`;
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.sysUser){
            query += " and sys_user = ${sysUser} ";
            filterObj.sysUser = params.sysUser;
        }
        if(params.typeId){
            query += " and type_id = ${typeId} ";
            filterObj.typeId = params.typeId;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        if(params.title){
            query += " and title = ${title} ";
            filterObj.title = params.title;
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
        logger.debug(' queryCms ');
        return await pgDb.any(query,filterObj);
    }
}

module.exports = CmsDAO