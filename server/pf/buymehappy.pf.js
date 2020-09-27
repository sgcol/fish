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
var merge = require('gy-merge'),
    sortObj = require('sort-object'),
    qs = require('querystring').stringify;
var bodyParser = require('body-parser');
var request = require('request');
var multer = require('multer'),
    upload = multer();

const CHANNEL_ID = '7780586f696310de2a8ddbec927fc078',
    APP_SECRET = 'C3633CC4DC9FF0F525C1E6E507169BA8';

function md5(_str) {
    return crypto.createHash('md5').update(_str).digest('hex');
}

function strObj(o) {
    var jsonstr = JSON.stringify(objKeySort(o));
    var str1 = jsonstr.replace(new RegExp(':', 'g'), '=');
    var str2 = str1.replace(new RegExp(',', 'g'), '&');
    var str3 = str2.substring(1, str2.length - 1);
    var str4 = str3.replace(new RegExp('"', 'g'), '');
    var newstr = str4 + APP_SECRET;
    return newstr;
}

function objKeySort(o) {
    var newkey = Object.keys(o).sort();　　
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = o[newkey[i]];
    }
    return newObj;
}

function generateSign(o) {
    var str = strObj(o);
    // console.log(str)
    var sign = md5(str)
    return sign;
}

getDB(function(err, db) {
    router.all('/sign', httpf(function() {
        var req = this.req,
            res = this.res;
        var a = merge(req.query, req.body);
        var sign = generateSign(a);
        console.log(a);
        return { sign: sign };
    }));
    router.all('/logined', httpf({ userToken: 'string', no_return: true }, function(userToken) {
        var query = this.req.query;
        query.pf = 'buymehappy';
        query.userToken = userToken;
        query.id = userToken;
        // try {
        var nurl = url.format({ protocol: 'http', host: this.req.hostname, query: query, pathname: '/g/fish.app' });
        // } catch (e) { console.log(e) };
        var a = { g: 'Home', m: 'GameOauth', a: 'get_userinfo', userToken: userToken, channel_id: CHANNEL_ID };
        var sign = generateSign(a);
        a.sign = sign;
        request('http://buymehappy.com.cn/index.php', a, function(err, r) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(r);
            res.send('ok');
        });
        console.log(userToken, this.req.host, nurl);
        this.res.redirect(nurl);
    }));
    router.all('/pay', upload.single(),
        // function(req, res, next) {
        //     debugout('recved', req.body);
        //     try {
        //         req.body = JSON.parse(req.body);
        //     } catch (e) {
        //         return res.send(e);
        //     }
        //     next();
        // },
        httpf({ openid: 'string', price: 'string', other: 'any', item_id: 'string', orderid: 'string', callback: true }, function(openid, price, other, item_id, orderid, callback) {
            var self = this;
            console.log(this.body);
            console.log(typeof(openid), typeof(price), typeof(other), typeof(item_id), typeof(orderid));
            confirmOrder(orderid, +price, self.req.ip, function(err) {
                if (err) console.log(err);
                console.log('buyme happy payed', openid, +price, other, item_id, orderid);
                return 'success';
            });
        }));
});

module.exports = router;