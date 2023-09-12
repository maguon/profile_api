const qs = require("querystring")
const sysConfig = require('../config');

const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const customFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((i) => 
    `${[i.timestamp]} ${i.level} ${i.file}: ${i.message}`),
);

const defaultOptions = {
    format: customFormat,
    datePattern: "YYYY-MM-DD",
    zippedArchive: false,
    maxSize: "10m",
    // maxFiles: "14d",
}

const createLog = (meta) => {
    const logger = createLogger({
        level: sysConfig.logLevel,
        format: format.json(),
        ...defaultOptions,
        defaultMeta: meta,
        transports: [            
            new transports.DailyRotateFile({
                filename: sysConfig.logName,
                level: sysConfig.logLevel,
                ...defaultOptions,
            }),
            new transports.Console({ level: 'debug' }),
        ],
    });
    return logger
}

///-- Exports

module.exports = {
    createLog
};



