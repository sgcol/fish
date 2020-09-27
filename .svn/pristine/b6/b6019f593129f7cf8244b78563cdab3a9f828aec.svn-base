var express = require('express');
var crypto = require('crypto'),argv=require('yargs').argv, debugout=require('debugout')(argv.debugout);;
var router = express.Router();
var qs=require('querystring').stringify, url=require('url'), path=require('path'), qqsig=require('./qq_sig.js');
var httpf=require('httpf');
var getDB=require('../db.js'), ObjectID = require('mongodb').ObjectID;
var User=require('../User.js');

const appid='1106378639', appkey='ef6vOWBMVAI4TQpj';

function sign(path, data) {
    data=merge(data, {appid:appid, format:'json', userip:'0.0.0.0'});
    if (!data.openid || !data.openkey || !data.pf) return null;
    if (data.sig) delete data.sig;
    data.sig=qqsig(appkey, 'GET', path, data);
    return data;
}
function accWanba(path, data, cb) {
    request(path.join('https://api.urlshare.cn', path), sign(path, data) ,function(err, head, body) {
		try {
			body=JSON.parse(body);
		}catch(e) {body={err:e}};
		var err=err||(header.statusCode==200?null:header.statusCode)||body.msg;
		if (err) return cb(err);
		cb(null, body);
    });
}
getDB(function(err, db) {
	if (err) return router.use(function(req,res) {
		res.send({err:err});
	});
	router.all('/sign', function(req, res) {
        var param=merge(req.query, req.body);
        param.userip=param.userip||req['X-Real-IP']||req.ip;
        var path=param.path;
        delete path.path;
        var d=sign(path, param);
        if (!d) {
            return res.send({err:'qqsign不能完成，缺少必要参数'});
        }
        return res.send(d);
	});
	router.all('/getUser', httpf({openid:'string', openkey:'string', pf:'string', callback:true}, function(openid, openkey, pf, callback) {
        var self=this;
        // var param=merge(this.req.query, this.req.body);
        accWanba('/v3/user/get_info', {openid:openid, openkey:openkey, pf:pf, userip:this.req['X-Real-IP']||this.req.ip}, callback);
	}));

});
module.exports=router;