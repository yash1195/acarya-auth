// external packages
const dynamodb = require('dynamodb');
const joi = require('joi');

// configure dynamoDB
const awsConfig = require('../config/aws');
dynamodb.AWS.config.update({
	accessKeyId : awsConfig.accessKeyId,
	secretAccessKey : awsConfig.secretAccessKey,
	region : awsConfig.region
});

// token model
let Token = dynamodb.define('Token', {
	hashKey : 'token',
	schema : {
		token : joi.string(),
		level: joi.string()
	},
	tableName: 'acarya-auth-tokens'
});

module.exports = Token;