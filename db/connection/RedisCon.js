"use strict"
const Redis = require('ioredis');
const config = require('../../config/index.js');
const redis = new Redis(config.redisConfig.url);
module.exports = {
    redis
};
