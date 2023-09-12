const app = require("./server.js")
const serverLogger = require('./util/ServerLogger.js');
const logger = serverLogger.createLog({file:"server.js"});
const server = require('./server.js');
const config = require('./config/index.js');

(() =>{
    const mainServer = server.createServer()
     
   
    mainServer.listen(config.serverPort, ()=> {
        logger.info("server start  success at : " +config.serverPort)
    })
})()
