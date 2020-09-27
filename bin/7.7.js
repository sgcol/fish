webpackJsonp([7],{

/***/ 149:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RoomBase = __webpack_require__(77);
	var merge = __webpack_require__(21);

	var Loader = laya.net.Loader;
	var Handler = laya.utils.Handler;
	// console.log('loadinginging')

	var Room = function (_RoomBase) {
	    _inherits(Room, _RoomBase);

	    function Room() {
	        _classCallCheck(this, Room);

	        return _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).call(this));
	    }

	    _createClass(Room, [{
	        key: 'getUserMediaRect',
	        value: function getUserMediaRect(id) {}
	    }, {
	        key: 'getVoiceBtn',
	        value: function getVoiceBtn() {
	            return this._view.getChild('voicebtn');
	        }
	    }, {
	        key: 'onVideoActived',
	        value: function onVideoActived() {}

	        // 以下是可选的

	    }, {
	        key: 'msg',
	        value: function msg(pack) {
	            switch (pack.c) {
	                case '1':
	                    break;
	                default:
	                    return _get(Room.prototype.__proto__ || Object.getPrototypeOf(Room.prototype), 'msg', this).call(this, pack);
	            }
	        }
	    }, {
	        key: 'active',
	        value: function active() {
	            // super.active();
	            console.log('loadinginging');
	            loadingview.getChild('n16').value = 0;
	            var loading = setInterval(function () {
	                loadingview.getChild('n16').value += 20;
	                // console.log('==========')
	                if (loadingview.getChild('n16').value == 100) {
	                    clearInterval(loading);
	                }
	            }, 1400);
	        }
	    }, {
	        key: 'deactive',
	        value: function deactive() {
	            _get(Room.prototype.__proto__ || Object.getPrototypeOf(Room.prototype), 'deactive', this).call(this);
	        }
	    }], [{
	        key: 'create',
	        value: function create(opt, cb) {
	            console.log('loadinginging');
	            opt = merge(opt, { seatNumber: 4, easyrtcApp: 'com.1357g.h5.xxx' });
	            Laya.loader.load([{ url: __webpack_require__(150), type: Loader.IMAGE }, { url: __webpack_require__(151), type: Loader.IMAGE }, { url: __webpack_require__(152), type: Loader.BUFFER }], Handler.create(null, function () {
	                console.log('loadinginging');
	                var room = new Room(opt);
	                fairygui.UIPackage.addPackage("loadiing");
	                var _view = room._view = fairygui.UIPackage.createObject("loadiing", 'loading页面').asCom;
	                window.loadingview = _view;
	                // load.width = Laya.stage.width;
	                // load.height = Laya.stage.height;
	                // fairygui.GRoot.inst.addChild(load);
	                window.roomview = _view;
	                room.afterCreateView();
	                cb(null, room);
	            }));
	        }
	    }]);

	    return Room;
	}(RoomBase);

	module.exports = Room.create;

/***/ },

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "loadiing@atlas_oy351.jpg?95ef9a08bd083a15838d7c2f84e8efbe";

/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "loadiing@atlas0.png?07c4567fb430d0d360e726b6ef2b0d3f";

/***/ }

});