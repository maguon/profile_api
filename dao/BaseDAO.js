const {pgDb,pgp} = require('../db/connection/DBCon');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({'file':'BaseDAO.js'});


class BaseDAO {
    static async queryBaseIndustry(params) {
        let query = `
            select bi.id,bi.name,jsonb_agg(jsonb_build_object('id',bis.id,'name',bis.name)  order by i_id) as children 
            from base_industry bi left join base_industry_sub bis on bi.id= bis.i_id group by bi.id,bi.name
        `;
        
        logger.debug(' queryBaseIndustry ');
        return await pgDb.any(query,{});
    }
    static async queryBaseJob(params) {
        let filterObj = {}
        let query = `
            select *  from base_job bj where id >0 
        `;
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        logger.debug(' queryBaseJob ');
        return await pgDb.any(query,filterObj);
    }
    static async queryBaseJobTypeSub(params) {
        let filterObj = {}
        let query = `
            select bjt.id,bjt.name,jsonb_agg(jsonb_build_object('id', bjts.id, 'name', bjts.name) order by bjts.id) as children 
            from base_job_type_sub bjts left join base_job_type bjt on bjts.t_id= bjt.id 
            where bjt.id > 0 `;
        if(params.jid){
            query += " and bjt.j_id = ${jid} ";
            filterObj.jid = params.jid;
        }
        if(params.id){
            query += " and bjt.id = ${id} ";
            filterObj.id = params.id;
        }
        query += " group by bjt.id,t_id,bjt.name "
        logger.debug(' queryBaseJobTypeSub ');
        return await pgDb.any(query,filterObj);
    }
    static async queryBaseJobAll(params) {
        let filterObj = {}
        let query = ` select bj.id,bj.name,jsonb_agg(jsonb_build_object('children',c_a.children)) as children
		from base_job bj left join (
		select bjt.j_id,jsonb_build_object('id',t_id,'name',bjt.name ,'children',
		jsonb_agg(jsonb_build_object('id', bjts.id, 'name', bjts.name) order by bjts.id)) as children 
		from base_job_type_sub bjts left join base_job_type bjt on bjts.t_id= bjt.id group by bjt.j_id,t_id,bjt.name
		) as c_a on bj.id = c_a.j_id  GROUP BY bj.id `;
        logger.debug(' queryBaseJobAll ');
        return await pgDb.any(query,filterObj);
    }

    static async queryCityAreaAll(params) {
        let filterObj = {}
        let query = ` select bp.id,bp.name,jsonb_agg(jsonb_build_object('children',c_a.children)) as children
		from base_providence bp left join (
		select bc.p_id,jsonb_build_object('id',c_id,'name',bc.name ,'children',
		jsonb_agg(jsonb_build_object('id', ba.id, 'name', ba.name) order by ba.id)) as children 
		from base_area ba left join base_city bc on ba.c_id= bc.id group by bc.p_id,c_id,bc.name
		) as c_a on bp.id = c_a.p_id  GROUP BY bp.id `;
        logger.debug(' queryCityAreaAll ');
        return await pgDb.any(query,filterObj);
    }
    static async queryProvidenceCityAll(params) {
        let filterObj = {}
        let query = ` select bp.id,bp.name,jsonb_agg(jsonb_build_object('id', bc.id, 'name', bc.name) order by bc.id) as children 
		from base_city bc left join base_providence bp on bc.p_id= bp.id  `;
        if(params.status){
            query += " and bp.status = ${status} ";
            filterObj.status = params.status;
        }
        query += ' group by bp.id,bp.name '
        logger.debug(' queryProvidenceCityAll ');
        return await pgDb.any(query,filterObj);
    }

}
module.exports = BaseDAO;
