(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{123:function(n,a,e){"use strict";var p=window.tongji=e(20),t=(e(143),e(383)),o=(e(126),"7780586f696310de2a8ddbec927fc078");window.pay=function(n,a,e,r){p.beginCharge(n,a,e,startup_param.pf);var i={};i.userToken=startup_param.userToken,i.channel_id=o,i.item_id=e,i.orderid=n,i.price=a,i.other="",getAjax("/g/pf/buymehappy/sign",i,function(n,a){console.log(n,a.sign);var e=a.sign;i.sign=e;var p="http://h5.1357g.com/g/fish.app/CORS/?s=1&u="+function(n,a){var e="";for(var p in e+=a,n)e+="&"+p+"="+n[p];return e}(i,"http://buymehappy.com.cn/index.php?g=Home&m=GameOauth&a=pay_info");t.get(p,function(n,a){n&&console.log(n);var e=JSON.parse(a.body),p=JSON.parse(e.data);parent.postMessage(p,"http://buymehappy.com.cn")})}),p.endCharge(n,"buymehappy"),r&&r()},n.exports=function(n){if(null==startup_param.userToken)return getAjax("/g/pf/buymehappy/sign",{other:"",channel_id:o},function(n,a){console.log(n,a.sign);var e=a.sign;parent.location.href="http://buymehappy.com.cn/index.php?g=Wap&m=App&a=game_login&channel_id="+o+"&other=&sign="+e+"&v="+Math.random()});getAjax("/g/pf/buymehappy/sign",{userToken:startup_param.userToken,channel_id:o},function(a,e){var p=e.sign,r="http://h5.1357g.com/g/fish.app/CORS/?s=1&u="+("http://buymehappy.com.cn/index.php?g=Home&m=GameOauth&a=get_userinfo&userToken="+startup_param.userToken+"&channel_id="+o+"&sign="+p);t.get(r,function(a,e){a&&console.log(a);var p=JSON.parse(e.body).userinfo;startup_param.nickname=p.wechaname,startup_param.face=p.portrait,startup_param.sex=p.sex,startup_param.city=p.city,startup_param.id=p.openid,n()})})}},185:function(n,a){},186:function(n,a){},351:function(n,a){},373:function(n,a){},375:function(n,a){}}]);