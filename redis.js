const Redis = require('ioredis');

const redis = new Redis({
	host: 'redis-15372.c98.us-east-1-4.ec2.cloud.redislabs.com',
	port: 15372,
	password: 'x8JmtGV9Ypd3o4Bg5zfwbV0yXEVeW8io',
});

module.exports = redis;
