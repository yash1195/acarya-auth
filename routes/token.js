var express = require('express');
var router = express.Router();

// external packages
const dynamodb = require('dynamodb');
const joi = require('joi');
const uniqid = require('uniqid');

// configure aws
const awsConfig = require('../config/aws');
dynamodb.AWS.config.update({
	accessKeyId : awsConfig.accessKeyId,
	secretAccessKey : awsConfig.secretAccessKey,
	region : awsConfig.region
});

// models
const tokenModel = require('../models/token');

// responses
const apiResponses = require('../responses/responses');

/* GET users listing. */
router.post('/auth', function(req, res, next) {

	// retrieve token from request
	let token = req.body.token;

	// verify from dynamo
	tokenModel.get(token, function(err, document) {
		if (err) {
			res.send(apiResponses.token.auth.failure);
		} else {
			let currResp = {
				status: apiResponses.token.auth.success.status,
				msg: apiResponses.token.auth.success.msg,
				token: token,
				level: document.token
			}
			res.send(currResp);
		}
	});
});


router.post('/create', function(req, res, next) {

	// retrieve token from request
	let token = uniqid.process();
	let level = req.body.level;

	console.log(token);
	
	// create document
	tokenModel.create({token: token, level: level}, function(err, document) {

		if (err) {
			res.send(apiResponses.token.creation.failure);
		} else {
			let currResp = {
				'status': apiResponses.token.creation.success.status,
				'msg': apiResponses.token.creation.success.msg,
				'token': token
			};
			res.send(currResp);
		}
	});
});

router.get('/', function(req, res, next){

	tokenModel.scan().loadAll().exec(function(err, document) {
		if (err) {
			res.send(apiResponses.token.fetchAll.failure);
		} else {
			let currResp = {
				'status': apiResponses.token.fetchAll.success.status,
				'msg': apiResponses.token.fetchAll.success.msg,
				'items': document['Items']
			};
			res.send(currResp);
		}
	});
});

module.exports = router;
