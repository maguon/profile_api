const serverLogger = require('../../util/ServerLogger.js');
const logger = serverLogger.createLog({"file":'DBCon.js'});
const config = require('../../config');
let initOptions  = {};

if(config.dbConfig.initOptions.native){
    initOptions = {query(e) {
        logger.debug(e.query);
    }}
}
const pgp = require('pg-promise')(initOptions);

const cn = config.dbConfig.connectOptions;

const pgDb = pgp(cn);

module.exports = {pgDb,pgp};
