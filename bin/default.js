(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{84:function(e,n,t){"use strict";var o=window.tongji=t(92);function i(){}window.pay=function(e,n,t,u){if(!u&&(u=i),tipon)return o.beginCharge(e,n,t,"测试通道"),getAjax("pf/default/pay",{orderid:e,money:n},function(i,a){var r;if(a.err)return(r=new wins.ClickWin("购买失败弹框")).modal=!0,r.show(),tipon(a.message).popup(u);tipon("测试版，直接完成充值").popup(u),o.endCharge(e,"测试通道");for(var c=+n,s=[68,128,198,328,648,1e3],l=0;l<6;l++)c==s[l]&&(c*=1e4);0==t.indexOf("o")&&(c=1e4*+t.substring(1,t.length-4)),(r=new wins.OtherWin("购买成功弹框",c)).modal=!0,r.show()});u()},window.share=function(){console.log("share")},window.preShareResult=function(e,n,t,o,i){console.log("shareContent",arguments)}},91:function(e,n,t){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}();function u(){}var a=window.TDGA;a||((a={Account:u,onPageLeave:u,onReward:u,onChargeRequest:u,onChargeSuccess:u,onItemPurchase:u,onMissionBegin:u,onMissionCompleted:u,onEvent:u}).Account.setLevel=u);var r=new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this._delayOp=[],this._inited=!0}return i(e,[{key:"init",value:function(e){this._inited=!0}},{key:"_delay",value:function(e){if(!this._inited)return this._delayOp.push({f:e});e()}},{key:"userin",value:function(e){this._delay(function(){var n=0;if(window.cordova){n={Android:1,"BlackBerry 10":2,browser:3,iOS:4,WinCE:5,Tizen:6,"Mac OS X":7}[device.platform]||8}else"wechat"==startup_param.pf&&(n=101);a.Account({accountId:e.id,level:e.level,accountName:e.nickname,gameServer:"通用",accountType:n,gender:startup_param.sex})})}},{key:"userout",value:function(){this._delay(a.onPageLeave.bind(a))}},{key:"levelup",value:function(e){this._delay(a.Account.setLevel.bind(a.Account,e))}},{key:"reward",value:function(e,n){this._delay(a.onReward.bind(a,e,n))}},{key:"beginCharge",value:function(e,n,t,o,i){"string"==typeof t&&(i=o,o=t,t=Math.floor(n/3)),this._delay(function(){a.onChargeRequest({orderId:e,iapId:o,currencyAmount:n,currencyType:"CNY",virtualCurrencyAmount:t,paymentType:i})})}},{key:"endCharge",value:function(e,n){this._delay(function(){a.onChargeSuccess({orderId:e,paymentType:n})})}},{key:"enterGame",value:function(e){this._delay(function(){a.onMissionBegin(e.toString())})}},{key:"startGame",value:function(e,n,t){this._delay(function(){a.onItemPurchase({item:n,itemNumber:1,priceInVirtualCurrency:t}),a.onEvent(n,{})})}},{key:"endGame",value:function(e){this._delay(function(){a.onMissionCompleted(e.toString())})}},{key:"share",value:function(){this._delay(function(){a.onEvent("share",{user:{id:me.id,nickname:me.nickname}})})}},{key:"invite",value:function(e,n){this._delay(function(){a.onEvent("invite",{user:{id:me.id,nickname:me.nickname},table:{id:e,msg:n}})})}},{key:"event",value:function(e,n){this._delay(function(){a.onEvent(e,"object"==(void 0===n?"undefined":o(n))?n:{data:n})})}},{key:"changeToVirtualCurrency",value:function(e,n,t,o){t=t||"金币",o=o||"钻石",this._delay(function(){var i={};i[t]=e,i[o]=n,a.onEvent("buyCoin",i)})}},{key:"consume",value:function(e,n,t){this._delay(function(){a.onEvent("consume",{item:e,itemNumber:n,priceInVirtualCurrency:t})})}}]),e}());window.onunload=r.userout.bind(r),e.exports=r},92:function(e,n,t){"use strict";var o=t(91);e.exports=o}}]);