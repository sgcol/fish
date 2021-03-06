webpackJsonp([2],{

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var t = __webpack_require__(29);
	module.exports = t;

/***/ },

/***/ 29:
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	window.zhuge = window.zhuge || [];
	window.zhuge.methods = "_init debug identify track trackLink trackForm page".split(" ");
	window.zhuge.factory = function (b) {
	    return function () {
	        var a = Array.prototype.slice.call(arguments);
	        a.unshift(b);
	        window.zhuge.push(a);
	        return window.zhuge;
	    };
	};
	for (var i = 0; i < window.zhuge.methods.length; i++) {
	    var key = window.zhuge.methods[i];
	    window.zhuge[key] = window.zhuge.factory(key);
	}
	window.zhuge.load = function (b, x) {
	    if (!document.getElementById("zhuge-js")) {
	        var a = document.createElement("script");
	        var verDate = new Date();
	        var verStr = verDate.getFullYear().toString() + verDate.getMonth().toString() + verDate.getDate().toString();
	        a.type = "text/javascript";
	        a.id = "zhuge-js";
	        a.async = !0;
	        a.src = (location.protocol == 'http:' ? "http://sdk.zhugeio.com/zhuge.min.js?v=" : 'https://zgsdk.zhugeio.com/zhuge.min.js?v=') + verStr;
	        a.onerror = function () {
	            window.zhuge.identify = window.zhuge.track = function (ename, props, callback) {
	                if (callback && Object.prototype.toString.call(callback) === '[object Function]') callback();
	            };
	        };
	        var c = document.getElementsByTagName("script")[0];
	        c.parentNode.insertBefore(a, c);
	        window.zhuge._init(b, x);
	    }
	};
	window.zhuge.load('a6294c4a959947719afd7248e98fe072'); //配置应用的AppKey

	function noop() {}

	var Stat = function () {
	    function Stat() {
	        _classCallCheck(this, Stat);

	        this._delayOp = [];
	        this._inited = true;
	    }

	    _createClass(Stat, [{
	        key: "init",
	        value: function init(key) {
	            this._inited = true;
	            return;
	        }
	    }, {
	        key: "_delay",
	        value: function _delay(f) {
	            if (!this._inited) {
	                return this._delayOp.push({ f: f });
	            }
	            f();
	        }
	    }, {
	        key: "userin",
	        value: function userin(me) {
	            this._delay(function () {
	                var qudao = 0;
	                if (!!window.cordova) {
	                    var o = { "Android": 1, "BlackBerry 10": 2, "browser": 3, "iOS": 4, "WinCE": 5, "Tizen": 6, "Mac OS X": 7 };
	                    qudao = device.platform;
	                } else if (startup_param.pf == 'wechat') qudao = 'wechat';
	                zhuge.identify(me.id, {
	                    name: me.nickname,
	                    //预定义属性
	                    gender: startup_param.sex,
	                    //预定义属性
	                    level: me.level,
	                    gameServer: '通用',
	                    accountType: qudao
	                });
	            });
	        }
	    }, {
	        key: "userout",
	        value: function userout() {
	            this._delay(function () {
	                zhuge.track('userout');
	            });
	        }
	    }, {
	        key: "levelup",
	        value: function levelup(n) {
	            this._delay(function () {
	                zhuge.track('levelup', { level: n });
	            });
	        }
	    }, {
	        key: "reward",
	        value: function reward(n, reason) {
	            this._delay(function () {
	                zhuge.track('reward', { count: n, reason: reason });
	            });
	        }
	    }, {
	        key: "beginCharge",
	        value: function beginCharge(orderid, money, tickets, desc, payment) {
	            if (typeof tickets == 'string') {
	                payment = desc;
	                desc = tickets;
	                tickets = Math.floor(money / 3);
	            }
	            this._delay(function () {
	                zhuge.track('beginCharge', {
	                    orderId: orderid,
	                    iapId: desc,
	                    currencyAmount: money,
	                    currencyType: 'CNY',
	                    virtualCurrencyAmount: tickets,
	                    paymentType: payment
	                });
	            });
	        }
	    }, {
	        key: "endCharge",
	        value: function endCharge(orderid, payment) {
	            this._delay(function () {
	                zhuge.track('endCharge', {
	                    orderId: orderid,
	                    paymentType: payment
	                });
	            });
	        }
	    }, {
	        key: "enterGame",
	        value: function enterGame(tableid) {
	            this._delay(function () {
	                zhuge.track('enterGame', { table: tableid });
	            });
	        }
	    }, {
	        key: "startGame",
	        value: function startGame(tableid, name, tickets) {
	            this._delay(function () {
	                zhuge.track('startgame', { table: tableid, name: name });
	                if (tickets) zhuge.track('consume', { item: name, itemNumber: 1, priceInVirtualCurrency: tickets });
	            });
	        }
	    }, {
	        key: "endGame",
	        value: function endGame(tableid) {
	            this._delay(function () {
	                zhuge.track('endGame', { table: tableid });
	            });
	        }
	    }, {
	        key: "share",
	        value: function share() {
	            this._delay(function () {
	                zhuge.track('share', { user: { id: me.id, nickname: me.nickname } });
	            });
	        }
	    }, {
	        key: "invite",
	        value: function invite(tableid, tabledesc) {
	            this._delay(function () {
	                zhuge.track('invite', { user: { id: me.id, nickname: me.nickname }, table: { id: tableid, msg: tabledesc } });
	            });
	        }
	    }, {
	        key: "event",
	        value: function event(name, data) {
	            this._delay(function () {
	                zhuge.track(name, (typeof data === "undefined" ? "undefined" : _typeof(data)) == 'object' ? data : { data: data });
	            });
	        }

	        /**
	         * 
	         * @param {number} n , 换多少币
	         * @param {number} m ，上级币的数量
	         * @param {string|null} n_name, 本级货币名称，默认金币
	         * @param {string|null} m_name, 上级货币名称，默认钻石
	         */

	    }, {
	        key: "changeToVirtualCurrency",
	        value: function changeToVirtualCurrency(n, m, n_name, m_name) {
	            n_name = n_name || '金币';
	            m_name = m_name || '钻石';
	            this._delay(function () {
	                var detail = {};
	                detail[n_name] = n;
	                detail[m_name] = m;
	                zhuge.track('buyCoin', detail);
	            });
	        }
	        /**
	         * 消耗虚拟币，如果有3个参数，那么是消耗n*price的币，
	         * @param {string} name 
	         * @param {number} n 
	         * @param {number|null} price 
	         */

	    }, {
	        key: "consume",
	        value: function consume(name, n, price) {
	            this._delay(function () {
	                zhuge.track('consume', { item: name, itemNumber: n, priceInVirtualCurrency: price });
	            });
	        }
	    }]);

	    return Stat;
	}();

	var tongji = new Stat();
	window.onunload = tongji.userout.bind(tongji);

	module.exports = tongji;

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var tongji = window.tongji = __webpack_require__(28);
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

	window.pay = function (orderid, money, desc, cb) {
	    !cb && (cb = _noop);
	    if (tipon) {
	        tongji.beginCharge(orderid, money, desc, '测试通道');
	        return getAjax('pf/default/pay', { orderid: orderid, money: money }, function (err, r) {

	            if (r.err) {
	                var tip = new wins.ClickWin('购买失败弹框');
	                tip.modal = true;
	                tip.show();;
	                return tipon(r.message).popup(cb);
	            };
	            tipon('测试版，直接完成充值').popup(cb);
	            tongji.endCharge(orderid, '测试通道');
	            var many = +money;
	            var tehui = [68, 128, 198, 328, 648, 1000];
	            for (var x = 0; x < 6; x++) {
	                if (many == tehui[x]) {
	                    many = many * 10000;
	                }
	            }
	            if (desc.indexOf('o') == 0) many = 10000 * +desc.substring(1, desc.length - 4);
	            var tip = new wins.OtherWin('购买成功弹框', many);
	            tip.modal = true;
	            tip.show();
	        });
	    }
	    cb();
	};
	window.share = function () {
	    console.log('share');
	};
	window.preShareResult = function (roomid, setnum, participants, winners, img) {
	    console.log('shareContent', arguments);
	};

/***/ }

});