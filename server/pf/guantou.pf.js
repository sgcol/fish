var express = require('express');
var crypto = require('crypto'),
    argv = require('yargs').argv,
    debugout = require('debugout')(argv.debugout);;
var router = express.Router();
var qs = require('querystring').stringify,
    url = require('url');
var httpf = require('httpf');
var getDB = require('../db.js'),
    ObjectID = require('mongodb').ObjectID;
var User = require('../User.js');
var merge=require('gy-merge'), sortObj=require('sort-object'), qs=require('querystring').stringify;

const MatchVS_APP_KEY='abcd',  MatchVS_APP_SECRET='qwer';

function md5(_str) {
	return crypto.createHash('md5').update(_str).digest('hex');
}
function strObj(o) {
    var str='';
    for (var k in o) {
        str+=''+k+'='+o[k]+'&';
    }
    return str;
}
function chksign(req, res, next) {
    var allp=merge(req.query, req.body);
    var sign=allp.sign;
    delete allp.sign;
    var str=MatchVS_APP_KEY+'&'+strObj(allp=sortObj(allp))+MatchVS_APP_SECRET;
    if (md5(str)==sign) return next();
    allp.str=str;
    allp.wanted=md5(str);
    allp.recved=sign;
    allp.openOrderTime=allp.orderTime;
    allp.openOrderAmount=allp.amount;
    allp.err='sign err';
    res.json(signObj(allp)).end();
};

function signObj(o) {
    debugout('enter sign o');
    if (o.sign) delete o.sign;
    var str=MatchVS_APP_KEY+'&'+strObj(sortObj(o))+MatchVS_APP_SECRET;
    o.sign=md5(str);
    debugout('sign obj', o)
    return o;    
}

router.all('/pay', chksign, httpf({ openOrderID: 'string', amount: 'number', orderTime:'string', orderID:'string', cache:'string', callback: true }, function(orderid, money, t, externID, cache, callback) {
    // console.log('pay')
    var self = this;
    confirmOrder(orderid, money, self.req.ip,function(err) {
        try {
        if (err) return callback(null, httpf.json(signObj({err:err, openOrderResult:'99', openOrderAmount:''+money, openOrderID:orderid, openOrderTime:t, orderID:externID, cache:cache})));
        return callback(null, httpf.json(signObj({openOrderResult:'0', openOrderAmount:''+money, openOrderID:orderid, openOrderTime:t, orderID:externID, cache:cache})));
        } catch(e) {debugout(e) }
    });
}));

module.exports = router;