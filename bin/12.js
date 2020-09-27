(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./client/pf/buymehappy.js":
/*!*********************************!*\
  !*** ./client/pf/buymehappy.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var tongji = window.tongji = __webpack_require__(/*! ../tongji.js */ "./client/tongji.js");
var fs = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js");
var request = __webpack_require__(/*! request */ "./node_modules/request/index.js");
var crypto = __webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js");
const CHANNEL_ID = '7780586f696310de2a8ddbec927fc078';

function md5(_str) {
    return crypto.createHash('md5').update(_str).digest('hex');
}


function strObj(o, tt) {
    var jsonstr = JSON.stringify(objKeySort(o));
    var str1 = jsonstr.replace(new RegExp(':', 'g'), '=');
    var str2 = str1.replace(new RegExp(',', 'g'), '&');
    var str3 = str2.substring(1, str2.length - 1);
    var str4 = str3.replace(new RegExp('"', 'g'), '');
    str4 = str4.replace(new RegExp('&33', 'g'), ':');
    if (!tt)
        str4 = str4 + APP_SECRET;
    return str4;
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


function addobjstr(o, s) {
    var str = '';
    str += s;
    for (var key in o) {
        str += '&' + key + '=' + o[key];
    }
    return str;
}





window.pay = function(orderid, money, desc, cb) {
    tongji.beginCharge(orderid, money, desc, startup_param.pf);
    var a = {}
    a.userToken = startup_param.userToken;
    a.channel_id = CHANNEL_ID;
    a.item_id = desc;
    a.orderid = orderid;
    a.price = money;
    a.other = '';
    getAjax('/g/pf/buymehappy/sign', a, function(err, r) {
        // return getAjax('/pf/buymehappy/sign', { other: '' }, function(err, r) {
        console.log(err, r.sign);
        var sign = r.sign;
        a.sign = sign;
        var payurl = 'http://buymehappy.com.cn/index.php?g=Home&m=GameOauth&a=pay_info';
        var purl = addobjstr(a, payurl);
        var nurl = 'http://h5.1357g.com/g/fish.app/CORS/?s=1&u=' + purl;
        // _socket.sendp({ 'c': 'ceshi', s: nurl });
        request.get(nurl, function(e, r) {
            if (e) console.log(e);
            var body = JSON.parse(r.body);
            var data = JSON.parse(body.data);
            parent.postMessage(data, 'http://buymehappy.com.cn');
        });
    });
    tongji.endCharge(orderid, 'buymehappy');
    cb && cb();
}

module.exports = function(cb) {
    if (startup_param.userToken == null) {
        return getAjax('/g/pf/buymehappy/sign', { other: '', channel_id: CHANNEL_ID }, function(err, r) {
            // return getAjax('/pf/buymehappy/sign', { other: '' }, function(err, r) {
            console.log(err, r.sign);
            var sign = r.sign;
            // var loginurl = 'http://buymehappy.com.cn/index.php?g=Wap&m=App&a=game_login&channel_id=' + CHANNEL_ID + '&other=' + '&sign=' + sign + '&v=' + Math.random();
            // var nurl = 'http://h5.1357g.com/g/fish.app/CORS/?s=1&u=' + loginurl;
            // request.get(nurl, function(e, r) {
            //     if (e) console.log(e);
            //     console.log(r);
            // });
            parent.location.href = 'http://buymehappy.com.cn/index.php?g=Wap&m=App&a=game_login&channel_id=' + CHANNEL_ID + '&other=' + '&sign=' + sign + '&v=' + Math.random();
        });
    }
    getAjax('/g/pf/buymehappy/sign', {
        userToken: startup_param.userToken,
        channel_id: CHANNEL_ID
    }, function(err, r) {
        var sign = r.sign;
        var getinfo = 'http://buymehappy.com.cn/index.php?g=Home&m=GameOauth&a=get_userinfo&userToken=' + startup_param.userToken + '&channel_id=' + CHANNEL_ID + '&sign=' + sign;
        var nurl = 'http://h5.1357g.com/g/fish.app/CORS/?s=1&u=' + getinfo;
        request.get(nurl, function(e, r) {
            if (e) console.log(e);
            var userinfo = JSON.parse(r.body).userinfo;
            startup_param.nickname = userinfo.wechaname;
            startup_param.face = userinfo.portrait;
            startup_param.sex = userinfo.sex;
            startup_param.city = userinfo.city;
            startup_param.id = userinfo.openid;
            cb();
        });
    });

}

/***/ }),

/***/ "./client/tongji.js":
/*!**************************!*\
  !*** ./client/tongji.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var t = __webpack_require__(/*! ./tongji_talkingdata.js */ "./client/tongji_talkingdata.js");
module.exports = t;

/***/ }),

/***/ "./client/tongji_talkingdata.js":
/*!**************************************!*\
  !*** ./client/tongji_talkingdata.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function noop(){}

var TDGA=window.TDGA;
if (!TDGA) {
	TDGA={
		Account:noop,
		onPageLeave:noop,
		onReward:noop,
		onChargeRequest:noop,
		onChargeSuccess:noop,
		onItemPurchase:noop,
		onMissionBegin:noop,
		onMissionCompleted:noop,
		onEvent:noop,
	};
	TDGA.Account.setLevel=noop;
}
class Stat {
	constructor() {
		this._delayOp=[];
		this._inited=true;
	}
	init(key) {
		this._inited=true;
		return;
		var self=this;
		loadScript('http://sdk.talkingdata.com/g/h5/v1/'+key, function(err) {
			self._inited=true;
			for (var i=0, l=self._delayOp.length; i<l; i++) {
				var op=self._delayOp[i];
				op.f.apply(self, op.p);
			}
		});
	}
	_delay(f) {
		if (!this._inited) {
			return this._delayOp.push({f:f});
		}
		f();
	}
	userin(me) {
		this._delay(function() {
			var qudao=0;
			if (!!window.cordova) {
				var o={"Android":1, "BlackBerry 10":2, "browser":3, "iOS":4,  "WinCE":5, "Tizen":6, "Mac OS X":7};
				qudao=o[device.platform]||8;
			}
			else if (startup_param.pf=='wechat') qudao=101;
			TDGA.Account({
				accountId : me.id,
				level : me.level,
				accountName:me.nickname,
				gameServer : '通用',
				accountType : qudao,
				gender : startup_param.sex
			});
		});
	}
	userout() {
		this._delay(TDGA.onPageLeave.bind(TDGA));
	}
	levelup(n) {
		this._delay(TDGA.Account.setLevel.bind(TDGA.Account,n));
	}
	reward(n, reason) {
		this._delay(TDGA.onReward.bind(TDGA, n, reason));
	}
	beginCharge(orderid, money, tickets, desc, payment) {
		if (typeof tickets=='string') {
			payment=desc;
			desc=tickets;
			tickets=Math.floor(money/3);
		}
		this._delay(function() {
			TDGA.onChargeRequest({
				orderId : orderid
				,iapId : desc
				,currencyAmount : money
				,currencyType : 'CNY'
				,virtualCurrencyAmount : tickets
				,paymentType:payment
			});
		});
	}
	endCharge(orderid, payment) {
		this._delay(function() {
			TDGA.onChargeSuccess({
				orderId : orderid,
				paymentType:payment
			});
		});
	}
	enterGame(tableid) {
		this._delay(function() {
			TDGA.onMissionBegin(tableid.toString());
		});
	}
	startGame(tableid, name, tickets) {
		this._delay(function() {
			TDGA.onItemPurchase({item:name, itemNumber:1, priceInVirtualCurrency:tickets});
			TDGA.onEvent(name, {});
		});
	}
	endGame(tableid) {
		this._delay(function() {
			TDGA.onMissionCompleted(tableid.toString());
		});		
	}
	share() {
		this._delay(function() {
			TDGA.onEvent('share', {user:{id:me.id, nickname:me.nickname}});
		});
	}
	invite(tableid,tabledesc) {
		this._delay(function() {
			TDGA.onEvent('invite', {user:{id:me.id, nickname:me.nickname}, table:{id:tableid, msg:tabledesc}});
		});
	}
	event(name, data) {
		this._delay(function() {
			TDGA.onEvent(name, (typeof data=='object'?data:{data:data}));
		});
	}
	changeToVirtualCurrency(n, m, n_name, m_name) {
		n_name = n_name || '金币';
		m_name = m_name || '钻石';
		this._delay(function() {
			var detail = {};
			detail[n_name] = n;
			detail[m_name] = m;
			TDGA.onEvent('buyCoin', detail);
		});
	}
	/**
	 * 消耗虚拟币，如果有3个参数，那么是消耗n*price的币，
	 * @param {string} name 
	 * @param {number} n 
	 * @param {number|null} price 
	 */
	consume(name, n, price) {
		this._delay(function() {
			TDGA.onEvent('consume', { item: name, itemNumber: n, priceInVirtualCurrency: price });
		});
	}

}

var tongji=new Stat();
window.onunload=tongji.userout.bind(tongji);

module.exports=tongji;

/***/ }),

/***/ 2:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);