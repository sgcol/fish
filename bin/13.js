(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./client/pf/banshu.js":
/*!*****************************!*\
  !*** ./client/pf/banshu.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var tongji = window.tongji = __webpack_require__(/*! ../tongji.js */ "./client/tongji.js");
// var wins = require('../windows.js');

function _noop() {}
// function getAjax(url, data, callback) {
// 	if (typeof data ==='function') {
// 		callback =data;
// 		data=null;
// 	}
// 	if (!callback) callback=function(){};
// 	$.ajax({
// 		type: "POST",
// 		url: url,
// 		dataType: "JSON",
// 		data: data,
// 		timeout:30000,
// 		success: function (chunk) {
// 			return callback(null, chunk);
// 		},
// 		error: function (e) {
// 			//if (typeof console == "object") console.log(e);
// 			callback(e);
// 		}
// 	})
// }

window.pay = function(orderid, money, desc, cb) {
    !cb && (cb = _noop);

    tipon('此功能未开放').popup(cb);

    cb();
}
window.share = function() {
    console.log('share');
}
window.preShareResult = function(roomid, setnum, participants, winners, img) {
    console.log('shareContent', arguments);
}

const baseOfName = ['浮云', '小雨', '大鱼', '海棠', '祁', '玲珑', '龙女', '小十一', '小二', '啊啊冷', '潇洒', '很长常常从踩', '红红火火', '哈哈哈', '小龙', '大龙', '小黄鱼', '蝙蝠', '鲨鱼', '无名', '名人', '小明', '大名', '原味', '饮料', '纯真', '出料', '可乐', '可口', '渔夫', '渔网', '海星', '海绵宝宝', '派大星', '海胆', '海参', '海鱼', '海水', '海草', '小草', '水草', '水母', '海王', '鱼叉', '海龟', '海豹', '结果', '大手', '水手', '大船', '小船', '河流', '深海', '沙滩', '潜水', '浅水', '海狗', '海象', '海鸥', '信天翁', '海鸟', '云朵', '飓风', '狂风', '暴雨', '鲍鱼'];
function randomUser() {
    var rndstr=__webpack_require__(/*! randomstring */ "./node_modules/randomstring/index.js").generate;

    startup_param.id=rndstr(12);
    startup_param.nickname=baseOfName[Math.floor(Math.random()*baseOfName.length)];
    startup_param.pwd=rndstr(8);
}
if (startup_param.id==null) randomUser();

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

/***/ "./node_modules/randomstring/index.js":
/*!********************************************!*\
  !*** ./node_modules/randomstring/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/randomstring */ "./node_modules/randomstring/lib/randomstring.js");

/***/ }),

/***/ "./node_modules/randomstring/lib/charset.js":
/*!**************************************************!*\
  !*** ./node_modules/randomstring/lib/charset.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayUniq = __webpack_require__(/*! array-uniq */ "./node_modules/randomstring/node_modules/array-uniq/index.js");

function Charset() {
  this.chars = '';
}

Charset.prototype.setType = function(type) {
  var chars;
  
  var numbers    = '0123456789';
  var charsLower = 'abcdefghijklmnopqrstuvwxyz';
  var charsUpper = charsLower.toUpperCase();
  var hexChars   = 'abcdef';
  
  if (type === 'alphanumeric') {
    chars = numbers + charsLower + charsUpper;
  }
  else if (type === 'numeric') {
    chars = numbers;
  }
  else if (type === 'alphabetic') {
    chars = charsLower + charsUpper;
  }
  else if (type === 'hex') {
    chars = numbers + hexChars;
  }
  else {
    chars = type;
  }
  
  this.chars = chars;
}

Charset.prototype.removeUnreadable = function() {
  var unreadableChars = /[0OIl]/g;
  this.chars = this.chars.replace(unreadableChars, '');
}

Charset.prototype.setcapitalization = function(capitalization) {
  if (capitalization === 'uppercase') {
    this.chars = this.chars.toUpperCase();
  }
  else if (capitalization === 'lowercase') {
    this.chars = this.chars.toLowerCase();
  }
}

Charset.prototype.removeDuplicates = function() {
  var charMap = this.chars.split('');
  charMap = arrayUniq(charMap);
  this.chars = charMap.join('');
}

module.exports = exports = Charset;

/***/ }),

/***/ "./node_modules/randomstring/lib/randomstring.js":
/*!*******************************************************!*\
  !*** ./node_modules/randomstring/lib/randomstring.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto  = __webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js");
var Charset = __webpack_require__(/*! ./charset.js */ "./node_modules/randomstring/lib/charset.js");

function safeRandomBytes(length) {
  while (true) {
    try {
      return crypto.randomBytes(length);
    } catch(e) {
      continue;
    }
  }
}

exports.generate = function(options) {
  
  var charset = new Charset();
  
  var length, chars, capitalization, string = '';
  
  // Handle options
  if (typeof options === 'object') {
    length = options.length || 32;
    
    if (options.charset) {
      charset.setType(options.charset);
    }
    else {
      charset.setType('alphanumeric');
    }
    
    if (options.capitalization) {
      charset.setcapitalization(options.capitalization);
    }
    
    if (options.readable) {
      charset.removeUnreadable();
    }
    
    charset.removeDuplicates();
  }
  else if (typeof options === 'number') {
    length = options;
    charset.setType('alphanumeric');
  }
  else {
    length = 32;
    charset.setType('alphanumeric');
  }
  
  // Generate the string
  var charsLen = charset.chars.length;
  var maxByte = 256 - (256 % charsLen);
  while (length > 0) {
    var buf = safeRandomBytes(Math.ceil(length * 256 / maxByte));
    for (var i = 0; i < buf.length && length > 0; i++) {
      var randomByte = buf.readUInt8(i);
      if (randomByte < maxByte) {
        string += charset.chars.charAt(randomByte % charsLen);
        length--;
      }
    }
  }

  return string;
};


/***/ }),

/***/ "./node_modules/randomstring/node_modules/array-uniq/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/randomstring/node_modules/array-uniq/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// there's 3 implementations written in increasing order of efficiency

// 1 - no Set type is defined
function uniqNoSet(arr) {
	var ret = [];

	for (var i = 0; i < arr.length; i++) {
		if (ret.indexOf(arr[i]) === -1) {
			ret.push(arr[i]);
		}
	}

	return ret;
}

// 2 - a simple Set type is defined
function uniqSet(arr) {
	var seen = new Set();
	return arr.filter(function (el) {
		if (!seen.has(el)) {
			seen.add(el);
			return true;
		}
	});
}

// 3 - a standard Set type is defined and it has a forEach method
function uniqSetWithForEach(arr) {
	var ret = [];

	(new Set(arr)).forEach(function (el) {
		ret.push(el);
	});

	return ret;
}

// V8 currently has a broken implementation
// https://github.com/joyent/node/issues/8449
function doesForEachActuallyWork() {
	var ret = false;

	(new Set([true])).forEach(function (el) {
		ret = el;
	});

	return ret === true;
}

if ('Set' in global) {
	if (typeof Set.prototype.forEach === 'function' && doesForEachActuallyWork()) {
		module.exports = uniqSetWithForEach;
	} else {
		module.exports = uniqSet;
	}
} else {
	module.exports = uniqNoSet;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

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

/***/ })

}]);