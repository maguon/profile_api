const {pgDb,pgp} = require('../db/connection/DBCon');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({'file':'ProfileTplDAO.js'});
const dbUtile = require('../util/DbUtil');


class ProfileTplDAO {
    static async createProfileTpl (params) {
        let paramObj = {};
        
        if(params.tplName){            
            paramObj.tpl_name = params.tplName;
        }
        if(params.tplPath){            
            paramObj.tpl_path = params.tplPath;
        }
        if(params.tplCover){            
            paramObj.tpl_cover = params.tplCover;
        }
        if(params.status){            
            paramObj.status = params.status;
        }
        let query = ' INSERT INTO user_profile_tpl (${this:name}) VALUES (${this:csv}) RETURNING *';
        return await pgDb.one(query,paramObj);
        
    }

    static async queryProfileTpl (params) {
        let query = `select * from user_profile_tpl `;
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
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
        logger.debug(' queryProfileTpl ');
        return await pgDb.any(query,filterObj);        
    }

    static async updateProfileTpl (params) {
        let paramObj = {};
        let columnArray = []
        
        if(params.tplName){            
            paramObj.tpl_name = params.tplName;
            columnArray.push('tpl_name');
        }
        if(params.tplPath){            
            paramObj.tpl_path = params.tplPath;
            columnArray.push('tpl_path');
        }
        if(params.tplCover){            
            paramObj.tpl_cover = params.tplCover;
            columnArray.push('tpl_cover');
        }
        if(params.status){            
            paramObj.status = params.status;
            columnArray.push('status');
        }
        const cs = new pgp.helpers.ColumnSet(columnArray);
        const query = pgp.helpers.update(paramObj, cs, 'user_profile_tpl ');
        logger.debug(' updateProfileTpl ');
        return await pgDb.one(query +' where id = $1 RETURNING *',[params.id]);

    }
}

module.exports = ProfileTplDAO