(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{303:function(n,e,t){"use strict";
/*!
 * @license MIT
 * Client side js to use wechat-jssdk, also works with other server side service.
 * https://github.com/JasonBoy/wechat-jssdk
 */var i=function(){function n(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();var o=window.document,r=window.location.protocol+"//res.wx.qq.com/open/js/jweixin-1.0.0.js",a=["onMenuShareTimeline","onMenuShareAppMessage"],c=function(){function n(e){if(function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this instanceof n){this.config=e||{},this.config.customUrl&&(r=this.config.customUrl,delete this.config.customUrl);var t=this.config.jsApiList;if(!t||t.length<=0)this.config.jsApiList=a;else for(var i=0,o=a.length;i<o;i++){var c=a[i];t.indexOf(c)<0&&t.push(c)}return this.debug=!!this.config.debug,this.loadScript(),this}return new n(e)}return i(n,[{key:"signSignature",value:function(n){var e=this,t=this.config,i=n||t,o={debug:this.debug,appId:t.appId,timestamp:i.timestamp||t.timestamp,nonceStr:i.nonceStr||t.nonceStr,signature:i.signature||t.signature,jsApiList:t.jsApiList.slice(0,t.jsApiList.length)},r=this.debug;if(!window.wx)return console.warn("wechat js not defined"),this;var a=window.wx;return a.config(o),a.ready(function(){console.log("sign signature finished..."),r&&alert("sign signature finished..."),i.success&&i.success.call(e)}),a.error(function(n){r&&alert("sign error: "+JSON.stringify(n)),i.error&&i.error.call(e,n)}),this.wx||(this.wx=a),this}},{key:"loadScript",value:function(){var n=this,e=o.createElement("script");e.type="text/javascript",e.async=!0,e.onload=function(){console.log("Wechat script loaded successfully!"),n.signSignature()},e.onerror=function(e){console.error("Failed to load wechat script!"),console.error(e),n.debug&&alert("Cannot load wechat script!")};var t=o.getElementsByTagName("script")[0];return t.parentNode.insertBefore(e,t),e.src=r,this}},{key:"shareOnMoment",value:function(n){return n?this.callWechatApi("onMenuShareTimeline",n):this}},{key:"shareOnChat",value:function(n){return n?this.callWechatApi("onMenuShareAppMessage",n):this}},{key:"callWechatApi",value:function(n,e){if(!n)return this;var t=this.debug;if(this.config.jsApiList.indexOf(n)<0)return t&&alert("the wechat api ["+n+"] you call was not registered, \npls add the api into your [jsApiList] config"),this;var i=this.wx[n];return i&&"function"==typeof i?(i(e),this):(t&&alert("no such api ["+n+"] found!"),this)}}]),n}();n.exports=c},81:function(n,e,t){"use strict";var i=window.tongji=t(92);function o(){}function r(n){var e="";return n[10]&&(e+="五小牛 "),n[7]&&(e+="四炸牛 "),n[5]&&(e+="五花牛 "),n[4]&&(e+="四花牛 "),e=0==e.length?"不带牛牛以上的牌型":"带"+e}window.preInvite=function(n,e){if(window.wechatObj){var t={type:"link",title:"牛牛大作战，房号:"+n+"("+e.pan+"局)",link:"http://h5.1357g.com/g/niuniu.app?room="+n,imgUrl:location.origin+location.pathname+"res/logo.png",desc:"轮庄，"+r(e.rule)+", "+e.dizhu+"底！"};window.wechatObj.shareOnChat(t),window.wechatObj.shareOnMoment(t),window.invite=function(){var t="点击"+(0==Laya.stage.canvasDegree?"右":"左")+"上角分享按钮，邀请好友加入游戏";tipon(t).popup(),i.invite(n,"轮庄，"+r(e.rule)+", "+e.dizhu+"底！")}}},window.invite=function(){var n="点击"+(0==Laya.stage.canvasDegree?"右":"左")+"上角分享按钮，邀请好友加入游戏";tipon(n).popup()},window.share=function(){var n="点击"+(0==Laya.stage.canvasDegree?"右":"左")+"上角分享按钮，分享到朋友圈";tipon(n).popup(),i.share()},window.preShareResult=function(n,e,t,i,o){var r={type:"link",title:"牛牛大作战，房号:"+n+(null!=e?", 第"+e+"局":""),link:"http://h5.1357g.com/g/niuniu.app"+o,imgUrl:"http://h5.1357g.com/g/niuniu.app"+o,desc:(t||[]).join(",")+" 胜利者 "+(i||[]).join(",")};window.wechatObj.shareOnChat(r),window.wechatObj.shareOnMoment(r)},window.pay=function(n,e,t,r){!r&&(r=o),i.beginCharge(n,e,t,"微信公众号支付"),getAjax("weixin/getWechatpayParams",{order:n,money:e,openid:startup_param.openid},function(e,t){if(e||t.err)return tipon(e||t.err).popup();t.success=function(e){"chooseWXPay:ok"==e.errMsg?(i.endCharge(n,"微信公众号支付"),r(null,!0)):r(null,!1)},wx.chooseWXPay(t)})};var a=t(30),c=a.queue(function(n,e){if("function"==typeof n)return n(e);e()}),s={starting:!1,stopping:!1};function u(n){a.timeout(function(n){wx.stopRecord({success:function(e){n(null,e)},fail:function(e){n(e)}})},800)(n)}window.startRecord=function(n){if(s.starting)return n(s.starting);s.starting=!0,c.push([function(e){wx.startRecord({fail:function(e){n(e),n=null},sucess:function(){}}),e()},function(n){setTimeout(n,500)},function(e){s.starting=!1,n&&n(s.starting),e()}])},window.stopRecord=function(n){if(s.stopping)return n("already stopping");s.stopping=!0,c.push(u,function(e,t){if(s.stopping=!1,n)return e?n(e):void window.sendRecord(t.localId,n)})},window.sendRecord=function(n,e){wx.uploadVoice({localId:n,isShowProgressTips:0,success:function(n){var t=n.serverId;e(null,t)}})};var l={};window.playRecord=function(n,e){wx.downloadVoice({serverId:n,isShowProgressTips:0,success:function(n){var t=n.localId;wx.playVoice({localId:t}),l[t]={cb:e,t:new Date}}})},accWechatIntf("weixin/sign",{},function(n,e){if(n)return console.log(n);var i=t(303);e.jsApiList=["onMenuShareTimeline","onMenuShareAppMessage","startRecord","stopRecord","onVoiceRecordEnd","playVoice","pauseVoice","stopVoice","onVoicePlayEnd","uploadVoice","downloadVoice"],e.success=function(){window.wxInit&&window.wxInit()};window.wechatObj=new i(e)}),window.wxInit=function(){var n,e={type:"link",title:"牛牛大作战，大家来斗牛",link:location.origin+location.pathname,imgUrl:location.origin+location.pathname+"res/logo.png",desc:""};try{window.wechatObj.shareOnChat(e),window.wechatObj.shareOnMoment(e)}catch(n){console.log(n)}wx.startRecord(),n=setInterval(function(){wx.stopRecord({success:function(e){clearInterval(n)}})},300),wx.onVoicePlayEnd({success:function(n){var e=l[n.localId];console.log(n),"function"==typeof e.cb&&(e.cb(),delete l[n.localId])}}),setInterval(function(){var n=new Date;for(var e in l){var t=l[e];n-t.t>=3e3&&(t.cb&&t.cb(),delete l[e])}},3e3)}},91:function(n,e,t){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},o=function(){function n(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();function r(){}var a=window.TDGA;a||((a={Account:r,onPageLeave:r,onReward:r,onChargeRequest:r,onChargeSuccess:r,onItemPurchase:r,onMissionBegin:r,onMissionCompleted:r,onEvent:r}).Account.setLevel=r);var c=new(function(){function n(){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this._delayOp=[],this._inited=!0}return o(n,[{key:"init",value:function(n){this._inited=!0}},{key:"_delay",value:function(n){if(!this._inited)return this._delayOp.push({f:n});n()}},{key:"userin",value:function(n){this._delay(function(){var e=0;if(window.cordova){e={Android:1,"BlackBerry 10":2,browser:3,iOS:4,WinCE:5,Tizen:6,"Mac OS X":7}[device.platform]||8}else"wechat"==startup_param.pf&&(e=101);a.Account({accountId:n.id,level:n.level,accountName:n.nickname,gameServer:"通用",accountType:e,gender:startup_param.sex})})}},{key:"userout",value:function(){this._delay(a.onPageLeave.bind(a))}},{key:"levelup",value:function(n){this._delay(a.Account.setLevel.bind(a.Account,n))}},{key:"reward",value:function(n,e){this._delay(a.onReward.bind(a,n,e))}},{key:"beginCharge",value:function(n,e,t,i,o){"string"==typeof t&&(o=i,i=t,t=Math.floor(e/3)),this._delay(function(){a.onChargeRequest({orderId:n,iapId:i,currencyAmount:e,currencyType:"CNY",virtualCurrencyAmount:t,paymentType:o})})}},{key:"endCharge",value:function(n,e){this._delay(function(){a.onChargeSuccess({orderId:n,paymentType:e})})}},{key:"enterGame",value:function(n){this._delay(function(){a.onMissionBegin(n.toString())})}},{key:"startGame",value:function(n,e,t){this._delay(function(){a.onItemPurchase({item:e,itemNumber:1,priceInVirtualCurrency:t}),a.onEvent(e,{})})}},{key:"endGame",value:function(n){this._delay(function(){a.onMissionCompleted(n.toString())})}},{key:"share",value:function(){this._delay(function(){a.onEvent("share",{user:{id:me.id,nickname:me.nickname}})})}},{key:"invite",value:function(n,e){this._delay(function(){a.onEvent("invite",{user:{id:me.id,nickname:me.nickname},table:{id:n,msg:e}})})}},{key:"event",value:function(n,e){this._delay(function(){a.onEvent(n,"object"==(void 0===e?"undefined":i(e))?e:{data:e})})}},{key:"changeToVirtualCurrency",value:function(n,e,t,i){t=t||"金币",i=i||"钻石",this._delay(function(){var o={};o[t]=n,o[i]=e,a.onEvent("buyCoin",o)})}},{key:"consume",value:function(n,e,t){this._delay(function(){a.onEvent("consume",{item:n,itemNumber:e,priceInVirtualCurrency:t})})}}]),n}());window.onunload=c.userout.bind(c),n.exports=c},92:function(n,e,t){"use strict";var i=t(91);n.exports=i}}]);