webpackJsonp([7],{37:function(t,e,i){"use strict";function n(){}function r(){var t=i(78).generate;startup_param.id=t(12),startup_param.nickname=a[Math.floor(Math.random()*a.length)],startup_param.pwd=t(8)}window.tongji=i(46);window.pay=function(t,e,i,r){!r&&(r=n),tipon("此功能未开放").popup(r),r()},window.share=function(){console.log("share")},window.preShareResult=function(t,e,i,n,r){console.log("shareContent",arguments)};var a=["浮云","小雨","大鱼","海棠","祁","玲珑","龙女","小十一","小二","啊啊冷","潇洒","很长常常从踩","红红火火","哈哈哈","小龙","大龙","小黄鱼","蝙蝠","鲨鱼","无名","名人","小明","大名","原味","饮料","纯真","出料","可乐","可口","渔夫","渔网","海星","海绵宝宝","派大星","海胆","海参","海鱼","海水","海草","小草","水草","水母","海王","鱼叉","海龟","海豹","结果","大手","水手","大船","小船","河流","深海","沙滩","潜水","浅水","海狗","海象","海鸥","信天翁","海鸟","云朵","飓风","狂风","暴雨","鲍鱼"];null==startup_param.id&&r()},46:function(t,e,i){"use strict";var n=i(80);t.exports=n},78:function(t,e,i){t.exports=i(87)},80:function(t,e,i){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}();window.zhuge=window.zhuge||[],window.zhuge.methods="_init debug identify track trackLink trackForm page".split(" "),window.zhuge.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(t),window.zhuge.push(e),window.zhuge}};for(var s=0;s<window.zhuge.methods.length;s++){var o=window.zhuge.methods[s];window.zhuge[o]=window.zhuge.factory(o)}window.zhuge.load=function(t,e){if(!document.getElementById("zhuge-js")){var i=document.createElement("script"),n=new Date,r=n.getFullYear().toString()+n.getMonth().toString()+n.getDate().toString();i.type="text/javascript",i.id="zhuge-js",i.async=!0,i.src=("http:"==location.protocol?"http://sdk.zhugeio.com/zhuge.min.js?v=":"https://zgsdk.zhugeio.com/zhuge.min.js?v=")+r,i.onerror=function(){window.zhuge.identify=window.zhuge.track=function(t,e,i){i&&"[object Function]"===Object.prototype.toString.call(i)&&i()}};var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(i,a),window.zhuge._init(t,e)}},window.zhuge.load("a6294c4a959947719afd7248e98fe072");var h=function(){function t(){n(this,t),this._delayOp=[],this._inited=!0}return a(t,[{key:"init",value:function(t){this._inited=!0}},{key:"_delay",value:function(t){return this._inited?void t():this._delayOp.push({f:t})}},{key:"userin",value:function(t){this._delay(function(){var e=0;if(window.cordova){e=device.platform}else"wechat"==startup_param.pf&&(e="wechat");zhuge.identify(t.id,{name:t.nickname,gender:startup_param.sex,level:t.level,gameServer:"通用",accountType:e})})}},{key:"userout",value:function(){this._delay(function(){zhuge.track("userout")})}},{key:"levelup",value:function(t){this._delay(function(){zhuge.track("levelup",{level:t})})}},{key:"reward",value:function(t,e){this._delay(function(){zhuge.track("reward",{count:t,reason:e})})}},{key:"beginCharge",value:function(t,e,i,n,r){"string"==typeof i&&(r=n,n=i,i=Math.floor(e/3)),this._delay(function(){zhuge.track("beginCharge",{orderId:t,iapId:n,currencyAmount:e,currencyType:"CNY",virtualCurrencyAmount:i,paymentType:r})})}},{key:"endCharge",value:function(t,e){this._delay(function(){zhuge.track("endCharge",{orderId:t,paymentType:e})})}},{key:"enterGame",value:function(t){this._delay(function(){zhuge.track("enterGame",{table:t})})}},{key:"startGame",value:function(t,e,i){this._delay(function(){zhuge.track("startgame",{table:t,name:e}),i&&zhuge.track("consume",{item:e,itemNumber:1,priceInVirtualCurrency:i})})}},{key:"endGame",value:function(t){this._delay(function(){zhuge.track("endGame",{table:t})})}},{key:"share",value:function(){this._delay(function(){zhuge.track("share",{user:{id:me.id,nickname:me.nickname}})})}},{key:"invite",value:function(t,e){this._delay(function(){zhuge.track("invite",{user:{id:me.id,nickname:me.nickname},table:{id:t,msg:e}})})}},{key:"event",value:function(t,e){this._delay(function(){zhuge.track(t,"object"==("undefined"==typeof e?"undefined":r(e))?e:{data:e})})}},{key:"changeToVirtualCurrency",value:function(t,e,i,n){i=i||"金币",n=n||"钻石",this._delay(function(){var r={};r[i]=t,r[n]=e,zhuge.track("buyCoin",r)})}},{key:"consume",value:function(t,e,i){this._delay(function(){zhuge.track("consume",{item:t,itemNumber:e,priceInVirtualCurrency:i})})}}]),t}(),l=new h;window.onunload=l.userout.bind(l),t.exports=l},87:function(t,e,i){"use strict";function n(t){for(;;)try{return r.randomBytes(t)}catch(e){continue}}var r=i(101),a=i(94);e.generate=function(t){var e,i=new a,r="";"object"==typeof t?(e=t.length||32,t.charset?i.setType(t.charset):i.setType("alphanumeric"),t.capitalization&&i.setcapitalization(t.capitalization),t.readable&&i.removeUnreadable(),i.removeDuplicates()):"number"==typeof t?(e=t,i.setType("alphanumeric")):(e=32,i.setType("alphanumeric"));for(var s=i.chars.length,o=256-256%s;e>0;)for(var h=n(Math.ceil(256*e/o)),l=0;l<h.length&&e>0;l++){var c=h.readUInt8(l);o>c&&(r+=i.chars.charAt(c%s),e--)}return r}},94:function(t,e,i){function n(){this.chars=""}var r=i(115);n.prototype.setType=function(t){var e,i="0123456789",n="abcdefghijklmnopqrstuvwxyz",r=n.toUpperCase(),a="abcdef";e="alphanumeric"===t?i+n+r:"numeric"===t?i:"alphabetic"===t?n+r:"hex"===t?i+a:t,this.chars=e},n.prototype.removeUnreadable=function(){var t=/[0OIl]/g;this.chars=this.chars.replace(t,"")},n.prototype.setcapitalization=function(t){"uppercase"===t?this.chars=this.chars.toUpperCase():"lowercase"===t&&(this.chars=this.chars.toLowerCase())},n.prototype.removeDuplicates=function(){var t=this.chars.split("");t=r(t),this.chars=t.join("")},t.exports=e=n},101:function(t,e,i){(function(t){function n(){var t=[].slice.call(arguments).join(" ");throw new Error([t,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function r(t,e){for(var i in t)e(t[i],i)}var a=i(110);e.createHash=i(111),e.createHmac=i(112),e.randomBytes=function(e,i){if(!i||!i.call)return new t(a(e));try{i.call(this,void 0,new t(a(e)))}catch(n){i(n)}},e.getHashes=function(){return["sha1","sha256","sha512","md5","rmd160"]};var s=i(113)(e);e.pbkdf2=s.pbkdf2,e.pbkdf2Sync=s.pbkdf2Sync,r(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman"],function(t){e[t]=function(){n("sorry,",t,"is not implemented yet")}})}).call(e,i(79).Buffer)},110:function(t,e,i){(function(e,n){!function(){var r=("undefined"==typeof window?e:window)||{};_crypto=r.crypto||r.msCrypto||i(126),t.exports=function(t){if(_crypto.getRandomValues){var e=new n(t);return _crypto.getRandomValues(e),e}if(_crypto.randomBytes)return _crypto.randomBytes(t);throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")}}()}).call(e,function(){return this}(),i(79).Buffer)},111:function(t,e,i){(function(e){function n(t){return function(){var i=[],n={update:function(t,n){return e.isBuffer(t)||(t=new e(t,n)),i.push(t),this},digest:function(n){var r=e.concat(i),a=t(r);return i=null,n?a.toString(n):a}};return n}}var r=i(140),a=n(i(129)),s=n(i(142));t.exports=function(t){return"md5"===t?new a:"rmd160"===t?new s:r(t)}}).call(e,i(79).Buffer)},112:function(t,e,i){(function(e){function n(t,i){if(!(this instanceof n))return new n(t,i);this._opad=h,this._alg=t;var s="sha512"===t?128:64;i=this._key=e.isBuffer(i)?i:new e(i),i.length>s?i=r(t).update(i).digest():i.length<s&&(i=e.concat([i,a],s));for(var o=this._ipad=new e(s),h=this._opad=new e(s),l=0;s>l;l++)o[l]=54^i[l],h[l]=92^i[l];this._hash=r(t).update(o)}var r=i(111),a=new e(128);a.fill(0),t.exports=n,n.prototype.update=function(t,e){return this._hash.update(t,e),this},n.prototype.digest=function(t){var e=this._hash.digest();return r(this._alg).update(this._opad).update(e).digest(t)}}).call(e,i(79).Buffer)},113:function(t,e,i){var n=i(141);t.exports=function(t,e){e=e||{};var i=n(t);return e.pbkdf2=i.pbkdf2,e.pbkdf2Sync=i.pbkdf2Sync,e}},115:function(t,e,i){(function(e){"use strict";function i(t){for(var e=[],i=0;i<t.length;i++)-1===e.indexOf(t[i])&&e.push(t[i]);return e}function n(t){var e=new Set;return t.filter(function(t){return e.has(t)?void 0:(e.add(t),!0)})}function r(t){var e=[];return new Set(t).forEach(function(t){e.push(t)}),e}function a(){var t=!1;return new Set([!0]).forEach(function(e){t=e}),t===!0}"Set"in e?"function"==typeof Set.prototype.forEach&&a()?t.exports=r:t.exports=n:t.exports=i}).call(e,function(){return this}())},126:function(t,e,i){},129:function(t,e,i){function n(t,e){t[e>>5]|=128<<e%32,t[(e+64>>>9<<4)+14]=e;for(var i=1732584193,n=-271733879,r=-1732584194,c=271733878,u=0;u<t.length;u+=16){var d=i,f=n,_=r,p=c;i=a(i,n,r,c,t[u+0],7,-680876936),c=a(c,i,n,r,t[u+1],12,-389564586),r=a(r,c,i,n,t[u+2],17,606105819),n=a(n,r,c,i,t[u+3],22,-1044525330),i=a(i,n,r,c,t[u+4],7,-176418897),c=a(c,i,n,r,t[u+5],12,1200080426),r=a(r,c,i,n,t[u+6],17,-1473231341),n=a(n,r,c,i,t[u+7],22,-45705983),i=a(i,n,r,c,t[u+8],7,1770035416),c=a(c,i,n,r,t[u+9],12,-1958414417),r=a(r,c,i,n,t[u+10],17,-42063),n=a(n,r,c,i,t[u+11],22,-1990404162),i=a(i,n,r,c,t[u+12],7,1804603682),c=a(c,i,n,r,t[u+13],12,-40341101),r=a(r,c,i,n,t[u+14],17,-1502002290),n=a(n,r,c,i,t[u+15],22,1236535329),i=s(i,n,r,c,t[u+1],5,-165796510),c=s(c,i,n,r,t[u+6],9,-1069501632),r=s(r,c,i,n,t[u+11],14,643717713),n=s(n,r,c,i,t[u+0],20,-373897302),i=s(i,n,r,c,t[u+5],5,-701558691),c=s(c,i,n,r,t[u+10],9,38016083),r=s(r,c,i,n,t[u+15],14,-660478335),n=s(n,r,c,i,t[u+4],20,-405537848),i=s(i,n,r,c,t[u+9],5,568446438),c=s(c,i,n,r,t[u+14],9,-1019803690),r=s(r,c,i,n,t[u+3],14,-187363961),n=s(n,r,c,i,t[u+8],20,1163531501),i=s(i,n,r,c,t[u+13],5,-1444681467),c=s(c,i,n,r,t[u+2],9,-51403784),r=s(r,c,i,n,t[u+7],14,1735328473),n=s(n,r,c,i,t[u+12],20,-1926607734),i=o(i,n,r,c,t[u+5],4,-378558),c=o(c,i,n,r,t[u+8],11,-2022574463),r=o(r,c,i,n,t[u+11],16,1839030562),n=o(n,r,c,i,t[u+14],23,-35309556),i=o(i,n,r,c,t[u+1],4,-1530992060),c=o(c,i,n,r,t[u+4],11,1272893353),r=o(r,c,i,n,t[u+7],16,-155497632),n=o(n,r,c,i,t[u+10],23,-1094730640),i=o(i,n,r,c,t[u+13],4,681279174),c=o(c,i,n,r,t[u+0],11,-358537222),r=o(r,c,i,n,t[u+3],16,-722521979),n=o(n,r,c,i,t[u+6],23,76029189),i=o(i,n,r,c,t[u+9],4,-640364487),c=o(c,i,n,r,t[u+12],11,-421815835),r=o(r,c,i,n,t[u+15],16,530742520),n=o(n,r,c,i,t[u+2],23,-995338651),i=h(i,n,r,c,t[u+0],6,-198630844),c=h(c,i,n,r,t[u+7],10,1126891415),r=h(r,c,i,n,t[u+14],15,-1416354905),n=h(n,r,c,i,t[u+5],21,-57434055),i=h(i,n,r,c,t[u+12],6,1700485571),c=h(c,i,n,r,t[u+3],10,-1894986606),r=h(r,c,i,n,t[u+10],15,-1051523),n=h(n,r,c,i,t[u+1],21,-2054922799),i=h(i,n,r,c,t[u+8],6,1873313359),c=h(c,i,n,r,t[u+15],10,-30611744),r=h(r,c,i,n,t[u+6],15,-1560198380),n=h(n,r,c,i,t[u+13],21,1309151649),i=h(i,n,r,c,t[u+4],6,-145523070),c=h(c,i,n,r,t[u+11],10,-1120210379),r=h(r,c,i,n,t[u+2],15,718787259),n=h(n,r,c,i,t[u+9],21,-343485551),i=l(i,d),n=l(n,f),r=l(r,_),c=l(c,p)}return Array(i,n,r,c)}function r(t,e,i,n,r,a){return l(c(l(l(e,t),l(n,a)),r),i)}function a(t,e,i,n,a,s,o){return r(e&i|~e&n,t,e,a,s,o)}function s(t,e,i,n,a,s,o){return r(e&n|i&~n,t,e,a,s,o)}function o(t,e,i,n,a,s,o){return r(e^i^n,t,e,a,s,o)}function h(t,e,i,n,a,s,o){return r(i^(e|~n),t,e,a,s,o)}function l(t,e){var i=(65535&t)+(65535&e),n=(t>>16)+(e>>16)+(i>>16);return n<<16|65535&i}function c(t,e){return t<<e|t>>>32-e}var u=i(139);t.exports=function(t){return u.hash(t,n,16)}},139:function(t,e,i){(function(e){function i(t,i){if(t.length%a!==0){var n=t.length+(a-t.length%a);t=e.concat([t,s],n)}for(var r=[],o=i?t.readInt32BE:t.readInt32LE,h=0;h<t.length;h+=a)r.push(o.call(t,h));return r}function n(t,i,n){for(var r=new e(i),a=n?r.writeInt32BE:r.writeInt32LE,s=0;s<t.length;s++)a.call(r,t[s],4*s,!0);return r}function r(t,r,a,s){e.isBuffer(t)||(t=new e(t));var h=r(i(t,s),t.length*o);return n(h,a,s)}var a=4,s=new e(a);s.fill(0);var o=8;t.exports={hash:r}}).call(e,i(79).Buffer)},140:function(t,e,i){var e=t.exports=function(t){var i=e[t];if(!i)throw new Error(t+" is not supported (we accept pull requests)");return new i},n=i(79).Buffer,r=i(149)(n);e.sha1=i(150)(n,r),e.sha256=i(151)(n,r),e.sha512=i(152)(n,r)},141:function(t,e,i){(function(e){t.exports=function(t){function i(t,e,i,r,a,s){if("function"==typeof a&&(s=a,a=void 0),"function"!=typeof s)throw new Error("No callback provided to pbkdf2");setTimeout(function(){var o;try{o=n(t,e,i,r,a)}catch(h){return s(h)}s(void 0,o)})}function n(i,n,r,a,s){if("number"!=typeof r)throw new TypeError("Iterations not a number");if(0>r)throw new TypeError("Bad iterations");if("number"!=typeof a)throw new TypeError("Key length not a number");if(0>a)throw new TypeError("Bad key length");s=s||"sha1",e.isBuffer(i)||(i=new e(i)),e.isBuffer(n)||(n=new e(n));var o,h,l,c=1,u=new e(a),d=new e(n.length+4);n.copy(d,0,0,n.length);for(var f=1;c>=f;f++){d.writeUInt32BE(f,n.length);var _=t.createHmac(s,i).update(d).digest();if(!o&&(o=_.length,l=new e(o),c=Math.ceil(a/o),h=a-(c-1)*o,a>(Math.pow(2,32)-1)*o))throw new TypeError("keylen exceeds maximum length");_.copy(l,0,0,o);for(var p=1;r>p;p++){_=t.createHmac(s,i).update(_).digest();for(var m=0;o>m;m++)l[m]^=_[m]}var g=(f-1)*o,y=f==c?h:o;l.copy(u,g,0,y)}return u}return{pbkdf2:i,pbkdf2Sync:n}}}).call(e,i(79).Buffer)},142:function(t,e,i){(function(e){function i(t,e,i){return t^e^i}function n(t,e,i){return t&e|~t&i}function r(t,e,i){return(t|~e)^i}function a(t,e,i){return t&i|e&~i}function s(t,e,i){return t^(e|~i)}function o(t,e){return t<<e|t>>>32-e}function h(t){var i=[1732584193,4023233417,2562383102,271733878,3285377520];"string"==typeof t&&(t=new e(t,"utf8"));var n=p(t),r=8*t.length,a=8*t.length;n[r>>>5]|=128<<24-r%32,n[(r+64>>>9<<4)+14]=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8);for(var s=0;s<n.length;s+=16)g(i,n,s);for(var s=0;5>s;s++){var o=i[s];i[s]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8)}var h=m(i);return new e(h)}t.exports=h;/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.
	
	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
	
	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
var l=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],c=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],u=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],d=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11],f=[0,1518500249,1859775393,2400959708,2840853838],_=[1352829926,1548603684,1836072691,2053994217,0],p=function(t){for(var e=[],i=0,n=0;i<t.length;i++,n+=8)e[n>>>5]|=t[i]<<24-n%32;return e},m=function(t){for(var e=[],i=0;i<32*t.length;i+=8)e.push(t[i>>>5]>>>24-i%32&255);return e},g=function(t,e,h){for(var p=0;16>p;p++){var m=h+p,g=e[m];e[m]=16711935&(g<<8|g>>>24)|4278255360&(g<<24|g>>>8)}var y,v,x,w,b,C,S,E,T,M;C=y=t[0],S=v=t[1],E=x=t[2],T=w=t[3],M=b=t[4];for(var R,p=0;80>p;p+=1)R=y+e[h+l[p]]|0,R+=16>p?i(v,x,w)+f[0]:32>p?n(v,x,w)+f[1]:48>p?r(v,x,w)+f[2]:64>p?a(v,x,w)+f[3]:s(v,x,w)+f[4],R=0|R,R=o(R,u[p]),R=R+b|0,y=b,b=w,w=o(x,10),x=v,v=R,R=C+e[h+c[p]]|0,R+=16>p?s(S,E,T)+_[0]:32>p?a(S,E,T)+_[1]:48>p?r(S,E,T)+_[2]:64>p?n(S,E,T)+_[3]:i(S,E,T)+_[4],R=0|R,R=o(R,d[p]),R=R+M|0,C=M,M=T,T=o(E,10),E=S,S=R;R=t[1]+x+T|0,t[1]=t[2]+w+M|0,t[2]=t[3]+b+C|0,t[3]=t[4]+y+S|0,t[4]=t[0]+v+E|0,t[0]=R}}).call(e,i(79).Buffer)},149:function(t,e,i){t.exports=function(t){function e(e,i){this._block=new t(e),this._finalSize=i,this._blockSize=e,this._len=0,this._s=0}return e.prototype.init=function(){this._s=0,this._len=0},e.prototype.update=function(e,i){"string"==typeof e&&(i=i||"utf8",e=new t(e,i));for(var n=this._len+=e.length,r=this._s=this._s||0,a=0,s=this._block;n>r;){for(var o=Math.min(e.length,a+this._blockSize-r%this._blockSize),h=o-a,l=0;h>l;l++)s[r%this._blockSize+l]=e[l+a];r+=h,a+=h,r%this._blockSize===0&&this._update(s)}return this._s=r,this},e.prototype.digest=function(t){var e=8*this._len;this._block[this._len%this._blockSize]=128,this._block.fill(0,this._len%this._blockSize+1),e%(8*this._blockSize)>=8*this._finalSize&&(this._update(this._block),this._block.fill(0)),this._block.writeInt32BE(e,this._blockSize-4);var i=this._update(this._block)||this._hash();return t?i.toString(t):i},e.prototype._update=function(){throw new Error("_update must be implemented by subclass")},e}},150:function(t,e,i){var n=i(93).inherits;t.exports=function(t,e){function i(){return _.length?_.pop().init():this instanceof i?(this._w=f,e.call(this,64,56),this._h=null,void this.init()):new i}function r(t,e,i,n){return 20>t?e&i|~e&n:40>t?e^i^n:60>t?e&i|e&n|i&n:e^i^n}function a(t){return 20>t?1518500249:40>t?1859775393:60>t?-1894007588:-899497514}function s(t,e){return t+e|0}function o(t,e){return t<<e|t>>>32-e}var h=0,l=4,c=8,u=12,d=16,f=new("undefined"==typeof Int32Array?Array:Int32Array)(80),_=[];return n(i,e),i.prototype.init=function(){return this._a=1732584193,this._b=4023233417,this._c=2562383102,this._d=271733878,this._e=3285377520,e.prototype.init.call(this),this},i.prototype._POOL=_,i.prototype._update=function(t){var e,i,n,h,l,c,u,d,f,_;e=c=this._a,i=u=this._b,n=d=this._c,h=f=this._d,l=_=this._e;for(var p=this._w,m=0;80>m;m++){var g=p[m]=16>m?t.readInt32BE(4*m):o(p[m-3]^p[m-8]^p[m-14]^p[m-16],1),y=s(s(o(e,5),r(m,i,n,h)),s(s(l,g),a(m)));l=h,h=n,n=o(i,30),i=e,e=y}this._a=s(e,c),this._b=s(i,u),this._c=s(n,d),this._d=s(h,f),this._e=s(l,_)},i.prototype._hash=function(){_.length<100&&_.push(this);var e=new t(20);return e.writeInt32BE(0|this._a,h),e.writeInt32BE(0|this._b,l),e.writeInt32BE(0|this._c,c),e.writeInt32BE(0|this._d,u),e.writeInt32BE(0|this._e,d),e},i}},151:function(t,e,i){var n=i(93).inherits;t.exports=function(t,e){function i(){this.init(),this._w=f,e.call(this,64,56)}function r(t,e){return t>>>e|t<<32-e}function a(t,e){return t>>>e}function s(t,e,i){return t&e^~t&i}function o(t,e,i){return t&e^t&i^e&i}function h(t){return r(t,2)^r(t,13)^r(t,22)}function l(t){return r(t,6)^r(t,11)^r(t,25)}function c(t){return r(t,7)^r(t,18)^a(t,3)}function u(t){return r(t,17)^r(t,19)^a(t,10)}var d=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],f=new Array(64);return n(i,e),i.prototype.init=function(){return this._a=1779033703,this._b=-1150833019,this._c=1013904242,this._d=-1521486534,this._e=1359893119,this._f=-1694144372,this._g=528734635,this._h=1541459225,this._len=this._s=0,this},i.prototype._update=function(t){var e,i,n,r,a,f,_,p,m,g,y=this._w;e=0|this._a,i=0|this._b,n=0|this._c,r=0|this._d,a=0|this._e,f=0|this._f,_=0|this._g,p=0|this._h;for(var v=0;64>v;v++){var x=y[v]=16>v?t.readInt32BE(4*v):u(y[v-2])+y[v-7]+c(y[v-15])+y[v-16];m=p+l(a)+s(a,f,_)+d[v]+x,g=h(e)+o(e,i,n),p=_,_=f,f=a,a=r+m,r=n,n=i,i=e,e=m+g}this._a=e+this._a|0,this._b=i+this._b|0,this._c=n+this._c|0,this._d=r+this._d|0,this._e=a+this._e|0,this._f=f+this._f|0,this._g=_+this._g|0,this._h=p+this._h|0},i.prototype._hash=function(){var e=new t(32);return e.writeInt32BE(this._a,0),e.writeInt32BE(this._b,4),e.writeInt32BE(this._c,8),e.writeInt32BE(this._d,12),e.writeInt32BE(this._e,16),e.writeInt32BE(this._f,20),e.writeInt32BE(this._g,24),e.writeInt32BE(this._h,28),e},i}},152:function(t,e,i){var n=i(93).inherits;t.exports=function(t,e){function i(){this.init(),this._w=h,e.call(this,128,112)}function r(t,e,i){return t>>>i|e<<32-i}function a(t,e,i){return t&e^~t&i}function s(t,e,i){return t&e^t&i^e&i}var o=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],h=new Array(160);return n(i,e),i.prototype.init=function(){return this._a=1779033703,this._b=-1150833019,this._c=1013904242,this._d=-1521486534,this._e=1359893119,this._f=-1694144372,this._g=528734635,this._h=1541459225,this._al=-205731576,this._bl=-2067093701,this._cl=-23791573,this._dl=1595750129,this._el=-1377402159,this._fl=725511199,this._gl=-79577749,this._hl=327033209,this._len=this._s=0,this},i.prototype._update=function(t){var e,i,n,h,l,c,u,d,f,_,p,m,g,y,v,x,w=this._w;e=0|this._a,i=0|this._b,n=0|this._c,h=0|this._d,l=0|this._e,c=0|this._f,u=0|this._g,d=0|this._h,f=0|this._al,_=0|this._bl,p=0|this._cl,m=0|this._dl,g=0|this._el,y=0|this._fl,v=0|this._gl,x=0|this._hl;for(var b=0;80>b;b++){var C,S,E=2*b;if(16>b)C=w[E]=t.readInt32BE(4*E),S=w[E+1]=t.readInt32BE(4*E+4);else{var T=w[E-30],M=w[E-30+1],R=r(T,M,1)^r(T,M,8)^T>>>7,A=r(M,T,1)^r(M,T,8)^r(M,T,7);T=w[E-4],M=w[E-4+1];var D=r(T,M,19)^r(M,T,29)^T>>>6,I=r(M,T,19)^r(T,M,29)^r(M,T,6),P=w[E-14],O=w[E-14+1],L=w[E-32],N=w[E-32+1];S=A+O,C=R+P+(A>>>0>S>>>0?1:0),S+=I,C=C+D+(I>>>0>S>>>0?1:0),S+=N,C=C+L+(N>>>0>S>>>0?1:0),w[E]=C,w[E+1]=S}var k=s(e,i,n),B=s(f,_,p),V=r(e,f,28)^r(f,e,2)^r(f,e,7),F=r(f,e,28)^r(e,f,2)^r(e,f,7),U=r(l,g,14)^r(l,g,18)^r(g,l,9),z=r(g,l,14)^r(g,l,18)^r(l,g,9),H=o[E],j=o[E+1],G=a(l,c,u),W=a(g,y,v),Y=x+z,X=d+U+(x>>>0>Y>>>0?1:0);Y+=W,X=X+G+(W>>>0>Y>>>0?1:0),Y+=j,X=X+H+(j>>>0>Y>>>0?1:0),Y+=S,X=X+C+(S>>>0>Y>>>0?1:0);var q=F+B,$=V+k+(F>>>0>q>>>0?1:0);d=u,x=v,u=c,v=y,c=l,y=g,g=m+Y|0,l=h+X+(m>>>0>g>>>0?1:0)|0,h=n,m=p,n=i,p=_,i=e,_=f,f=Y+q|0,e=X+$+(Y>>>0>f>>>0?1:0)|0}this._al=this._al+f|0,this._bl=this._bl+_|0,this._cl=this._cl+p|0,this._dl=this._dl+m|0,this._el=this._el+g|0,this._fl=this._fl+y|0,this._gl=this._gl+v|0,this._hl=this._hl+x|0,this._a=this._a+e+(this._al>>>0<f>>>0?1:0)|0,this._b=this._b+i+(this._bl>>>0<_>>>0?1:0)|0,this._c=this._c+n+(this._cl>>>0<p>>>0?1:0)|0,this._d=this._d+h+(this._dl>>>0<m>>>0?1:0)|0,this._e=this._e+l+(this._el>>>0<g>>>0?1:0)|0,this._f=this._f+c+(this._fl>>>0<y>>>0?1:0)|0,this._g=this._g+u+(this._gl>>>0<v>>>0?1:0)|0,this._h=this._h+d+(this._hl>>>0<x>>>0?1:0)|0},i.prototype._hash=function(){function e(t,e,n){i.writeInt32BE(t,n),i.writeInt32BE(e,n+4)}var i=new t(64);return e(this._a,this._al,0),e(this._b,this._bl,8),e(this._c,this._cl,16),e(this._d,this._dl,24),e(this._e,this._el,32),e(this._f,this._fl,40),e(this._g,this._gl,48),e(this._h,this._hl,56),i},i}}});