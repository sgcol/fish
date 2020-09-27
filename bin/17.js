(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./client/roombase.js":
/*!****************************!*\
  !*** ./client/roombase.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// howto
// 继承RoomBase
// var RoomBase=require('./roombase.js');
// var Loader = laya.net.Loader;
// var Handler = laya.utils.Handler;
//
// class Room extends RoomBase {
// 	constructor(opt) {
// 		super(opt);
// 	}
// 	static create(opt, cb) {
// 		opt=merge(opt, {seatNumber:4, easyrtcApp:'com.1357g.h5.xxx'});
// 		Laya.loader.load([
// 				//{ url: require("./res/hall@h29yzf.mp3"), type: Loader.SOUND },
// 				{ url: require("./res/hall@atlas_uyrl82.jpg"), type: Loader.IMAGE },
// 				{ url: require("./res/hall@atlas10.png"), type: Loader.IMAGE },
// 				{ url: require("./res/hall@atlas0.png"), type: Loader.IMAGE },
// 				{ url: require("./res/hall.fui"), type: Loader.BUFFER }
// 			], Handler.create(null, function() {
// 				var room=new Room(opt);
// 				fairygui.UIPackage.addPackage('hall');
// 				var _view =room._view= fairygui.UIPackage.createObject("牛牛", "Component13").asCom;
// 				window.roomview=_view;
//
// 				room.afterCreateView();
// 				cb(null, room);
// 			})
// 		)
// 	}
// 	getUserMediaRect(id) {
// 	}
// 	getVoiceBtn() {
// 		return this._view.getChild('voicebtn');
// 	}
// 	onVideoActived() {
// 	}
//
// 	以下是可选的
// 	msg(pack) {
// 		switch(pack.c) {
// 			case 'xx':
// 			break;
// 			default:
// 			return super.msg(pack);
// 		}
// 	}
// 	active() {
// 		super.active();
//		Laya.stage.addChildAt(bg, 0);
//		Laya.stage.addChildAt(3d, 1);
//		//Laya.stage.children[2]==fairygui.com;
// 	}
// 	deactive() {
// 		super.deactive();
// 	}	
// }




var assert = __webpack_require__(/*! assert */ "./node_modules/assert/assert.js"),
    merge = __webpack_require__(/*! gy-merge */ "./node_modules/gy-merge/merge.js"),
    EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var me = __webpack_require__(/*! ./myself.js */ "./client/myself.js");
var wins = __webpack_require__(/*! ./windows.js */ "./client/windows.js");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
class ViewBase {
    constructor() {

    }
    static create(opt, cb) {
        assert.fail('必须自己实现create');
        // 这个函数类似
        // if (typeof opt==='function') {cb=opt; opt={}}
        // Laya.loader.load([
        // 	{ url: require("./res/hall@atlas_7hc2v2.jpg"), type: Loader.IMAGE },
        // 	{ url: require("./res/hall@atlas4.png"), type: Loader.IMAGE },
        // 	{ url: require("./res/hall@atlas0.png"), type: Loader.IMAGE },
        // 	{ url: require("./res/hall.fui"), type: Loader.BUFFER }
        // ], Handler.create(null, function() {
        // 	var ui=new ViewBase();
        // 	ui._view=fairygui.UIPackage.createObject("牛牛", "Component").asCom;
        // 	cb(null, ui);
        // }));
    }
    assignAllBtns() {
        var cl = this._view._children;
        var fairyguiNamedEle = /[A-Za-z]\d+/;
        for (var i = 0; i < cl.length; i++) {
            var btn = cl[i].asButton;
            if (btn instanceof fairygui.GButton) {
                if (fairyguiNamedEle.test(btn.name)) continue;
                let _n = btn.name.split('.');
                let _idx = _n[1] || 1;
                _n = _n[0];
                let ctrl = this._view.getController(_n);
                if (ctrl) {
                    btn.onClick(this, function() {
                        ctrl.selectedIndex = _idx;
                    });
                    ctrl.setSelectedIndex(0);
                } else {
                    btn.onClick(this, function() {
                        var candiName = capitalizeFirstLetter(_n) + 'Win';
                        if (wins[candiName]) {
                            var win = new wins[candiName];
                        } else var win = new wins.Win(_n);
                        win.modal = true;
                        win.show();
                    })
                }
            }
        }
    }

    active() {
        console.log('你可以自行实现.active函数');
    }
    deactive() {
        console.log('你可以自行实现.deactive函数');
    }
    msg(pack) {
        // pack:{c:'cmd', anything:'anytype', something:'all these was defined by server'}
        console.log('你可以自行实现.msg函数,这里可以处理服务器来的消息');
    }
}

function walkobj(obj, path, cb) {
    if (obj == null || typeof obj != 'object') return;
    for (var k in obj) {
        var safeK = k.replace(/\\/g, '\\u005c').replace(/\./g, '\\u002e');
        var n = path ? path + '.' + safeK : safeK;
        cb(n, obj[k]);
        walkobj(obj[k], n, cb);
    }
}

class GameData extends EventEmitter {
    constructor() {
        super();
        // this.on('newListener', function(event, listener) {
        // 	listener.call(this, this);
        // });
        var re = this._rangeEvents = [];
        this.on('newListener', function(event, listener) {
            if (event.indexOf('/') == 0) {
                re.push({ reg: new RegExp(event.substring(1, event.length-1)), k: event });
            }
        });
        this.on('removeListener', function(event, listener) {
            var idx = re.findIndex(function(ele) { return ele.k == event });
            if (idx >= 0) re.splice(idx, 1);
        })
    }
    _enumAttr(obj, path, f) {
        if (obj == null) return;
        if (typeof obj != 'object') return;
        for (var e in obj) {
            if (e == '$') continue;
            if (e.indexOf('_') >= 0) continue;
            var safeK = e.replace(/\\/g, '\\u005c').replace(/\./g, '\\u002e');
            var p = path ? path + '.' + safeK : safeK;
            f(p, obj[e]);
            if (typeof obj[e] == 'object') this._enumAttr(obj[e], p, f);
        }
    }
    _chkRegEvent(p) {
        // if (!this.regEvents) {
        // 	this.regEvents=[];
        // 	for (var k in this._events) {
        // 		if (k.indexOf('/')==0) {
        // 			this.regEvents.push({reg:new RegExp(k.substr(1, -2)), k:k});
        // 		}
        // 	}
        // }
        // for (var i=0; i<this.regEvents.length; i++) {
        // 	// this is a reg
        // 	var r=this.regEvents[i].reg.exec(p);
        // 	if (r) {
        // 		r.unshift(this.regEvents[i].k);
        // 		this.emit.apply(this, r);
        // 	}
        // }
        // var self=this;
        // process.nextTick(function() {
        // 	self.regEvents=null;
        // });
        for (var i = 0; i < this._rangeEvents.length; i++) {
            // this is a reg
            var r = this._rangeEvents[i].reg.exec(p);
            if (r) {
                r.unshift(this._rangeEvents[i].k);
                this.emit.apply(this, r);
            }
        }
    }
    _update(obj) {
        // console.log('upd scene', obj);
        var _e = Object.keys(obj);
        if (_e.length == 2 && obj.countdown != null) {} else console.log(obj);
        var self = this;
        if (obj.$) {
            if (obj.$.init) {
                for (var k in this) {
                    if (typeof this[k] == 'function' || k.indexOf('_') == 0) continue;
                    delete this[k];
                }
                merge.recursive(this, obj);
                this.emit('inited', this);
                walkobj(this, null, function(k, v) {
                    if (typeof v == 'function' || k.indexOf('_') == 0) return;
                    self.emit('' + k + 'chgd', self);
                    self._chkRegEvent('' + k + 'chgd');
                });
                // for (var k in this) {
                // 	if (typeof this[k]=='function' || k.indexOf('_')==0) continue;
                // 	this.emit(''+k+'chgd', this);
                // }
                return;
            }
            if (obj.$.delete) {
                var delCmd = obj.$.delete;
                for (var i = 0; i < delCmd.length; i++) {
                    var p = delCmd[i];
                    this.ensuredelete(p);
                    this.emit(p[0] + 'chgd', this);
                    this.emit(p + 'chgd', this);

                    this._chkRegEvent(p + 'chgd');
                }
            }
            if (obj.$.set) {
                var delCmd = obj.$.set;
                for (var i = 0; i < delCmd.length; i++) {
                    var p = delCmd[i];
                    this.ensuredelete(p);
                }
            }
            delete obj.$;
        }
        merge.recursive(this, obj);
        this._enumAttr(obj, '', function(path, v) {
            self.emit(path + 'chgd', v);
            self._chkRegEvent(path + 'chgd');
        });
    }
    ensuredelete(p) {
        var o = this;
        for (var i = 0; i < p.length - 1; i++) {
            if (o[p[i]]) o = o[p[i]];
            else return false;
        }
        if (o) {
            if (Array.isArray(o) && (o.length - 1) == p[p.length - 1]) {
                o.length--;
            } else delete o[p[p.length - 1]];
        }
    }
};

// var io = window.io = require('socket.io-client');
// var easyrtc = require('./js/easyrtc.js');
var _noop = __webpack_require__(/*! ./etc.js */ "./client/etc.js")._noop;
var ensureAccessCamera = (function() {
    var permissions = (!!window.cordova && cordova.plugins.permissions) || {
        checkPermission: function(p, cb) {
            cb({ hasPermission: true })
        }
    };

    function ensureAccessCamera(callback) {
        if (!Laya.Browser.onAndroid) return callback();
        // permissions.checkPermission(permissions.CAMERA, function(status) {
        // if (status.hasPermission) return callback()
        // else 
        permissions.requestPermissions([permissions.RECORD_AUDIO, permissions.CAMERA, permissions.RECORD_AUDIO], function(status) {
            if (status.hasPermission) return callback();
            callback('user canceled');
        }, function() {
            callback('something wrong');
        });
        // }
        // , function() {
        // 	callback('something wrong');
        // });

    }
    return ensureAccessCamera;
})();
// easyrtc.setSocketUrl('http://ws.1357g.com:19999/');
// easyrtc.setVideoDims(100, 100, 15);

function easyrtc_connect(appname, cb) {
    if (typeof appname == 'function') {
        cb = appname;
        appname = null;
    }
    appname = appname || 'com.1357g.h5.niuniu';
    cb = cb || _noop;
    cb();
    // easyrtc.connect(appname, function(myId) {
    //     console.log('easyrtc connected', appname, myId);
    //     cb(null, myId);
    // }, function(err) {
    //     cb(err);
    // });
}
var _cb = console.log.bind(console, 'audioroute ret');
document.addEventListener('audioroute-changed', function(event) {
    if (event.reason == 'route-config-change') {
        cordova.plugins.audioroute.currentOutputs(function(outs) {
            console.log('audio chg to', outs);
            if (outs == 'builtin-receiver') cordova.plugins.audioroute.overrideOutput('speaker', _cb, _cb);
        }, _cb)
    }
});

var sysdiv = document.getElementById('layaContainer'),
    sysCanvas = document.getElementById('layaCanvas');

/**
 * @property {fairygui.GComponent} _view 游戏视图，必须有这个对象
 * @property {GameData} gamedata 游戏数据，与服务器上的同名对象保持一致
 * @property {number} _seatNumber 座位数
 * @property {object} _calls rtc连接
 */
class RoomBase extends ViewBase {
    constructor(opt) {
        super();
        opt = opt || {};
        // opt:{seatNumber:3|4|5, easyrtcApp:'com.1357g.h5.xxx'}
        this.gamedata = this.scene = new GameData();
        this._seatNumber = 4
        this._calls = {};

        var self = this,
            gd = this.gamedata;
        gd.on('inited', function() {
            if (opt.disableRtc || opt.easyrtcApp == null) return;
            // ensureAccessCamera(function(err) {
            //     easyrtc.initMediaSource(
            //         function() {
            //             if (self.hasQuit) return;
            //             self.disableMicrophone();
            //             self.onVideoActived && self.onVideoActived();
            //             self.chgVoiceBtnFunc();
            //             var selfVideo = self.icon2Video(0, true);
            //             if (!selfVideo) return;
            //             easyrtc.setVideoObjectSrc(selfVideo, easyrtc.getLocalStream());
            //             easyrtc_connect(opt.easyrtcApp, function(err, myId) {
            //                 if (err) return console.log(err);
            //                 if (self.hasQuit) return;
            //                 self.afterRtcConnected(myId);
            //                 easyrtc.setDisconnectListener(function() {
            //                     easyrtc.showError("LOST-CONNECTION", "Lost connection to signaling server");
            //                     easyrtc_connect(function(err, myId) {
            //                         if (err) return console.log(err);
            //                         self.afterRtcConnected(myId);
            //                     });
            //                 });
            //             })
            //         }, _noop);
            // });
        });
    }

    // create之后必须调用这个函数
    afterCreateView() {
            this.assignAllBtns();
            var voicebtn = this.getVoiceBtn();
            if (!voicebtn) return;
            var _rec = null,
                _recCanceled = false;
            voicebtn.on('mousedown', null, function() {
                if (window.startRecord) {
                    _recCanceled = false;
                    Laya.SoundManager.setMusicVolume(0.6);
                    setTimeout(function() {
                        if (!_recCanceled) {
                            window.startRecord();
                            Laya.SoundManager.setMusicVolume(0.2);
                            if (wins.RecWin) {
                                _rec = wins.RecWin.inst;
                                _rec.show();
                            }
                        }
                    }, 200);
                }
            });
            voicebtn.on('mouseup', null, function() {
                if (_rec) {
                    setTimeout(function() {
                        window.stopRecord && window.stopRecord(function(err, token) {
                            Laya.SoundManager.setMusicVolume(1);
                            if (err) return console.log(err);
                            if (token) _socket.sendp({ c: 'table.voice', token: token });
                        });
                    }, 300);
                    _rec.hide();
                    _rec = null;
                } else cancelRec();
            });

            function cancelRec() {
                _recCanceled = true;
                console.log('rec canceled');
                window.stopRecord && window.stopRecord();
                if (_rec) {
                    _rec.hide();
                    _rec = null;
                }
                Laya.SoundManager.setMusicVolume(1);
            }
            voicebtn.on('mouseout', null, cancelRec);
        }
        // 必须实现的函数
    static create(opt, cb) {
        assert.fail('必须自己实现create');
    }
    getUserMediaRect(id) {
        assert.fail('要使用视屏，必须自己实现这个函数。该函数返回对应seat(id)的视频区域，一般而言是用户的头像区');
    }
    getVoiceBtn() {
        assert.fail('自行实现这个函数，返回语音按钮');
        // eg. return this._view.getChild('voicebtn');
    }
    onVideoActived() {
        //启用视频的通知，可以在这里切换语音按键的功能
    }

    // 可以覆盖的函数
    msg(pack) {
            var self = this;
            if (pack.gamedata || pack.scene) {
                this.gamedata._update(pack.gamedata || pack.scene);
            }
            return true;
        }
        /**
         * 重写这个函数时，一定要super.active();
         */
    active() {
        // 你需要自行实现active时的操作，如，将所有显示状态置默认位
        var self = this;
        _socket.sendp({ c: 'createInviteCode' });
        netmsg.once('inviteCode', null, function(msg) {
            self.inviteCode = msg.v;
            window.preInvite && window.preInvite(msg.v, self.opt);
        });
        this.mySeat = null;
        this.video2Icon(0);
        this._calls = {};
    }
    deactive() {
        //me.removeAllListeners();
        this.gamedata.removeAllListeners();
        this.hasQuit = true;
        // easyrtc.setDisconnectListener(null);
        // easyrtc.disconnect();

        var videos = sysdiv.getElementsByTagName('video');
        for (var i = 0; i < videos.length; i++) {
            sysdiv.removeChild(videos[i]);
        }
        this._calls = {};
    }

    // 辅助函数，可以被你使用
    /** 
     * 定位自己
     * 在seats中找到自己的位置，没有就反回-1
     *
     * @param {object|[]} seats gamedata.seats
     * @return {number} 
     **/
    locateMe(seats) {
        if (!seats) return -1;
        if (Array.isArray(seats)) {
            for (var i = 0; i < seats.length; i++) {
                var s = seats[i];
                if (s && s.user && s.user.id == me.id) return i;
            }
            return -1;
        } else if (typeof seats == 'object') {
            for (var i in seats) {
                var s = seats[i];
                if (s && s.user && s.user.id == me.id) return i;
            }
            return -1;
        }
        return -1;
    }

    createHTMLDiv(o) {
        var pos = { x: o.x, y: o.y, w: o.width, h: o.height };
        var ele = $('#layaCanvas');
        var rX = Laya.stage.clientScaleX,
            rY = Laya.stage.clientScaleY;
        pos.x = pos.x * rX;
        pos.y = pos.y * rY;
        pos.w = pos.w * rX;
        pos.h = pos.h * rY;
        var div = $('<div class="card" style="position:absolute;left:' + pos.x + 'px; top:' + pos.y + 'px; width:' + pos.w + 'px; height:' + pos.h + 'px"/>');
        div.css('transform', ele.css('transform'));
        div.css('transform-origin', '' + (-pos.x) + 'px ' + (-pos.y) + 'px');
        $('#layaContainer').append(div);
        return div;
    }

    createHTMLVideo(obj) {
        var ho = document.createElement('video');
        var _s = ho.style;
        var rw = sysCanvas.width / (960 * (Laya.Browser.onIOS ? devicePixelRatio : 1));
        var r = sysCanvas.width / (960 * devicePixelRatio);
        var rotate = Number(sysCanvas.style.transform.split(',')[2]) == -1;
        _s.left = (rotate ? (-obj.y) : obj.x) * r + 'px';
        _s.top = (rotate ? obj.x : obj.y) * r + 'px';
        _s.width = obj.width * rw + 'px';
        _s.height = obj.height * rw + 'px';
        _s.transform = sysCanvas.style.transform;
        _s.transformOrigin = sysCanvas.style.transformOrigin;
        _s.position = 'absolute';
        _s['z-index'] = 9999999;
        sysdiv.appendChild(ho);
        return ho;
    }
    findUserLocalSeat(userid) {
        var gd = this.gamedata;
        for (var i = 0; i < gd.seats.length; i++) {
            var seat = gd.seats[i];
            if (seat && seat.user.id == userid) return this.serverSeatToLocal(i);
        }
        return null;
    }
    serverSeatToLocal(seat) {
        if (this.mySeat == null) this.mySeat = locateMe(this.gamedata.seats);
        return (this._seatNumber + seat - this.mySeat) % this._seatNumber;
    }
    pausemsg(f) {
        var self = this;
        window.msgloop.pause();
        f(function() {
            window.msgloop.resume();
        })
    }

    // 内部函数
    chgVoiceBtnFunc() {
        var self = this;
        window.startRecord = function() {
            self.enableMicrophone();
        }
        window.stopRecord = function(cb) {
            self.enableMicrophone(false);
            if (cb) cb(null);
        }
    }
    afterRtcConnected(myId) {
        if (this.hasQuit) return;
        _socket.sendp({ c: 'table.extenddata', rtcid: myId });
        var gd = this.gamedata;
        gd.once('extenddatachgd', function() {
            // 视频连接，后进入的负责呼叫已在房间内的。所以这个事件只处理一次，以后都是由进入的人发起链接。断线用户回来时会再次监听事件
            for (var uid in gd.extenddata) {
                if (uid == me.id) continue;
                // easyrtc.call(gd.extenddata[uid], _noop, _noop, _noop);
            }
        })
    }
    icon2Video(seat, isMe) {
        var obj = this.getUserMediaRect(seat);
        if (!obj) return null;
        console.log('chg', seat, 'to video');
        var v = createHTMLVideo(obj, isMe);
        this._calls[seat] = v;
        obj.visible = false;
        return v;
    }
    video2Icon(seat) {
            var obj = this.getUserMediaRect(seat);
            if (!obj) return null;
            console.log('chg', seat, 'back to icon', obj.url);
            obj.visible = true;
            if (this._calls[seat]) {
                sysdiv.removeChild(this._calls[seat]);
                delete this._calls[seat];
            }
        }
        // 语音键按下的时候enableMicrophone()，放开的时候enableMicrophone(false)
    enableMicrophone(enable) {
        // easyrtc.enableMicrophone(enable == null ? true : enable);
    }
    disableMicrophone() {
            // easyrtc.enableMicrophone(false);
        }
        // 关闭视频，不过这个函数没什么卵用，他只能关闭自己的视频，事实上还是在发送和接收数据
    enableCamera(enable) {
        // easyrtc.enableCamera(enable == null ? true : enable);
    }
    disableCamera() {
        // easyrtc.enableCamera(false);
    }
}

module.exports = RoomBase;

/***/ })

}]);