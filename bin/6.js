(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{119:function(n,e,t){"use strict";var i=window.tongji=t(20);function o(){}function r(n){var e="";return n[10]&&(e+="五小牛 "),n[7]&&(e+="四炸牛 "),n[5]&&(e+="五花牛 "),n[4]&&(e+="四花牛 "),e=0==e.length?"不带牛牛以上的牌型":"带"+e}window.preInvite=function(n,e){if(window.wechatObj){var t={type:"link",title:"牛牛大作战，房号:"+n+"("+e.pan+"局)",link:"http://h5.1357g.com/g/niuniu.app?room="+n,imgUrl:location.origin+location.pathname+"res/logo.png",desc:"轮庄，"+r(e.rule)+", "+e.dizhu+"底！"};window.wechatObj.shareOnChat(t),window.wechatObj.shareOnMoment(t),window.invite=function(){var t="点击"+(0==Laya.stage.canvasDegree?"右":"左")+"上角分享按钮，邀请好友加入游戏";tipon(t).popup(),i.invite(n,"轮庄，"+r(e.rule)+", "+e.dizhu+"底！")}}},window.invite=function(){var n="点击"+(0==Laya.stage.canvasDegree?"右":"左")+"上角分享按钮，邀请好友加入游戏";tipon(n).popup()},window.share=function(){var n="点击"+(0==Laya.stage.canvasDegree?"右":"左")+"上角分享按钮，分享到朋友圈";tipon(n).popup(),i.share()},window.preShareResult=function(n,e,t,i,o){var r={type:"link",title:"牛牛大作战，房号:"+n+(null!=e?", 第"+e+"局":""),link:"http://h5.1357g.com/g/niuniu.app"+o,imgUrl:"http://h5.1357g.com/g/niuniu.app"+o,desc:(t||[]).join(",")+" 胜利者 "+(i||[]).join(",")};window.wechatObj.shareOnChat(r),window.wechatObj.shareOnMoment(r)},window.pay=function(n,e,t,r){!r&&(r=o),i.beginCharge(n,e,t,"微信公众号支付"),getAjax("weixin/getWechatpayParams",{order:n,money:e,openid:startup_param.openid},function(e,t){if(e||t.err)return tipon(e||t.err).popup();t.success=function(e){"chooseWXPay:ok"==e.errMsg?(i.endCharge(n,"微信公众号支付"),r(null,!0)):r(null,!1)},wx.chooseWXPay(t)})};var a=t(14),s=a.queue(function(n,e){if("function"==typeof n)return n(e);e()}),c={starting:!1,stopping:!1};function u(n){a.timeout(function(n){wx.stopRecord({success:function(e){n(null,e)},fail:function(e){n(e)}})},800)(n)}window.startRecord=function(n){if(c.starting)return n(c.starting);c.starting=!0,s.push([function(e){wx.startRecord({fail:function(e){n(e),n=null},sucess:function(){}}),e()},function(n){setTimeout(n,500)},function(e){c.starting=!1,n&&n(c.starting),e()}])},window.stopRecord=function(n){if(c.stopping)return n("already stopping");c.stopping=!0,s.push(u,function(e,t){if(c.stopping=!1,n)return e?n(e):void window.sendRecord(t.localId,n)})},window.sendRecord=function(n,e){wx.uploadVoice({localId:n,isShowProgressTips:0,success:function(n){var t=n.serverId;e(null,t)}})};var l={};window.playRecord=function(n,e){wx.downloadVoice({serverId:n,isShowProgressTips:0,success:function(n){var t=n.localId;wx.playVoice({localId:t}),l[t]={cb:e,t:new Date}}})},accWechatIntf("weixin/sign",{},function(n,e){if(n)return console.log(n);var i=t(262);e.jsApiList=["onMenuShareTimeline","onMenuShareAppMessage","startRecord","stopRecord","onVoiceRecordEnd","playVoice","pauseVoice","stopVoice","onVoicePlayEnd","uploadVoice","downloadVoice"],e.success=function(){window.wxInit&&window.wxInit()};window.wechatObj=new i(e)}),window.wxInit=function(){var n,e={type:"link",title:"牛牛大作战，大家来斗牛",link:location.origin+location.pathname,imgUrl:location.origin+location.pathname+"res/logo.png",desc:""};try{window.wechatObj.shareOnChat(e),window.wechatObj.shareOnMoment(e)}catch(n){console.log(n)}wx.startRecord(),n=setInterval(function(){wx.stopRecord({success:function(e){clearInterval(n)}})},300),wx.onVoicePlayEnd({success:function(n){var e=l[n.localId];console.log(n),"function"==typeof e.cb&&(e.cb(),delete l[n.localId])}}),setInterval(function(){var n=new Date;for(var e in l){var t=l[e];n-t.t>=3e3&&(t.cb&&t.cb(),delete l[e])}},3e3)}},262:function(n,e,t){"use strict";
/*!
 * @license MIT
 * Client side js to use wechat-jssdk, also works with other server side service.
 * https://github.com/JasonBoy/wechat-jssdk
 */var i=function(){function n(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();var o=window.document,r=window.location.protocol+"//res.wx.qq.com/open/js/jweixin-1.0.0.js",a=["onMenuShareTimeline","onMenuShareAppMessage"],s=function(){function n(e){if(function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this instanceof n){this.config=e||{},this.config.customUrl&&(r=this.config.customUrl,delete this.config.customUrl);var t=this.config.jsApiList;if(!t||t.length<=0)this.config.jsApiList=a;else for(var i=0,o=a.length;i<o;i++){var s=a[i];t.indexOf(s)<0&&t.push(s)}return this.debug=!!this.config.debug,this.loadScript(),this}return new n(e)}return i(n,[{key:"signSignature",value:function(n){var e=this,t=this.config,i=n||t,o={debug:this.debug,appId:t.appId,timestamp:i.timestamp||t.timestamp,nonceStr:i.nonceStr||t.nonceStr,signature:i.signature||t.signature,jsApiList:t.jsApiList.slice(0,t.jsApiList.length)},r=this.debug;if(!window.wx)return console.warn("wechat js not defined"),this;var a=window.wx;return a.config(o),a.ready(function(){console.log("sign signature finished..."),r&&alert("sign signature finished..."),i.success&&i.success.call(e)}),a.error(function(n){r&&alert("sign error: "+JSON.stringify(n)),i.error&&i.error.call(e,n)}),this.wx||(this.wx=a),this}},{key:"loadScript",value:function(){var n=this,e=o.createElement("script");e.type="text/javascript",e.async=!0,e.onload=function(){console.log("Wechat script loaded successfully!"),n.signSignature()},e.onerror=function(e){console.error("Failed to load wechat script!"),console.error(e),n.debug&&alert("Cannot load wechat script!")};var t=o.getElementsByTagName("script")[0];return t.parentNode.insertBefore(e,t),e.src=r,this}},{key:"shareOnMoment",value:function(n){return n?this.callWechatApi("onMenuShareTimeline",n):this}},{key:"shareOnChat",value:function(n){return n?this.callWechatApi("onMenuShareAppMessage",n):this}},{key:"callWechatApi",value:function(n,e){if(!n)return this;var t=this.debug;if(this.config.jsApiList.indexOf(n)<0)return t&&alert("the wechat api ["+n+"] you call was not registered, \npls add the api into your [jsApiList] config"),this;var i=this.wx[n];return i&&"function"==typeof i?(i(e),this):(t&&alert("no such api ["+n+"] found!"),this)}}]),n}();n.exports=s}}]);