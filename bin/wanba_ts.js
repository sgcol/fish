(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{66:function(e,n,t){"use strict";(function(e){var n=t(12),i=t(28),o=t(92),a="1106378639",r="https://api.urlshare.cn";function u(e,n,t){getAjax("/pf/wanba/sign",n,function(n,o){if(n)return t(n);getAjax(i.join(r,e),o,t)})}var c="undefined";window.pay=function(e,n,t,i){o.beginCharge(e,n,t,startup_param.pf+"_"+c),u("/v3/user/get_playzone_userinfo",{pf:startup_param.pf,zoneid:window.OPEN_DATA.platform,openid:startup_param.openid,openkey:startup_param.openkey},function(t,r){if(t||0!=r.code)return i(t||r.msg);!function(e,n,t){if(e>=10*n)return t();window.popPayTips({defaultScore:10*n,appid:a}),window.__paySuccess=function(){t()},window.__payError=function(){alert("支付失败，请重试")}}(r.data[0].score,n,function(){!function(e,n,t,i){u("/v3/user/buy_playzone_item",{openid:startup_param.openid,openkey:startup_param.openkey,pf:startup_param.pf,zoneid:OPEN_DATA.platform,billno:e,appid:a,itemid:itemMap[n]},function(n,t){if(n||0!=t.code)return i(n||t.msg);o.endCharge(e,startup_param.pf+"_"+c),i()})}(e,n,0,i)})})},e.export=function(e){window.getOpenKey&&window.getOpenKey(function(t){getAjax("/pf/wanba/getUser",t,function(t,i){if(t||i.err)return alert(t||i.err),void(location.href="about:blank");startup_param=n(startup_param,i),2==OPEN_DATA.platform&&(startup_param.server+="/ios"),c=["undefined","non-ios","ios"][window.OPEN_DATA.platform],e()})})}}).call(this,t(9)(e))},91:function(e,n,t){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}();function a(){}var r=window.TDGA;r||((r={Account:a,onPageLeave:a,onReward:a,onChargeRequest:a,onChargeSuccess:a,onItemPurchase:a,onMissionBegin:a,onMissionCompleted:a,onEvent:a}).Account.setLevel=a);var u=new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this._delayOp=[],this._inited=!0}return o(e,[{key:"init",value:function(e){this._inited=!0}},{key:"_delay",value:function(e){if(!this._inited)return this._delayOp.push({f:e});e()}},{key:"userin",value:function(e){this._delay(function(){var n=0;if(window.cordova){n={Android:1,"BlackBerry 10":2,browser:3,iOS:4,WinCE:5,Tizen:6,"Mac OS X":7}[device.platform]||8}else"wechat"==startup_param.pf&&(n=101);r.Account({accountId:e.id,level:e.level,accountName:e.nickname,gameServer:"通用",accountType:n,gender:startup_param.sex})})}},{key:"userout",value:function(){this._delay(r.onPageLeave.bind(r))}},{key:"levelup",value:function(e){this._delay(r.Account.setLevel.bind(r.Account,e))}},{key:"reward",value:function(e,n){this._delay(r.onReward.bind(r,e,n))}},{key:"beginCharge",value:function(e,n,t,i,o){"string"==typeof t&&(o=i,i=t,t=Math.floor(n/3)),this._delay(function(){r.onChargeRequest({orderId:e,iapId:i,currencyAmount:n,currencyType:"CNY",virtualCurrencyAmount:t,paymentType:o})})}},{key:"endCharge",value:function(e,n){this._delay(function(){r.onChargeSuccess({orderId:e,paymentType:n})})}},{key:"enterGame",value:function(e){this._delay(function(){r.onMissionBegin(e.toString())})}},{key:"startGame",value:function(e,n,t){this._delay(function(){r.onItemPurchase({item:n,itemNumber:1,priceInVirtualCurrency:t}),r.onEvent(n,{})})}},{key:"endGame",value:function(e){this._delay(function(){r.onMissionCompleted(e.toString())})}},{key:"share",value:function(){this._delay(function(){r.onEvent("share",{user:{id:me.id,nickname:me.nickname}})})}},{key:"invite",value:function(e,n){this._delay(function(){r.onEvent("invite",{user:{id:me.id,nickname:me.nickname},table:{id:e,msg:n}})})}},{key:"event",value:function(e,n){this._delay(function(){r.onEvent(e,"object"==(void 0===n?"undefined":i(n))?n:{data:n})})}},{key:"changeToVirtualCurrency",value:function(e,n,t,i){t=t||"金币",i=i||"钻石",this._delay(function(){var o={};o[t]=e,o[i]=n,r.onEvent("buyCoin",o)})}},{key:"consume",value:function(e,n,t){this._delay(function(){r.onEvent("consume",{item:e,itemNumber:n,priceInVirtualCurrency:t})})}}]),e}());window.onunload=u.userout.bind(u),e.exports=u},92:function(e,n,t){"use strict";var i=t(91);e.exports=i}}]);