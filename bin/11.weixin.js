webpackJsonp([11,9],{38:function(t,e,i){(function(t){"use strict";function e(t,e,i){getAjax("/pf/wanba/sign",e,function(e,n){return e?i(e):void getAjax(s.join(l,t),n,i)})}function n(t,e,i){return t>=10*e?i():(window.popPayTips({defaultScore:10*e,appid:h}),window.__paySuccess=function(){i()},void(window.__payError=function(){alert("支付失败，请重试")}))}function r(t,i,n,r){e("/v3/user/buy_playzone_item",{openid:startup_param.openid,openkey:startup_param.openkey,pf:startup_param.pf,zoneid:OPEN_DATA.platform,billno:t,appid:h,itemid:itemMap[i]},function(e,i){return e||0!=i.code?r(e||i.msg):(o.endCharge(t,startup_param.pf+"_"+c),void r())})}var a=i(21),s=i(5),o=i(47),h="1106378639",l="https://api.urlshare.cn",c="undefined";window.pay=function(t,i,a,s){o.beginCharge(t,i,a,startup_param.pf+"_"+c),e("/v3/user/get_playzone_userinfo",{pf:startup_param.pf,zoneid:window.OPEN_DATA.platform,openid:startup_param.openid,openkey:startup_param.openkey},function(e,o){if(e||0!=o.code)return s(e||o.msg);var h=o.data[0].score;n(h,i,function(){r(t,i,a,s)})})},t["export"]=function(t){window.getOpenKey&&window.getOpenKey(function(e){getAjax("/pf/wanba/getUser",e,function(e,i){return e||i.err?(alert(e||i.err),void(location.href="about:blank")):(startup_param=a(startup_param,i),2==OPEN_DATA.platform&&(startup_param.server+="/ios"),c=["undefined","non-ios","ios"][window.OPEN_DATA.platform],void t())})})}}).call(e,i(82)(t))},42:function(t,e,i){"use strict";var n=i(38);t.exports=n},47:function(t,e,i){"use strict";var n=i(81);t.exports=n},81:function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();window.zhuge=window.zhuge||[],window.zhuge.methods="_init debug identify track trackLink trackForm page".split(" "),window.zhuge.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(t),window.zhuge.push(e),window.zhuge}};for(var s=0;s<window.zhuge.methods.length;s++){var o=window.zhuge.methods[s];window.zhuge[o]=window.zhuge.factory(o)}window.zhuge.load=function(t,e){if(!document.getElementById("zhuge-js")){var i=document.createElement("script"),n=new Date,r=n.getFullYear().toString()+n.getMonth().toString()+n.getDate().toString();i.type="text/javascript",i.id="zhuge-js",i.async=!0,i.src=("http:"==location.protocol?"http://sdk.zhugeio.com/zhuge.min.js?v=":"https://zgsdk.zhugeio.com/zhuge.min.js?v=")+r,i.onerror=function(){window.zhuge.identify=window.zhuge.track=function(t,e,i){i&&"[object Function]"===Object.prototype.toString.call(i)&&i()}};var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(i,a),window.zhuge._init(t,e)}},window.zhuge.load("a6294c4a959947719afd7248e98fe072");var h=function(){function t(){n(this,t),this._delayOp=[],this._inited=!0}return a(t,[{key:"init",value:function(t){this._inited=!0}},{key:"_delay",value:function(t){return this._inited?void t():this._delayOp.push({f:t})}},{key:"userin",value:function(t){this._delay(function(){var e=0;if(window.cordova){e=device.platform}else"wechat"==startup_param.pf&&(e="wechat");zhuge.identify(t.id,{name:t.nickname,gender:startup_param.sex,level:t.level,gameServer:"通用",accountType:e})})}},{key:"userout",value:function(){this._delay(function(){zhuge.track("userout")})}},{key:"levelup",value:function(t){this._delay(function(){zhuge.track("levelup",{level:t})})}},{key:"reward",value:function(t,e){this._delay(function(){zhuge.track("reward",{count:t,reason:e})})}},{key:"beginCharge",value:function(t,e,i,n,r){"string"==typeof i&&(r=n,n=i,i=Math.floor(e/3)),this._delay(function(){zhuge.track("beginCharge",{orderId:t,iapId:n,currencyAmount:e,currencyType:"CNY",virtualCurrencyAmount:i,paymentType:r})})}},{key:"endCharge",value:function(t,e){this._delay(function(){zhuge.track("endCharge",{orderId:t,paymentType:e})})}},{key:"enterGame",value:function(t){this._delay(function(){zhuge.track("enterGame",{table:t})})}},{key:"startGame",value:function(t,e,i){this._delay(function(){zhuge.track("startgame",{table:t,name:e}),i&&zhuge.track("consume",{item:e,itemNumber:1,priceInVirtualCurrency:i})})}},{key:"endGame",value:function(t){this._delay(function(){zhuge.track("endGame",{table:t})})}},{key:"share",value:function(){this._delay(function(){zhuge.track("share",{user:{id:me.id,nickname:me.nickname}})})}},{key:"invite",value:function(t,e){this._delay(function(){zhuge.track("invite",{user:{id:me.id,nickname:me.nickname},table:{id:t,msg:e}})})}},{key:"event",value:function(t,e){this._delay(function(){zhuge.track(t,"object"==("undefined"==typeof e?"undefined":r(e))?e:{data:e})})}},{key:"changeToVirtualCurrency",value:function(t,e,i,n){i=i||"金币",n=n||"钻石",this._delay(function(){var r={};r[i]=t,r[n]=e,zhuge.track("buyCoin",r)})}},{key:"consume",value:function(t,e,i){this._delay(function(){zhuge.track("consume",{item:t,itemNumber:e,priceInVirtualCurrency:i})})}}]),t}(),l=new h;window.onunload=l.userout.bind(l),t.exports=l}});