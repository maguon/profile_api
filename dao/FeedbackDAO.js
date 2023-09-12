const {pgDb,pgp} = require('../db/connection/DBCon');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({'file':'BaseDAO.js'});


class FeedbackDAO {

    static async createFeedback (params) {
        let paramObj = {};
        
        if(params.title){            
            paramObj.title = params.title;
        }
        if(params.content){            
            paramObj.content = params.content;
        }
        if(params.userId){            
            paramObj.user_id = params.userId;
        }
        if(params.imgs){            
            paramObj.imgs = params.imgs;
        }
        if(params.status){            
            paramObj.status = params.status;
        }
        let query = ' INSERT INTO user_feedback (${this:name}) VALUES (${this:csv}) RETURNING *';
        logger.debug(' createFeedback ');
        return await pgDb.one(query,paramObj);
        
    }   
    
    static async queryFeedback(params) {
        let query = `select * from user_feedback`;
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.userId){
            query += " and user_id = ${userId} ";
            filterObj.userId = params.userId;
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
        logger.debug(' queryFeedback ');
        return await pgDb.any(query,filterObj);
    }
}

module.exports = FeedbackDAO