const {pgDb,pgp} = require('../db/connection/DBCon');
const serverLogger = require('../util/ServerLogger.js');
const logger = serverLogger.createLog({'file':'UserProfileDAO.js'});
const dbUtile = require('../util/DbUtil');

class UserProfileDAO {

    static async queryUserProfile(params) {
        let query = " select ui.id,ui.phone,ui.email,ui.name,ui.avatar,ui.gender,ui.birth,"+
         " up.current,up.edu_level,up.excellent,up.last_title,up.last_en " +
         " from user_info ui left join user_profile up on ui.id = up.user_id  " +
         " where ui.id is not null  ";
        let filterObj = {};
        if(params.id){
            query += " and ui.id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.userId){
            query += " and ui.id = ${userId} ";
            filterObj.userId = params.userId;
        }
        if(params.wechatId){
            query += " and ui.wechat_id = ${wechatId} ";
            filterObj.wechatId = params.wechatId;
        }
        if(params.phone){
            query += " and ui.phone = ${phone} ";
            filterObj.phone = params.phone;
        }
        if(params.status){
            query += " and ui.status = ${status} ";
            filterObj.status = params.status;
        }
        if(params.gender){
            query += " and ui.gender = ${gender} ";
            filterObj.gender = params.gender;
        }
        query = query + '  order by ui.id desc ';

        if(params.start){
            query += " offset ${start} ";
            filterObj.start = params.start;
        }
        if(params.size){
            query += " limit ${size} ";
            filterObj.size = params.size;
        }
        logger.debug(' queryUserProfile ');
        return await pgDb.any(query,filterObj);
    }
    static async queryUserProfileBase(params) {
        let query = " select up.*,ui.gender,ui.name,ui.phone,ui.email,ui.birth from user_profile up left join user_info ui on up.user_id = ui.id where up.id is not null " 
        let filterObj = {};
        if(params.id){
            query += " and up.id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.userId){
            query += " and up.user_id = ${userId} ";
            filterObj.userId = params.userId;
        }
        if(params.status){
            query += " and up.status = ${status} ";
            filterObj.status = params.status;
        }
        query = query + '  order by up.id desc ';

        if(params.start){
            query += " offset ${start} ";
            filterObj.start = params.start;
        }
        if(params.size){
            query += " limit ${size} ";
            filterObj.size = params.size;
        }
        logger.debug(' queryUserProfile ');
        return await pgDb.any(query,filterObj);
    }

    static async createUserProfile (params) {
        let paramObj = {};
        if(params.userId){
            paramObj.user_id = params.userId;
        }
        if(params.phone){            
            paramObj.phone = params.phone;
        }
        if(params.status){
            paramObj.status = params.status;
        }
        if(params.current){           
            paramObj.current = params.current;
        }
        if(params.eduLevel){           
            paramObj.edu_level = params.eduLevel;
        }
        if(params.excellent){           
            paramObj.edu_level = params.eduLevel;
        }
        if(params.lastTitle){           
            paramObj.last_title = params.lastTitle;
        }
        if(params.lastEn){           
            paramObj.last_en = params.lastEn;
        }
        if(params.areaId){           
            paramObj.area_id = params.areaId;
        }
        if(params.areaName){           
            paramObj.area_name = params.areaName;
        }
        if(params.cityId){           
            paramObj.city_id = params.cityId;
        }
        if(params.cityName){           
            paramObj.city_name = params.cityName;
        }
        if(params.providenceId){           
            paramObj.providence_id = params.providenceId;
        }
        if(params.providenceName){           
            paramObj.providence_name = params.providenceName;
        }
        if(params.party){           
            paramObj.party = params.party;
        }
        if(params.marital){           
            paramObj.marital = params.marital;
        }
        if(params.height){           
            paramObj.height = params.height;
        }
        if(params.weight){           
            paramObj.weight = params.weight;
        }
        if(params.dateId){           
            paramObj.date_id = params.dateId;
        }
        let query = ' INSERT INTO user_profile (${this:name}) VALUES (${this:csv}) RETURNING *';
        return await pgDb.one(query,paramObj);
    }
    static async updateUserProfile (params) {
        let paramObj = {};
        let columnArray = []
        
        
        if(params.status){
            paramObj.status = params.status;
            columnArray.push('status');
        }
        if(params.current){           
            paramObj.current = params.current;
            columnArray.push('current');
        }
        if(params.eduLevel){           
            paramObj.edu_level = params.eduLevel;
            columnArray.push('edu_level');
        }
        if(params.excellent){           
            paramObj.edu_level = params.eduLevel;
            columnArray.push('edu_level');
        }
        if(params.lastTitle){           
            paramObj.last_title = params.lastTitle;
            columnArray.push('last_title');
        }
        if(params.lastEn){           
            paramObj.last_en = params.lastEn;
            columnArray.push('last_en');
        }
        if(params.areaId){           
            paramObj.area_id = params.areaId;
            columnArray.push('area_id');
        }
        if(params.areaName){           
            paramObj.area_name = params.areaName;
            columnArray.push('area_name');
        }
        if(params.cityId){           
            paramObj.city_id = params.cityId;
            columnArray.push('city_id');
        }
        if(params.cityName){           
            paramObj.city_name = params.cityName;
            columnArray.push('city_name');
        }
        if(params.providenceId){           
            paramObj.providence_id = params.providenceId;
            columnArray.push('providence_id');
        }
        if(params.providenceName){           
            paramObj.providence_name = params.providenceName;
            columnArray.push('providence_name');
        }
        if(params.party){           
            paramObj.party = params.party;
            columnArray.push('party');
        }
        if(params.marital){           
            paramObj.marital = params.marital;
            columnArray.push('marital');
        }
        if(params.height){           
            paramObj.height = params.height;
            columnArray.push('height');
        }
        if(params.weight){           
            paramObj.weight = params.weight;
            columnArray.push('weight');
        }
        if(params.dateId){           
            paramObj.date_id = params.dateId;
            columnArray.push('date_id');
        }
        if(params.cert){           
            paramObj.cert = params.cert;
            columnArray.push('cert');
        }
        console.log(columnArray)
        const cs = new pgp.helpers.ColumnSet(columnArray);
        console.log(cs)
        const query = pgp.helpers.update(paramObj, cs, 'user_profile');
        return await pgDb.one(query +' where id = $1 and user_id = $2 RETURNING *',[params.id,params.userId]);
    }
    static async createUserProfileOpt (params) {
        let paramObj = {};
        if(params.userId){
            paramObj.user_id = params.userId;
        }
        if(params.profileId){            
            paramObj.profile_id = params.profileId;
        }
        if(params.status){
            paramObj.status = params.status;
        }
        if(params.optType){           
            paramObj.opt_type = params.optType;
        }
        if(params.industryId){           
            paramObj.industry_id = params.industryId;
        }
        if(params.industryName){           
            paramObj.industry_name = params.industryName;
        }
        if(params.industrySubId){           
            paramObj.industry_sub_id = params.industrySubId;
        }
        if(params.industrySubName){           
            paramObj.industry_sub_name = params.industrySubName;
        }
        if(params.jobId){           
            paramObj.job_id = params.jobId;
        }
        if(params.jobName){           
            paramObj.job_name = params.jobName;
        }
        if(params.jobTypeId){           
            paramObj.job_type_id = params.jobTypeId;
        }
        if(params.jobTypeName){           
            paramObj.job_type_name = params.jobTypeName;
        }
        if(params.jobTypeSubId){           
            paramObj.job_type_sub_id = params.jobTypeSubId;
        }
        if(params.jobTypeSubName){           
            paramObj.job_type_sub_name = params.jobTypeSubName;
        }
        if(params.cityId){           
            paramObj.city_id = params.cityId;
        }
        if(params.cityName){           
            paramObj.city_name = params.cityName;
        }
        if(params.providenceId){           
            paramObj.providence_id = params.providenceId;
        }
        if(params.providenceName){           
            paramObj.providence_name = params.providenceName;
        }
        if(params.salaryMin){           
            paramObj.salary_min = params.salaryMin;
        }
        if(params.salaryMax){           
            paramObj.salary_max = params.salaryMax;
        }
        let query = ' INSERT INTO user_profile_opt (${this:name}) VALUES (${this:csv}) RETURNING *';
        return await pgDb.one(query,paramObj);
        
    }
    static async updateUserProfileOpt (params) {
        let paramObj = {};
        let columnArray = []
        if(params.userId){
            paramObj.user_id = params.userId;
            columnArray.push('user_id');
        }
        if(params.profileId){            
            paramObj.profile_id = params.profileId;
            columnArray.push('profile_id');
        }
        if(params.status){
            paramObj.status = params.status;
            columnArray.push('status');
        }
        if(params.optType){           
            paramObj.opt_type = params.optType;
            columnArray.push('opt_type');
        }
        if(params.industryId){           
            paramObj.industry_id = params.industryId;
            columnArray.push('industry_id');
        }
        if(params.industryName){           
            paramObj.industry_name = params.industryName;
            columnArray.push('industry_name');
        }
        if(params.industrySubId){           
            paramObj.industry_sub_id = params.industrySubId;
            columnArray.push('industry_sub_id');
        }
        if(params.industrySubName){           
            paramObj.industry_sub_name = params.industrySubName;
            columnArray.push('industry_sub_name');
        }
        if(params.jobId){           
            paramObj.job_id = params.jobId;
            columnArray.push('job_id');
        }
        if(params.jobName){           
            paramObj.job_name = params.jobName;
            columnArray.push('job_name');
        }
        if(params.jobTypeId){           
            paramObj.job_type_id = params.jobTypeId;
            columnArray.push('job_type_id');
        }
        if(params.jobTypeName){           
            paramObj.job_type_name = params.jobTypeName;
            columnArray.push('job_type_name');
        }
        if(params.jobTypeSubId){           
            paramObj.job_type_sub_id = params.jobTypeSubId;
            columnArray.push('job_type_sub_id');
        }
        if(params.jobTypeSubName){           
            paramObj.job_type_sub_name = params.jobTypeSubName;
            columnArray.push('job_type_sub_name');
        }
        if(params.cityId){           
            paramObj.city_id = params.cityId;
            columnArray.push('city_id');
        }
        if(params.cityName){           
            paramObj.city_name = params.cityName;
            columnArray.push('city_name');
        }
        if(params.providenceId){           
            paramObj.providence_id = params.providenceId;
            columnArray.push('providence_id');
        }
        if(params.providenceName){           
            paramObj.providence_name = params.providenceName;
            columnArray.push('providence_name');
        }
        if(params.salaryMin){           
            paramObj.salary_min = params.salaryMin;
            columnArray.push('salary_min');
        }
        if(params.salaryMax){           
            paramObj.salary_max = params.salaryMax;
            columnArray.push('salary_max');
        }
        const cs = new pgp.helpers.ColumnSet(columnArray);
        const query = pgp.helpers.update(paramObj, cs, 'user_profile_opt');
        return await pgDb.one(query +' where id = $1 and user_id = $2 RETURNING *',[params.id,params.userId]);
    }
    static async deleteUserProfileOpt (params) {
        let query = ' DELETE FROM  user_profile_opt  where id = $1 and user_id = $2 RETURNING *';
        return await pgDb.one(query,[params.id,params.userId]);
    }
    static async queryUserProfileOpt(params) {
        let query = " select * from user_profile_opt where id is not null " 
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.userId){
            query += " and user_id = ${userId} ";
            filterObj.userId = params.userId;
        }
        if(params.profileId){
            query += " and profile_id = ${profileId} ";
            filterObj.id = params.profileId;
        }
        if(params.optType){
            query += " and opt_type = ${optType} ";
            filterObj.optType = params.optType;
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
        logger.debug(' queryUserProfileOpt ');
        return await pgDb.any(query,filterObj);
    }
    static async createUserProfileWork (params) {
        let paramObj = {};
        if(params.userId){
            paramObj.user_id = params.userId;
        }
        if(params.profileId){            
            paramObj.profile_id = params.profileId;
        }
        if(params.status){
            paramObj.status = params.status;
        }
        if(params.remark){           
            paramObj.remark = params.remark;
        }
        if(params.title){           
            paramObj.title = params.title;
        }
        if(params.enName){           
            paramObj.en_name = params.enName;
        }
        if(params.department){           
            paramObj.department = params.department;
        }
        if(params.industryId){           
            paramObj.industry_id = params.industryId;
        }
        if(params.industryName){           
            paramObj.industry_name = params.industryName;
        }
        if(params.industrySubId){           
            paramObj.industry_sub_id = params.industrySubId;
        }
        if(params.industrySubName){           
            paramObj.industry_sub_name = params.industrySubName;
        }
        if(params.jobId){           
            paramObj.job_id = params.jobId;
        }
        if(params.jobName){           
            paramObj.job_name = params.jobName;
        }
        if(params.jobTypeId){           
            paramObj.job_type_id = params.jobTypeId;
        }
        if(params.jobTypeName){           
            paramObj.job_type_name = params.jobTypeName;
        }
        if(params.jobTypeSubId){           
            paramObj.job_type_sub_id = params.jobTypeSubId;
        }
        if(params.jobTypeSubName){           
            paramObj.job_type_sub_name = params.jobTypeSubName;
        }
        if(params.foreign){           
            paramObj.foreign = params.foreign;
        }
        if(params.workStart){           
            paramObj.work_start = params.workStart;
        }
        if(params.workEnd){           
            paramObj.work_end = params.workEnd;
        }
        let query = ' INSERT INTO user_profile_work (${this:name}) VALUES (${this:csv}) RETURNING *';
        return await pgDb.one(query,paramObj);
        
    }
    static async updateUserProfileWork (params) {

        let paramObj = {};
        let columnArray = []
        if(params.userId){
            paramObj.user_id = params.userId;
            columnArray.push('user_id');
        }
        if(params.profileId){            
            paramObj.profile_id = params.profileId;
            columnArray.push('profile_id');
        }
        if(params.status){
            paramObj.status = params.status;
            columnArray.push('status');
        }
        if(params.remark){           
            paramObj.remark = params.remark;
            columnArray.push('remark');
        }
        if(params.title){           
            paramObj.title = params.title;
            columnArray.push('title');
        }
        if(params.enName){           
            paramObj.en_name = params.enName;
            columnArray.push('en_name');
        }
        if(params.department){           
            paramObj.department = params.department;
            columnArray.push('department');
        }
        if(params.industryId){           
            paramObj.industry_id = params.industryId;
            columnArray.push('industry_id');
        }
        if(params.industryName){           
            paramObj.industry_name = params.industryName;
            columnArray.push('industry_name');
        }
        if(params.industrySubId){           
            paramObj.industry_sub_id = params.industrySubId;
            columnArray.push('industry_sub_id');
        }
        if(params.industrySubName){           
            paramObj.industry_sub_name = params.industrySubName;
            columnArray.push('industry_sub_name');
        }
        if(params.jobId){           
            paramObj.job_id = params.jobId;
            columnArray.push('job_id');
        }
        if(params.jobName){           
            paramObj.job_name = params.jobName;
            columnArray.push('job_name');
        }
        if(params.jobTypeId){           
            paramObj.job_type_id = params.jobTypeId;
            columnArray.push('job_type_id');
        }
        if(params.jobTypeName){           
            paramObj.job_type_name = params.jobTypeName;
            columnArray.push('job_type_name');
        }
        if(params.jobTypeSubId){           
            paramObj.job_type_sub_id = params.jobTypeSubId;
            columnArray.push('job_type_sub_id');
        }
        if(params.jobTypeSubName){           
            paramObj.job_type_sub_name = params.jobTypeSubName;
            columnArray.push('job_type_sub_name');
        }
        if(params.foreign){           
            paramObj.foreign = params.foreign;
            columnArray.push('foreign');
        }
        if(params.workStart){           
            paramObj.work_start = params.workStart;
            columnArray.push('work_start');
        }
        
        paramObj.work_end = params.workEnd;
        columnArray.push('work_end');
        const cs = new pgp.helpers.ColumnSet(columnArray);
        const query = pgp.helpers.update(paramObj, cs, 'user_profile_work');
        return await pgDb.one(query +' where id = $1 and user_id = $2 RETURNING *',[params.id,params.userId]);

    }
    static async deleteUserProfileWork (params) {
        let query = ' DELETE FROM  user_profile_work  where id = $1 and user_id = $2 RETURNING *';
        return await pgDb.one(query,[params.id,params.userId]);
    }
    static async queryUserProfileWork(params) {
        let query = " select * from user_profile_work where id is not null " 
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.userId){
            query += " and user_id = ${userId} ";
            filterObj.userId = params.userId;
        }
        if(params.profileId){
            query += " and profile_id = ${profileId} ";
            filterObj.id = params.profileId;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        query = query + '  order by work_start desc ';

        if(params.start){
            query += " offset ${start} ";
            filterObj.start = params.start;
        }
        if(params.size){
            query += " limit ${size} ";
            filterObj.size = params.size;
        }
        logger.debug(' queryUserProfileWork ');
        return await pgDb.any(query,filterObj);
    }

    static async createUserProfileEdu (params) {
        let paramObj = {};
        if(params.userId){
            paramObj.user_id = params.userId;
        }
        if(params.profileId){            
            paramObj.profile_id = params.profileId;
        }
        if(params.status){
            paramObj.status = params.status;
        }
        if(params.eduLevel){           
            paramObj.edu_level = params.eduLevel;
        }
        if(params.eduName){           
            paramObj.edu_name = params.eduName;
        }
        if(params.eduType){           
            paramObj.edu_type = params.eduType;
        }
        if(params.college){           
            paramObj.college = params.college;
        }
        if(params.major){           
            paramObj.major = params.major;
        }
        if(params.foreign){           
            paramObj.foreign = params.foreign;
        }
        if(params.eduStart){           
            paramObj.edu_start = params.eduStart;
        }
        if(params.eduEnd){           
            paramObj.edu_end = params.eduEnd;
        }
        if(params.remark){           
            paramObj.remark = params.remark;
        }
        let query = ' INSERT INTO user_profile_edu (${this:name}) VALUES (${this:csv}) RETURNING * ';
        return await pgDb.one(query,paramObj);
    }
    static async updateUserProfileEdu (params) {

        let paramObj = {};
        let columnArray = []
        if(params.profileId){            
            paramObj.profile_id = params.profileId;
            columnArray.push('profile_id');
        }
        if(params.status){
            paramObj.status = params.status;
            columnArray.push('status');
        }
        if(params.eduLevel){           
            paramObj.edu_level = params.eduLevel;
            columnArray.push('edu_level');
        }
        if(params.eduName){           
            paramObj.edu_name = params.eduName;
            columnArray.push('edu_name');
        }
        if(params.eduType){           
            paramObj.edu_type = params.eduType;
            columnArray.push('edu_type');
        }
        if(params.college){           
            paramObj.college = params.college;
            columnArray.push('college');
        }
        if(params.major){           
            paramObj.major = params.major;
            columnArray.push('major');
        }
        if(params.foreign){           
            paramObj.foreign = params.foreign;
            columnArray.push('foreign');
        }
        if(params.eduStart){           
            paramObj.edu_start = params.eduStart;
            columnArray.push('edu_start');
        }
                  
        paramObj.edu_end = params.eduEnd;
        columnArray.push('edu_end');
        
        if(params.remark){           
            paramObj.remark = params.remark;
            columnArray.push('remark');
        }
        const cs = new pgp.helpers.ColumnSet(columnArray);
        const query = pgp.helpers.update(paramObj, cs, 'user_profile_edu');
        return await pgDb.one(query +' where id = $1 and user_id = $2 RETURNING *',[params.id,params.userId]);
    }
    static async deleteUserProfileEdu (params) {
        let query = ' DELETE FROM  user_profile_edu  where id = $1 and user_id = $2 RETURNING *';
        return await pgDb.one(query,[params.id,params.userId]);
    }
    static async queryUserProfileEdu(params) {
        let query = " select * from user_profile_edu where id is not null " 
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.userId){
            query += " and user_id = ${userId} ";
            filterObj.userId = params.userId;
        }
        if(params.profileId){
            query += " and profile_id = ${profileId} ";
            filterObj.id = params.profileId;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        query = query + '  order by edu_level desc ';

        if(params.start){
            query += " offset ${start} ";
            filterObj.start = params.start;
        }
        if(params.size){
            query += " limit ${size} ";
            filterObj.size = params.size;
        }
        logger.debug(' queryUserProfileEdu ');
        return await pgDb.any(query,filterObj);
    }

    static async createUserProfileProject (params) {
        let paramObj = {};
        if(params.userId){
            paramObj.user_id = params.userId;
        }
        if(params.profileId){            
            paramObj.profile_id = params.profileId;
        }
        if(params.status){
            paramObj.status = params.status;
        }
        if(params.proName){           
            paramObj.pro_name = params.proName;
        }
        if(params.title){           
            paramObj.title = params.title;
        }
        if(params.proStart){           
            paramObj.pro_start = params.proStart;
        }
        if(params.proEnd){           
            paramObj.pro_end = params.proEnd;
        }
        if(params.remark){           
            paramObj.remark = params.remark;
        }
        let query = ' INSERT INTO user_profile_project (${this:name}) VALUES (${this:csv}) RETURNING * ';
        return await pgDb.one(query,paramObj);
    }
    static async updateUserProfileProject (params) {
        let paramObj = {};
        let columnArray = []
        if(params.userId){
            paramObj.user_id = params.userId;
            columnArray.push('user_id');
        }
        if(params.profileId){            
            paramObj.profile_id = params.profileId;
            columnArray.push('profile_id');
        }
        if(params.status){
            paramObj.status = params.status;
            columnArray.push('status');
        }
        if(params.proName){           
            paramObj.pro_name = params.proName;
            columnArray.push('pro_name');
        }
        if(params.title){           
            paramObj.title = params.title;
            columnArray.push('title');
        }
        if(params.proStart){           
            paramObj.pro_start = params.proStart;
            columnArray.push('pro_start');
        }
        if(params.remark){           
            paramObj.remark = params.remark;
            columnArray.push('remark');
        }
        paramObj.pro_end = params.proEnd;
        columnArray.push('pro_end');        
        const cs = new pgp.helpers.ColumnSet(columnArray);
        const query = pgp.helpers.update(paramObj, cs, 'user_profile_project');
        return await pgDb.one(query +' where id = $1 and user_id = $2 RETURNING *',[params.id,params.userId]);
    }
    static async deleteUserProfileProject (params) {
        let query = ' DELETE FROM  user_profile_project  where id = $1 and user_id = $2 RETURNING *';
        return await pgDb.one(query,[params.id,params.userId]);
    }
    static async queryUserProfileProject(params) {
        let query = " select * from user_profile_project where id is not null " 
        let filterObj = {};
        if(params.id){
            query += " and id = ${id} ";
            filterObj.id = params.id;
        }
        if(params.userId){
            query += " and user_id = ${userId} ";
            filterObj.userId = params.userId;
        }
        if(params.profileId){
            query += " and profile_id = ${profileId} ";
            filterObj.id = params.profileId;
        }
        if(params.status){
            query += " and status = ${status} ";
            filterObj.status = params.status;
        }
        query = query + '  order by pro_start desc ';

        if(params.start){
            query += " offset ${start} ";
            filterObj.start = params.start;
        }
        if(params.size){
            query += " limit ${size} ";
            filterObj.size = params.size;
        }
        logger.debug(' queryUserProfileProject ');
        return await pgDb.any(query,filterObj);
    }

}

module.exports = UserProfileDAO;