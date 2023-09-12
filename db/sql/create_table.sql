CREATE USER profile_dev WITH PASSWORD 'profile_tool_2023';
CREATE DATABASE profile_tool owner profile_dev;
GRANT ALL ON DATABASE profile_tool TO profile_dev; 

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
-- CREATE FUNCTION UPDATE_TIMESTAMP_FUNC
create or replace function update_timestamp_func() returns trigger as $$ begin new.updated_at = current_timestamp;
return new;
end $$ language plpgsql;


--CREATE TABLE date_base
CREATE TABLE IF NOT EXISTS public.date_base
(
    id integer NOT NULL,
    day integer NOT NULL,
    week integer NOT NULL,
    month integer NOT NULL,
    year integer NOT NULL,
    y_month integer NOT NULL,
    y_week integer NOT NULL,
    PRIMARY KEY (id)
);
SELECT cron.schedule('add_date_sdl', '0 16 * * *', $$insert into date_base (id,day,week,month,year,y_month,y_week) values
( CAST (to_char(current_timestamp, 'YYYYMMDD') AS NUMERIC)  ,
CAST(ltrim(to_char(current_timestamp, 'DD'),'0') AS NUMERIC) ,
CAST(ltrim(to_char(current_timestamp, 'WW'),'0')  AS NUMERIC) ,
CAST(ltrim(to_char(current_timestamp, 'MM'),'0') AS NUMERIC) ,
CAST(to_char(current_timestamp, 'YYYY') AS NUMERIC),
CAST(to_char(current_timestamp, 'YYYYMM') AS NUMERIC) ,
CAST(to_char(current_timestamp, 'YYYYWW') AS NUMERIC));$$);



---------------------------
-- Table structure for cms_type
-- ----------------------------
CREATE TABLE public.cms_type (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "sys_user" int8 NOT NULL,
    "type" int2 NOT NULL,
    "name" varchar(50) NULL,
    "remark" varchar(200) NULL,
    CONSTRAINT cms_type_pk PRIMARY KEY (id)
);
-- Column comments
create trigger cms_type_upt before
update on cms_type for each row execute procedure update_timestamp_func();
select setval('cms_type_id_seq', 100000, false);


-- ----------------------------
-- Table structure for cms_content
-- ----------------------------
CREATE TABLE public.cms_content (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "sys_user" int8 NOT NULL,
    "type_id" int8 NOT NULL,
    "title" varchar(100) NULL,
    "content" text NULL,
    "remark" varchar(200) NULL,
    CONSTRAINT cms_content_pk PRIMARY KEY (id)
);
-- Column comments
create trigger cms_content_upt before
update on cms_content for each row execute procedure update_timestamp_func();
select setval('cms_content_id_seq', 100000, false);


-- -----------------------------------
-- Table structure for base_providence
-- -----------------------------------
CREATE TABLE public.base_providence (
    "id" serial NOT NULL,
    "status" int2 NOT NULL,
    "name" varchar(20) NOT NULL,
    CONSTRAINT base_providence_pk PRIMARY KEY (id)
);
-- -----------------------------------
-- Table structure for base_city
-- -----------------------------------
CREATE TABLE public.base_city (
    "id" serial NOT NULL,
    "p_id" serial NOT NULL,
    "status" int2 NOT NULL,
    "name" varchar(20) NOT NULL,
    CONSTRAINT base_city_pk PRIMARY KEY (id)
);
-- -----------------------------------
-- Table structure for base_city
-- -----------------------------------
CREATE TABLE public.base_area (
    "id" serial NOT NULL,
    "p_id" serial NOT NULL,
    "c_id" serial NOT NULL,
    "status" int2 NOT NULL,
    "name" varchar(20) NOT NULL,
    CONSTRAINT base_area_pk PRIMARY KEY (id)
);

-- -----------------------------------
-- Table structure for base_job
-- -----------------------------------
CREATE TABLE public.base_job (
    "id" serial NOT NULL,
    "status" int2 NOT NULL,
    "name" varchar(20) NOT NULL,
    CONSTRAINT base_job_pk PRIMARY KEY (id)
);

-- -----------------------------------
-- Table structure for base_job_type
-- -----------------------------------
CREATE TABLE public.base_job_type (
    "id" serial NOT NULL,
    "j_id" serial NOT NULL,
    "status" int2 NOT NULL,
    "name" varchar(20) NOT NULL,
    CONSTRAINT base_job_type_pk PRIMARY KEY (id)
);

-- ---------------------------------------
-- Table structure for base_job_type_sub
-- ---------------------------------------
CREATE TABLE public.base_job_type_sub (
    "id" serial NOT NULL,
    "j_id" serial NOT NULL,
    "t_id" serial NOT NULL,
    "status" int2 NOT NULL,
    "name" varchar(20) NOT NULL,
    CONSTRAINT base_job_type_sub_pk PRIMARY KEY (id)
);

-- -----------------------------------
-- Table structure for base_industry
-- -----------------------------------
CREATE TABLE public.base_industry (
    "id" serial NOT NULL,
    "status" int2 NOT NULL,
    "name" varchar(20) NOT NULL,
    CONSTRAINT base_industry_pk PRIMARY KEY (id)
);

-- ---------------------------------------
-- Table structure for base_industry_sub
-- ---------------------------------------
CREATE TABLE public.base_industry_sub (
    "id" serial NOT NULL,
    "i_id" serial NOT NULL,
    "status" int2 NOT NULL,
    "name" varchar(20) NOT NULL,
    CONSTRAINT base_industry_sub_pk PRIMARY KEY (id)
);


-- -------------------------------
-- Table structure for user_device
-- -------------------------------
CREATE TABLE public.user_device (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "last_login_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "date_id" integer NOT NULL,
    "user_id" int8 NOT NULL,
    "brand" varchar(60) NULL,
    "model" varchar(60) NULL,
    "sys_info" varchar(60) NULL,
    "platform" varchar(60) NULL,
    "device_token" varchar(60) NULL,
    CONSTRAINT user_device_pk PRIMARY KEY (id)
);
create trigger user_device_upt before
update on user_device for each row execute procedure update_timestamp_func();
select setval('user_device_id_seq', 1000, false);


-- ----------------------------
-- Table structure for user_info
-- ----------------------------
CREATE TABLE public.user_info (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "date_id" int4 NOT NULL,
    "name" varchar(50) NULL,
    "phone" varchar(20) NULL,
    "email" varchar(100) NULL ,
    "password" varchar(100) NULL ,
    "gender" int2 NOT NULL,
    "birth" date NULL,
    CONSTRAINT user_info_pk PRIMARY KEY (id)
);

-- Column comments
create trigger user_info_upt before
update on user_info for each row execute procedure update_timestamp_func();
select setval('user_info_id_seq', 100000, false);

CREATE UNIQUE INDEX user_profile_id_unique ON user_profile (user_id); 
-- ----------------------------
-- Table structure for user_profile
-- ----------------------------
CREATE TABLE public.user_profile (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "date_id" int4 NOT NULL,
    "user_id" int8 NOT NULL,
    "current" int2  NULL,
    "work_at" date NULL,
    "area_id" int4 NOT NULL,
    "area_name" varchar(50) NULL,
    "city_id" int4 NOT NULL,
    "city_name" varchar(50) NULL,
    "providence_id" int4 NOT NULL,
    "providence_name" varchar(50) NULL,
    "marital" int2  NULL,
    "party" varchar(50) NULL,
    "nation" varchar(50) NULL,
    "height" int2 NULL,
    "weight" int2 NULL,
    "cert" jsonb  NULL,
    "edu_level" int2  NULL,
    "percentage" int2  NULL,
    "excellent" varchar(200) NULL,
    "last_title" varchar(50) NULL,
    "last_en" varchar(50) NULL,
    "last_start" date NULL,
    "last_end" date NULL,
    "salary_min" int2 NOT NULL DEFAULT 0,
    "salary_max" int2 NOT NULL DEFAULT 0,
    "edu_count" int2 NOT NULL DEFAULT 0,
    "opt_count" int2 NOT NULL DEFAULT 0,
    "profile_count" int2 NOT NULL DEFAULT 0,
    "work_count" int2 NOT NULL DEFAULT 0,
    "remark" varchar(200) NULL,
    "tags" text DEFAULT NULL, 
    "search_text" tsvector DEFAULT NULL,
    CONSTRAINT user_profile_pk PRIMARY KEY (id)
);
-- Column comments
create trigger user_profile_upt before
update on user_profile for each row execute procedure update_timestamp_func();
select setval('user_profile_id_seq', 100000, false);

CREATE UNIQUE INDEX user_profile_id_unique ON user_profile (user_id); 

-- ----------------------------
-- Table structure for user_profile_edu
-- ----------------------------
CREATE TABLE public.user_profile_edu (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "user_id" int8 NOT NULL,
    "profile_id" int8 NOT NULL,
    "edu_level" int2  NULL,
    "edu_name" varchar(50) NULL,
    "edu_type" int2  NULL DEFAULT 0 ,
    "college" varchar(50) NULL,
    "major" varchar(50) NULL,
    "foreign" int2  NULL,
    "edu_start" date NULL,
    "edu_end" date NULL,
    "remark" varchar(200) NULL,
    CONSTRAINT user_profile_edu_pk PRIMARY KEY (id)
);
-- Column comments
create trigger user_profile_edu_upt before
update on user_profile_edu for each row execute procedure update_timestamp_func();
select setval('user_profile_edu_id_seq', 100000, false);

-- ----------------------------
-- Table structure for user_profile_project
-- ----------------------------
CREATE TABLE public.user_profile_project (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "user_id" int8 NOT NULL,
    "profile_id" int8 NOT NULL,
    "pro_name" varchar(50) NULL,
    "title" varchar(50) NULL,
    "pro_start" date NULL,
    "pro_end" date NULL,
    "remark" varchar(200) NULL,
    CONSTRAINT user_profile_project_pk PRIMARY KEY (id)
);
-- Column comments
create trigger user_profile_project_upt before
update on user_profile_project for each row execute procedure update_timestamp_func();
select setval('user_profile_project_id_seq', 100000, false);


-- ----------------------------
-- Table structure for user_profile_work
-- ----------------------------
DROP TABLE IF EXISTS public.user_profile_work ;
CREATE TABLE public.user_profile_work (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "user_id" int8 NOT NULL,
    "profile_id" int8 NOT NULL,
    "title" varchar(50) NULL,
    "en_name" varchar(50) NULL,
    "department" varchar(50) NULL,
    "industry_id" int4 NOT NULL,
    "industry_name" varchar(50) NULL,
    "industry_sub_id" int4 NOT NULL,
    "industry_sub_name" varchar(50) NULL,
    "job_id" int4 NOT NULL,
    "job_name" varchar(50) NULL,
    "job_type_id" int4 NOT NULL,
    "job_type_name" varchar(50) NULL,
    "job_type_sub_id" int4 NOT NULL,
    "job_type_sub_name" varchar(50) NULL,
    "foreign" int2  NULL,
    "work_start" date NULL,
    "work_end" date NULL,
    "remark" varchar(200) NULL,
    CONSTRAINT user_profile_work_pk PRIMARY KEY (id)
);
-- Column comments
create trigger user_profile_work_upt before
update on user_profile_work for each row execute procedure update_timestamp_func();
select setval('user_profile_work_id_seq', 100000, false);


-- ----------------------------
-- Table structure for user_profile_opt
-- ----------------------------
DROP TABLE IF EXISTS public.user_profile_opt ;
CREATE TABLE public.user_profile_opt (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "user_id" int8 NOT NULL,
    "profile_id" int8 NOT NULL,
    "opt_type" int2 NOT NULL,
    "industry_id" int4 NOT NULL,
    "industry_name" varchar(50) NULL,
    "industry_sub_id" int4 NOT NULL,
    "industry_sub_name" varchar(50) NULL,
    "job_id" int4 NOT NULL,
    "job_name" varchar(50) NULL,
    "job_type_id" int4 NOT NULL,
    "job_type_name" varchar(50) NULL,
    "job_type_sub_id" int4 NOT NULL,
    "job_type_sub_name" varchar(50) NULL,
    "city_id" int4 NOT NULL,
    "city_name" varchar(50) NULL,
    "salary_min" int2 NOT NULL DEFAULT 0,
    "salary_max" int2 NOT NULL DEFAULT 0,
    "remark" varchar(200) NULL,
    CONSTRAINT user_profile_opt_pk PRIMARY KEY (id)
);
-- Column comments
create trigger user_profile_opt_upt before
update on user_profile_opt for each row execute procedure update_timestamp_func();
select setval('user_profile_opt_id_seq', 100000, false);



CREATE OR REPLACE FUNCTION update_profile_edu_func() RETURNS trigger AS $$ BEGIN 
update user_profile set edu_level =(select COALESCE(MAX(edu_level),0) from user_profile_edu where user_id =NEW.user_id) where user_id=NEW.user_id; RETURN NEW;
END;
$$
language plpgsql;

DROP TRIGGER IF EXISTS trg_update_profile_edu ON user_profile_edu;
CREATE TRIGGER trg_update_profile_edu AFTER
UPDATE ON user_profile_edu FOR EACH ROW EXECUTE PROCEDURE update_profile_edu_func();


DROP TRIGGER IF EXISTS trg_del_profile_edu ON user_profile_edu;
CREATE TRIGGER trg_del_profile_edu AFTER
DELETE ON user_profile_edu FOR EACH ROW EXECUTE PROCEDURE update_profile_edu_func();


DROP TRIGGER IF EXISTS trg_insert_profile_edu ON user_profile_edu;
CREATE TRIGGER trg_insert_profile_edu AFTER
INSERT ON user_profile_edu FOR EACH ROW EXECUTE PROCEDURE update_profile_edu_func();


CREATE OR REPLACE FUNCTION update_profile_work_func() RETURNS trigger AS $$ 
BEGIN 
    update user_profile set last_title= nt.job_type_sub_name ,last_en = nt.en_name ,last_start=nt.work_start,last_end = nt.work_end from 
    (select job_type_sub_name,en_name,work_start,work_end from user_profile_work where user_id=OLD.user_id 
    and work_start = (select max(work_start) from user_profile_work where user_id=OLD.user_id))  nt
    where user_id = OLD.user_id ;
		RETURN NEW;
END;
$$
language plpgsql;

DROP TRIGGER IF EXISTS trg_update_profile_work ON user_profile_work;
CREATE TRIGGER trg_update_profile_work AFTER
UPDATE ON user_profile_work FOR EACH ROW EXECUTE PROCEDURE update_profile_work_func();

DROP TRIGGER IF EXISTS trg_insert_profile_work ON user_profile_work;
CREATE TRIGGER trg_insert_profile_work AFTER
INSERT ON user_profile_work FOR EACH ROW EXECUTE PROCEDURE update_profile_work_func();

DROP TRIGGER IF EXISTS trg_delete_profile_work ON user_profile_work;
CREATE TRIGGER trg_delete_profile_work AFTER
DELETE ON user_profile_work FOR EACH ROW EXECUTE PROCEDURE update_profile_work_func();

CREATE OR REPLACE FUNCTION update_profile_opt_func() RETURNS trigger AS $$ 
BEGIN 
    update user_profile set salary_max= nt.salary_max ,salary_min = nt.salary_min  from 
    (select max(salary_max) as salary_max ,min(salary_min) as salary_min from user_profile_opt where user_id=new.user_id 
     )  as nt
    where user_id = new.user_id ;
		RETURN NEW;
END;
$$
language plpgsql;


DROP TRIGGER IF EXISTS trg_update_profile_opt ON user_profile_opt;
CREATE TRIGGER trg_update_profile_opt AFTER
UPDATE ON user_profile_opt FOR EACH ROW EXECUTE PROCEDURE update_profile_opt_func();

DROP TRIGGER IF EXISTS trg_insert_profile_opt ON user_profile_opt;
CREATE TRIGGER trg_insert_profile_opt AFTER
INSERT ON user_profile_opt FOR EACH ROW EXECUTE PROCEDURE update_profile_opt_func();

DROP TRIGGER IF EXISTS trg_del_profile_opt ON user_profile_opt;
CREATE TRIGGER trg_del_profile_opt AFTER
DELETE ON user_profile_opt FOR EACH ROW EXECUTE PROCEDURE update_profile_opt_func();



-- ----------------------------
-- Table structure for user_profile_tpl
-- ----------------------------
CREATE TABLE public.user_profile_tpl (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "tpl_name" varchar(50) NULL,
    "tpl_path" varchar(100) NULL,
    "tpl_cover" varchar(100) NULL,
    CONSTRAINT user_profile_tpl_pk PRIMARY KEY (id)
);
-- Column comments
create trigger user_profile_tpl_upt before
update on user_profile_tpl for each row execute procedure update_timestamp_func();
select setval('user_profile_tpl_id_seq', 100000, false);


-- ----------------------------
-- Table structure for user_feedback
-- ----------------------------
CREATE TABLE public.user_feedback (
    "id" bigserial NOT NULL,
    "created_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "updated_at" timestamp with time zone NOT NULL DEFAULT NOW(),
    "status" int2 NOT NULL,
    "user_id" int8 NULL,
    "title" varchar(100) NULL,
    "content" varchar(300) NULL,
    "imgs" text[] NULL,
    CONSTRAINT user_feedback_pk PRIMARY KEY (id)
);
-- Column comments
create trigger user_feedback_upt before
update on user_feedback for each row execute procedure update_timestamp_func();
select setval('user_feedback_id_seq', 100000, false);



