var express = require('express');
var crypto = require('crypto'),argv=require('yargs').argv, debugout=require('debugout')(argv.debugout);;
var router = express.Router();
var request=require('request');
var qs=require('querystring').stringify, url=require('url');
var httpf=require('httpf');
var getDB=require('../db.js'), ObjectID = require('mongodb').ObjectID;
var User=require('../User.js');

const APPID='wx15fefc1cb71966f5', SECRET='36ada655f0d366815fd5d4f2e145074e';
router.all('/openid', httpf({code:'string', callback:true}, function(code, callback) {
    request({uri:'https://api.weixin.qq.com/sns/jscode2session', qs:{appid:APPID,secret:SECRET,js_code:code,grant_type:'authorization_code'}}, function(err, head, body) {
        if (err) return callback(err);
        try {
            body=JSON.parse(body);
        } catch(e) {
            return callback(e);
        }
        callback(null, body);
    });
}));
getDB(function(err, db) {
	if (err) return router.use(function(req,res) {
		res.send({err:err});
	});
	router.all('/pay', httpf({orderid:'string', money:'number', callback:true}, function(orderid, money, callback) {
	}));
});
module.exports=router;