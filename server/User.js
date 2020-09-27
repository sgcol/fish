'use strict';
var onlineUsers = require('./online.js'),
    ss = require('./ss.js'),
    EventEmitter = require('events')
var tables = require('./tables.js'),
    onlineUsers = require('./online.js');
var filterObj = require('filter-object'),
    async = require('async');
var getDB = require('./db.js');
var printf = require('printf');
var ObjectID = require('mongodb').ObjectID;
var debugout = require('debugout')(require('yargs').argv.debugout);
var alltables = require('./tables.js');
var conf = { room: {} };
var vip = [1, 1.5, 1.5, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
// 此处修改修改成你的内容
var default_user = {
    coins: 10000,
    bank: 0,
    diamond: 50,
    savedMoney: 0, //累计充值
    outlay_exp: 0, //每周充值
    dailyCharge: 0, //每日充值
    dailyGetCoin: 0, //每天捕鱼得钱
    dailyGetFishes: 0, //每天捕鱼数量
    onlineTime: 0, //每天在线时间
    level: 1,
    face: 'ui://6f69ijynsmakpw',
    tickets: 0,
    friends: [],
    vipLv: 0,
    reward: 0, //悬赏
    rewardTimes: 0
};

function getDbuser(userid, proj, cb) {
    User.fromID(userid, proj, function(err, u) {
        if (err) return cb(err);
        cb(null, u.dbuser);
    })
}

// 此处修改修改成你的内容
var pack_define = {
    'imme': { want: { tickets: 3 }, rmb: 0 },
    '6Diamond': { want: { diamond: 6, outlay_exp: 6, savedMoney: 6 }, rmb: 6 },
    '16Diamond': { want: { diamond: 16, outlay_exp: 15, savedMoney: 15 }, rmb: 15 },
    '33Diamond': { want: { diamond: 33, outlay_exp: 30, savedMoney: 30 }, rmb: 30 },
    '210Diamond': { want: { diamond: 210, outlay_exp: 200, savedMoney: 200 }, rmb: 200 },
    '350Diamond': { want: { diamond: 350, outlay_exp: 300, savedMoney: 300 }, rmb: 300 },

    'o7Coin': { want: { coins: 70000, outlay_exp: 6, savedMoney: 6 }, rmb: 6 },
    'o22Coin': { want: { coins: 220000, outlay_exp: 18, savedMoney: 18 }, rmb: 18 }, //o开头代表只能购买一次
    'o38Coin': { want: { coins: 380000, outlay_exp: 30, savedMoney: 30 }, rmb: 30 },
    'o77Coin': { want: { coins: 770000, outlay_exp: 50, savedMoney: 50 }, rmb: 50 },

    'h68Coin': { want: { outlay_exp: 68, savedMoney: 68, add: 1, coins: 680000 }, rmb: 68 },
    'h128Coin': { want: { outlay_exp: 128, savedMoney: 128, add: 2, coins: 1280000 }, rmb: 128 },
    'h198Coin': { want: { outlay_exp: 198, savedMoney: 198, add: 3, coins: 1980000 }, rmb: 198 },
    'h328Coin': { want: { outlay_exp: 328, savedMoney: 328, add: 4, coins: 3280000 }, rmb: 328 },
    'h648Coin': { want: { outlay_exp: 648, savedMoney: 648, add: 5, coins: 6480000 }, rmb: 648 },
    'h1000Coin': { want: { outlay_exp: 1000, savedMoney: 1000, add: 6, coins: 10000000 }, rmb: 1000 },

    'monthlyTickets': { want: { freeExpire: 30 * 24 * 60 * 60 * 1000, outlay_exp: 400 }, rmb: 400 },
    'firstCash': { want: { freeExpire: 12 * 60 * 60 * 1000 }, rmb: 0 },
    'weeklyTickets': { want: { freeExpire: 7 * 24 * 60 * 60 * 1000, outlay_exp: 99 }, rmb: 99 },
    '60': { want: { coins: 100000, outlay_exp: 10000 }, rmb: 60 },

    'd2c5': { want: { coins: 50000, diamond: -5 } },
    'd2c10': { want: { coins: 100000, diamond: -10 } },
    'd2c20': { want: { coins: 210000, diamond: -20 } },
    'd2c50': { want: { coins: 520000, diamond: -50 } },
    'd2c68': { want: { coins: 730000, diamond: -68 } },
    'd2c128': { want: { coins: 1480000, diamond: -128 } },
    'd2c198': { want: { coins: 2480000, diamond: -198 } },
    'd2c328': { want: { coins: 3980000, diamond: -328 } },
    'd2c648': { want: { coins: 7480000, diamond: -648 } },
    'd2c1000': { want: { coins: 13500000, diamond: -1000 } },

    't2c5': { want: { coins: 50000, tickets: -500 } },
    't2c11': { want: { coins: 110000, tickets: -1000 } }

};

// 充值再送
var addition = {
    1: [0, 100000, 260000, 500000, 980000, 2140000, 3500000],
    2: [0, 110000, 270000, 510000, 1000000, 2150000, 3520000],
    3: [0, 120000, 280000, 520000, 1020000, 2160000, 3550000],
    4: [0, 130000, 300000, 530000, 1050000, 2170000, 3600000],
    5: [0, 150000, 330000, 550000, 1100000, 2200000, 3700000],
    6: [0, 170000, 350000, 600000, 1200000, 2300000, 3800000],
    7: [0, 190000, 380000, 700000, 1300000, 2500000, 3900000],
    8: [0, 210000, 400000, 800000, 1600000, 2800000, 4200000],
    9: [0, 230000, 430000, 900000, 1800000, 3100000, 4500000],
    10: [0, 250000, 450000, 950000, 2000000, 3400000, 5000000]
};


//聚宝盆      *thousand
var goldmine = {
    0: [2, 3, 5, 10, 15, 20, 25],
    1: [25, 30, 40, 65, 90, 115, 140],
    2: [160, 180, 220, 320, 420, 520, 620],
    3: [550, 600, 700, 950, 1200, 1450, 1700],
    4: [1400, 1500, 1700, 2200, 2700, 3200, 3700]
}
var onePiece = [100, 500, 2000, 5000, 10000] //大宝藏

function toProj(arr) {
    var p = {};
    for (var i = 0; i < arr.length; i++) {
        var key = arr[i];
        if (key[0] == '!') p[key.slice(1)] = 0;
        else p[key] = 1;
    }
    return p;
}


function isSameDay(a, b) {
    if (a.getDate() == b.getDate()) {
        return true;
    } else {
        return false;
    }
}

function getYearWeek(date1) {
    var date2 = new Date(date1.getFullYear(), 0, 1);
    var day1 = date1.getDay();
    var day2 = date2.getDay();
    var d = Math.round((date1.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
    return Math.ceil(d / 7) + 1;
}

// 此处修改修改成你的内容
const baseOfName = ['浮云', '小雨', '大鱼', '海棠', '祁', '玲珑', '龙女', '小十一', '小二', '啊啊冷', '潇洒', '很长常常从踩', '红红火火', '哈哈哈', '小龙', '大龙', '小黄鱼', '蝙蝠', '鲨鱼', '无名', '名人', '小明', '大名', '原味', '饮料', '纯真', '出料', '可乐', '可口', '渔夫', '渔网', '海星', '海绵宝宝', '派大星', '海胆', '海参', '海鱼', '海水', '海草', '小草', '水草', '水母', '海王', '鱼叉', '海龟', '海豹', '结果', '大手', '水手', '大船', '小船', '河流', '深海', '沙滩', '潜水', '浅水', '海狗', '海象', '海鸥', '信天翁', '海鸟', '云朵', '飓风', '狂风', '暴雨', '鲍鱼'];
const lvCoins = [1180, 1580, 1980, 2380, 2780, 3180];
const expMap = { 1: 5000, 10: 20000, 20: 50000, 50: 80000, 80: 100000, 100: 150000, 150: null };
var lvdef = [];
(function() {
    var lastL = null;
    var idx = 0,
        exp = 0;
    for (var i in expMap) {
        if (lastL == null) { lastL = i; continue; }
        var le = expMap[lastL];
        for (var l = lastL; l < i; l++) {
            lvdef[idx] = exp;
            idx++;
            exp += le;
        }
        lastL = i;
        if (le == null) return;
    }
})();

class Interact extends EventEmitter {
    constructor(user, opt) {
        super();
        this.__ob = true; //prevent syncfy-obj from observation me! 
        this.user = user;
        this.clientAckTimes = 0;
        this.opt = opt || {};
        this.opt.times = this.opt.times || 1;
        this.handler = this.clientAck.bind(this);
        this.user.on('ans', this.handler);
        this.backHandler = this.back.bind(this);
        this.user.on('backOnline', this.backHandler);
        if (opt.timeout) setTimeout(this.finally.bind(this), opt.timeout);
    }
    back() {
        if (this.cmd) this.user.send(this.cmd);
    }
    clientAck(pack) {
        if (this.opt.ans && pack.c != this.opt.ans) return this.emit('other', pack);
        this.clientAckTimes++;
        this.storedAck = pack;
        this.emit('ans', pack);
        if (this.opt.times > 0 && this.clientAckTimes >= this.opt.times) this.finally();
    }
    finally() {
        if (this.finalCalled) return;
        this.finalCalled = true;
        this.emit('final', this.storedAck);
        this.removeAllListeners();
        this.user.removeListener('ans', this.handler);
        this.user.removeListener('backOnline', this.backHandler);
    }
    serverAct(cmd) {
        this.cmd = cmd;
        this.user.send(cmd);
        return this;
    }

};

class User extends EventEmitter {
    constructor(ws, dbuser) {
        super();
        this.__ob = true;
        this.dbuser = dbuser;
        this.table = null;
        this.ws = ws;
        if (!dbuser.weeksday)
            dbuser.weeksday = 1; //一周7天  ，每天的聚宝盆礼物邮件     1~~~7
        dbuser.loginTime = dbuser.timelygift_taken_time = new Date();
        var nameforbanshu = /[a-zA-Z0-9]+/;

        // if (nameforbanshu.test(this.dbuser.nickname)) {
        //     var a = Math.floor(Math.random() * baseOfName.length);
        //     this.dbuser.nickname = baseOfName[a];
        //     console.log(this.dbuser.nickname, baseOfName[a], this.dbuser.id)
        // }
        if (dbuser.lastOfflineTime && dbuser.loginTime.getDate() != dbuser.lastOfflineTime.getDate()) {
            this.dbuser.dailyCharge = 0;
            this.dbuser.dailyGetCoin = 0;
            this.dbuser.dailyGetFishes = 0;
            this.dbuser.dailyGift = [];
            this.dbuser.onlineTime = 0;
            this.dbuser.onhour = [0, 0, 0, 0, 0, 0];
            this.dbuser.tehui = [];
            this.dbuser.rewardTimes = 0;
            var to = getYearWeek(dbuser.loginTime);
            var la = getYearWeek(dbuser.lastOfflineTime)
            console.log(to, la)
            var money = 0;
            if (to != la) {
                // is expired
                this.dbuser.LastOutlay_exp = dbuser.outlay_exp;
                this.dbuser.outlay_exp = 0;
                dbuser.weeksday = 1;
                console.log('不是用一周', dbuser.LastOutlay_exp);
                for (var x = 0; x < 5; x++) {
                    if (dbuser.LastOutlay_exp > onePiece[x]) {
                        money = goldmine[x][0] * 1000;
                        break;
                    }
                }
                if (money > 0)
                    this.storeMail('goldmine', { coins: money });

            } else {
                if (dbuser.LastOutlay_exp > 0) {
                    for (var x = 0; x < 5; x++) {
                        if (dbuser.LastOutlay_exp > onePiece[x]) {
                            money = goldmine[x][dbuser.weeksday] * 1000;
                            break;
                        }
                    }
                    ++dbuser.weeksday;
                    if (money > 0)
                        this.storeMail('goldmine', { coins: money });
                }
            }
        }
        this.exp = this.exp;
        ss('userin', { userid: this.dbuser._id, nick: this.dbuser.nickname });
    };

    static get pack_define() { return pack_define; }
    static get default_user() { return default_user; }

    static fromID(userid, proj, cb) {
        if (typeof proj === 'function') {
            cb = proj;
            proj = null;
        }
        if (typeof userid == 'string') {
            var user = onlineUsers.get(userid);
            if (user) return cb(null, user);
        }
        getDB(function(err, db, easym) {
            easym.createDbJson(db, { col: db.users, key: userid, default: default_user, projection: proj }, function(err, dbu) {
                if (err) return cb(err);
                cb(null, new User({ sendp: function() {} }, dbu));
            });
        })
    }
    static fromShowID(id, proj, cb) {
        if (typeof proj === 'function') {
            cb = proj;
            proj = null;
        }
        getDB(function(err, db, easym) {
            db.users.find({ showId: id }, { _id: true }).limit(1).next(function(err, user) {
                if (err) return cb(err);
                if (!user) return cb('no such user');
                return User.fromID(user._id, proj, cb);
            });
        })
    }

    fixlevel() {
        var n = this.exp;
        for (var i = lvdef.length - 1; i >= 0; i--) {
            if (n >= lvdef[i]) {
                this.level = i + 1;
                return;
            }
        }
        // this.level = 1;
    }
    pack() {
        var o = clone(this.dbuser);
        delete o.pwd;
        delete o.password;
        return o;
    }
    send(msg) { return this.ws && this.ws.sendp(msg); }
    senderr(e) { return this.send({ err: e }) }
        // close(msg) {
        // 	if (!msg) msg={c:'kick', reason:'账号在其他地方登录了'};
        // 	this.send(msg);
        // 	this.ws.close();
        // }
    backOnline() {
        this.offline = false;
        this.emit('backOnline', this);
    }
    quit() {
            if (this.table && this.table.leave) this.table.leave(this);
            this.offline = true;
            this.emit('out', this);
        }
        /**
         * 创建一次交互.
         * @property timeout: 超时时间(秒)
         * @property times: 重复次数，超过重复次数触发final
         * @property ans:指定回答消息，如果不指定，客户端返回的任意消息被视为回答
         * 	   如果指定，其他消息会通过other事件通知
         * 
         * 事件
         * 	ans	客户端回应，参数是收到的数据(pack)
         * 	final 有times的时候，最后一次回应会触发这个事件，超时也触发这个事件
         * 	other 有ans的时候，收到的其他消息
         * @param {string} cmd
         * @param {{timeout:number, times:number, ans:string}} timeoutOrOpt 
         */
    createInteract(cmd, timeoutOrOpt) {
        return new Interact(this, timeoutOrOpt).serverAct(cmd);
    }

    interact(cmd, timeout, cb) {
        if (typeof timeout == 'function') {
            cb = timeout;
            timeout = null;
        }

        var _cb = cb,
            ansHandler, boHandler;
        cb = once(function(err, pack) {
            this.removeListener('backOnline', boHandler);
            this.removeListener('ans', ansHandler);
            _cb.apply(null, arguments);
        });
        if (timeout) setTimeout(function() {
            cb('timeout');
        }, timeout);
        cmd.seq = 1;
        this.send(cmd);
        ansHandler = function(pack) {
            cb(null, pack);
        }
        boHandler = function() {
            this.send(cmd);
        }
        this.on('backOnline', boHandler);
        this.on('ans', ansHandler);
    }
    copyfrom(u) {
        this.table = u.table;
        this.dbuser = u.dbuser;

        // if (this.table) {
        // 	this.send({c:'showview', v:'game'+this.table.type, id:this.table.type, opt:this.table.opt});
        // 	this.table.enter(this);
        // }
    }

    get id() {
        return this.dbuser._id;
    }
    get nickname() {
        return this.dbuser.nickname || this.dbuser._id;
    }
    set nickname(s) {
        this.dbuser.nickname = s;
        // console.log(this.dbuser.nickname, 'set')
        this.send({ user: { nickname: s } });
    }
    get face() {
        return this.dbuser.face;
    }
    set face(f) {
        this.dbuser.face = f;
        this.send({ user: { face: f } });
    }
    get tehui() {
        return this.dbuser.tehui;
    }
    set tehui(f) {
        this.dbuser.tehui = f;
        this.send({ user: { tehui: f } });
    }
    get exp() {
        return this.dbuser.exp || 0;
    }
    set exp(n) {
        this.dbuser.exp = n;
        // this.send({ user: { exp: n } });
        this.fixlevel();
    }
    get reward() {
        return this.dbuser.reward;
    }
    set reward(r) {
        this.dbuser.reward = r;
        this.send({ user: { reward: r } });
    }
    get rewardTimes() {
        return this.dbuser.rewardTimes;
    }
    set rewardTimes(r) {
        this.dbuser.rewardTimes = r;
        this.send({ user: { rewardTimes: r } });
    }
    get level() {
        return this.dbuser.level;
    }
    set level(n) {
        var oldlv = this.dbuser.level || 1;
        this.dbuser.level = n;
        //if (oldlv==n) return;
        if (oldlv < n) {
            this.send({ user: { level: n, baseexp: lvdef[n - 1], nextexp: lvdef[n] } });
            //this.tickets+=(n-oldlv);
            // this.storeMail('升级奖励', {tickets:1});
            var lv = [0, 10, 20, 50, 80, 100];
            var addcoin = 0;
            for (var z = 0; z < 7; z++) {
                if (n >= lv[z]) {
                    addcoin = lvCoins[z];
                    break;
                }
            }
            this.dbuser.coins += addcoin;
            this.send({ c: 'notice', coin: addcoin, lv: n }); //升级
        }
    }
    get vipLv() {
        return this.dbuser.vipLv;
    }
    set vipLv(n) {
        this.dbuser.vipLv = n;
        this.dbuser.tehui = [];

    }
    get tickets() {
        return this.dbuser.tickets;
    }
    set tickets(n) {
        this.dbuser.tickets = +n;
        this.send({ user: { tickets: +n } });
    }
    get table() {
        return this._table;
    }
    set table(tbl) {
        this._table = tbl;
        if (tbl == null) return this.send({ user: { table: 0 } });
        this.send({ user: { table: tbl.code } });
    }
    get showId() {
        return this._showId;
    }
    set showId(n) {
        this._showId = n;
        this.send({ user: { showId: n } });
    }
    get mailCount() {
        return this._mailCount || 0;
    }
    set mailCount(n) {
        this._mailCount = n;
        this.send({ user: { mailCount: n } });
    }
    get firstCash() {
        return this.dbuser.firstCash || 0;
    }
    set firstCash(n) {
        var oldv = this.dbuser.firstCash || 0;
        if (n < oldv) return;
        this.dbuser.firstCash = n;
        this.send({ user: { firstCash: n } });
    }
    get savedMoney() {
        return this.dbuser.savedMoney || 0;
    }
    set savedMoney(n) {
        this.dbuser.savedMoney = n;
        this.send({ user: { savedMoney: n } });
    }
    get coins() {
        return this.dbuser.coins;
    }
    set coins(n) {
        this.dbuser.coins = n;
        this.send({ user: { coins: n } });
    }
    get bank() {
        return this.dbuser.bank;
    }
    set bank(o) {
        if (o < 0) {
            return this.senderr('没有那么多钱')
        }
        this.dbuser.bank = o;
        this.send({ user: { bank: o } });
    }
    get timeOfLastBuy() {
        return this.dbuser.timeOfLastBuy
    }
    set timeOfLastBuy(t) {
        this.dbuser.timeOfLastBuy = t;
        this.send({ user: { timeOfLastBuy: t } });
    }
    get dailyGetCoin() {
        return this.dbuser.dailyGetCoin;
    }
    set dailyGetCoin(t) {
        this.dbuser.dailyGetCoin = t;
    }
    get dailyGetFishes() {
        return this.dbuser.dailyGetFishes;
    }
    set dailyGetFishes(t) {
        this.dbuser.dailyGetFishes = t;
    }
    get bought() {
        return this.dbuser.bought;
    }
    set bought(t) {
        this.dbuser.bought = t;
        this.send({ user: { bought: t } });
    }
    get LastOutlay_exp() {
        return this.dbuser.LastOutlay_exp;
    }
    set LastOutlay_exp(t) {
        console.log('设置')
        this.dbuser.LastOutlay_exp = t;
        this.send({ user: { LastOutlay_exp: t } });
        var money = 0;
        for (var x = 0; x < 5; x++) {
            if (this.dbuser.LastOutlay_exp > onePiece[x]) {
                money = goldmine[x][0] * 1000;
                break;
            }
        }
        console.log(money)
        this.storeMail('goldmine', { coins: money });
    }


    storeMail(from, content, cb) {
        console.log(content, 'makemail')
        var self = this;
        g_db.p.mails.insert({ to: this.id, from: from, content: content, time: new Date(), used: false }, { w: 1 }, function() {
            self.mailCount++;
            cb && cb.apply(null, arguments)
        });
    }
    addPackage(packname) {
        var pack = typeof packname == 'string' ? pack_define[packname] : packname;
        debugout(pack);
        if (!pack) return false;
        // if (!pack.name) pack.name = packname;

        var obj = this.dbuser,
            upd = {};
        var now = new Date()
        if (pack.name) {
            if (pack.name.indexOf('o') == 0) {
                if (!obj.bought)
                    obj.bought = [];
                obj.bought.push(pack.name);
            };
            if (pack.name.indexOf('h') == 0) {
                if (!obj.tehui)
                    obj.tehui = [];
                obj.tehui.push(pack.name);
                this.send({ user: { tehui: obj.tehui } })
            }
        }
        for (var k in pack.want) {
            switch (k) {
                case 'freeExpire':
                    var now = new Date().getTime();
                    var start = Math.max(obj.freeExpire || 0, now);
                    debugout('freeExpire', now, obj.freeExpire, start, pack.want.freeExpire);
                    obj.freeExpire = new Date(start + pack.want.freeExpire);
                    break;
                case 'outlay_exp': //每周充值
                    var to = getYearWeek(now);
                    var la = getYearWeek(obj.timeOfLastBuy)
                    if (to != la) {
                        // is expired
                        obj.outlay_exp = 0;
                    } else {
                        if (obj.timeOfLastBuy.getDate() == now.getDate()) {
                            upd.dailyCharge = obj.dailyCharge += pack.want.outlay_exp;
                        } else {
                            upd.dailyCharge = obj.dailyCharge = pack.want.outlay_exp;
                        }
                    }
                    obj.outlay_exp += pack.want.outlay_exp;
                    if (obj.firstBuy == null) {
                        obj.firstBuy = now;
                        this.send({ user: { firstBuy: obj.firstBuy } });
                    }
                    break;
                case 'add':
                    pack.want.coins += addition[obj.vipLv][pack.want.add]
                    break;
                case 'savedMoney':
                    obj.savedMoney += pack.want.savedMoney
                    break;
                default:
                    obj[k] += pack.want[k];
                    obj.timeOfLastBuy = now;
            }
            upd[k] = obj[k];
        }
        if (obj.savedMoney > 5) {
            upd['vipLv'] = obj['vipLv'] = 1;
        }
        if (obj.savedMoney > 15) {
            upd['vipLv'] = obj['vipLv'] = 2;
        }
        if (obj.savedMoney > 35) {
            upd['vipLv'] = obj['vipLv'] = 3;
        }
        if (obj.savedMoney > 60) {
            upd['vipLv'] = obj['vipLv'] = 4;
        }
        if (obj.savedMoney > 95) {
            upd['vipLv'] = obj['vipLv'] = 5;
        }
        if (obj.savedMoney > 145) {
            upd['vipLv'] = obj['vipLv'] = 6;
        }
        if (obj.savedMoney > 244) {
            upd['vipLv'] = obj['vipLv'] = 7;
        }
        if (obj.savedMoney > 433) {
            upd['vipLv'] = obj['vipLv'] = 8;
        }
        if (obj.savedMoney > 678) {
            upd['vipLv'] = obj['vipLv'] = 9;
        }
        if (obj.savedMoney > 977) {
            upd['vipLv'] = obj['vipLv'] = 10;
        }
        if (pack.name == 'firstCash') this.firstCash = 2;
        this.send({ user: upd });
        return true;
    }
    join(code) {
        var tbl = tables.find(code);
        if (!tbl) {
            // 如果原本table有值，那说明他已经在某个桌子上了，不应该去掉原来的桌子，
            //this.table=null;
            if (this.table == null) this.table = null;
            return this.senderr('没有这个桌子号');
        }
        if (this.table && this.table != tbl) return this.senderr('已经在另外的桌子上');
        if (!tbl.canEnter(this)) return;
        // if (tbl.opt.isAA && tbl.opt.fangka > this.tickets) return this.senderr({ message: '房卡不足，请购买房卡', win: 'BuyTicketsWin' });
        this.table = tbl;
        this.send({ c: 'showview', v: 'game' + tbl.roomtype, id: tbl.roomtype, roomid: tbl.roomid, opt: tbl.opt, seq: 1 });
        tbl.enter(this);
    }
    backRoom(code) {
        if (!this.table) {
            this.table = null;
            return this.senderr('桌子已经解散了');
        }
        if (this.table.code != code) {
            debugout(this.table.code, code);
            return this.senderr('桌子号错误，不能进入');
        }
        var tbl = this.table;
        this.send({ c: 'showview', v: 'game' + tbl.roomtype, id: tbl.roomtype, roomid: tbl.roomid, opt: tbl.opt, seq: 1 });
        tbl.enter(this);
    }
    prepareLeaveTable() {
        var tbl = this.table;
        if (tbl == null) return false;
        this.table = null;
        this.ws.sendp({ c: 'showview', v: 'hall', seq: 1 });
        if (this.offline) onlineUsers.remove(this);
        return tbl;
    }
    msg(pack) {
        var self = this;
        switch (pack.c) {
            case 'entergame':
                if (pack.opt.fangka > this.tickets) {
                    return this.senderr({ message: '创建这个房间需要' + pack.opt.fangka + '张房卡，请先购买房卡', win: 'BuyTicketsWin' });
                }
                var tbl = tables.availble(pack.roomtype, pack.opt);
                if (!tbl) return this.senderr('没有可用的桌子了');
                if (this.table) return this.send({ err: '已经在其他桌子上了' }); // && (this.table.quit(this))
                this.table = tbl;
                //console.log(tbl);
                this.send({ c: 'showview', v: 'game' + pack.roomtype, id: pack.roomtype, roomid: tbl.roomid, opt: pack.opt, seq: 1 });
                tbl.enter(this);
                break;
            case 'leavegame':
                var tbl = self.table; //self.prepareLeaveTable();
                if (!tbl) return this.send({ err: '不在任何桌子上' });
                tbl.leave(this);
                this.table = null;
                this.ws.sendp({ c: 'showview', v: 'hall', seq: false });
                break;
            case 'quitgame':
                var tbl = self.table; //self.prepareLeaveTable();
                if (!tbl) return this.send({ err: '不在任何桌子上' });
                tbl.quit(this);
                this.table = null;
                this.send({ user: { dailyGetCoin: this.dbuser.dailyGetCoin, dailyGetFishes: this.dbuser.dailyGetFishes } });
                this.ws.sendp({ c: 'showview', v: 'hall', seq: false });
                break;
            case 'dismissgame':
                var tbl = self.table; //self.prepareLeaveTable();
                if (!tbl) return this.send({ err: '不在任何桌子上' });
                tbl.wantdismiss(this);
                break;
            case 'getuserinfo':
                var userid = Array.isArray(pack.userid) ? pack.userid : [pack.userid];
                var attr = Array.isArray(pack.attr) ? pack.attr : [pack.attr];
                attr.unshift('!pwd');
                var o = { c: 'userinfo', u: [] };
                var t = [];
                var proj = toProj(attr);
                for (let i = 0; i < userid.length; i++) {
                    t.push(function(cb) {
                        getDbuser(userid[i], proj, function(err, dbuser) {
                            o.u[userid[i]] = filterObj(dbuser, attr);
                            cb(err);
                        });
                    });
                }
                async.parallel(t, function(err) {
                    o.err = err;
                    self.send(o);
                });
                break;
            case 'sdr':
                break;
            case 'buyCoin':
                var obj = this.dbuser;
                var pack = pack_define[pack.name];
                if (!pack)
                    return this.senderr('no such pack')
                if (obj.diamond < (-pack.want.diamond)) {
                    return this.senderr('钻石不足')
                }
                this.addPackage(pack)
                this.send({ c: 'buyCoin', costDiamond: pack.want.diamond, coins: pack.want.coins, user: { coins: obj.coins, diamond: obj.diamond } })
                break;
            case 'buyDiamond':
                if (pack.useVipChanel) {
                    if (!this.dbuser.vipChanel) return self.ws.sendp({ c: 'buyDiamond', err: '你不能使用特别VIP购买通道' });
                    g_db.createDbJson(g_db.p, { col: g_db.p.bills, alwaycreate: true }, function(err, bill) {
                        bill._id = createBill(pack);
                        self.ws.sendp({ c: 'pay', tag: bill._id, title: '钻石', desc: printf('%d个钻石', pack.amount) });
                    })
                }
                break;
            case 'buyPack':
                break;
            case 'verification':
                var obj = this.dbuser;
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证
                var reg2 = /[\u4E00-\u9FA5\uF900-\uFA2D]/; //名字  （中文）
                if (reg.test(pack.code)) {
                    if (reg2.test(pack.name)) {
                        obj.verification = pack.code;
                        this.send({ c: 'verification', user: { verification: obj.verification } })
                    } else {
                        return this.senderr('请输入中文')
                    }
                } else {
                    return this.senderr('身份证号码不符合规范')
                }
                break;
            case 'gift@100rmb':
                var obj = this.dbuser;
                if (obj.used_outlay_exp == null) obj.used_outlay_exp = 0;
                if (obj.outlay_exp - obj.used_outlay_exp > 100) {
                    obj.used_outlay_exp += 100;
                    obj.freeExpire = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
                    this.send({ user: { freeExpire: obj.freeExpire, used_outlay_exp: obj.used_outlay_exp } });
                }
                break;
            case 'gifteveryday': //整点礼包
                var gedDef = [9, 12, 15, 18, 21, 24];
                var user = this.dbuser;
                var now = new Date();
                // transfer to gift number
                var giftNumber = 0;
                if (!user.onhour)
                    user.onhour = new Array(6).fill(0)
                for (var x = 0; x < 6; x++) {
                    if (now.getHours() < gedDef[x]) {
                        giftNumber = x;
                        break;
                    }
                }
                if (user.onhour[giftNumber] && isSameDay(user.onhour[giftNumber], now)) return this.senderr('已经领取过');
                // if (user.onhour[giftNumber] && isSameDay(user.lasttakeged._t, now) && user.lasttakeged.num == giftNumber) return this.senderr('已经领取过');
                user.onhour[giftNumber] = now;
                this.addPackage({ want: { coins: 500 } });
                this.send({ c: 'gifteveryday', user: { coins: user.coins, onhour: user.onhour } })
                break;
            case 'gift2everyday': //每日任务礼包
                var gedDef = [500, 1500, 3000, 6500, 9000];
                var user = this.dbuser;
                // transfer to gift number
                var now = new Date();
                if (!user.dailyGift)
                    user.dailyGift = [0, 0, 0, 0, 0];
                if (user.dailyGift[pack.stage - 1] && isSameDay(user.dailyGift[pack.stage - 1], now)) return this.senderr('已经领取过');
                user.dailyGift[pack.stage - 1] = now;
                this.addPackage({ want: { coins: gedDef[pack.stage - 1] } });
                this.send({ c: 'gift2everyday', delta: gedDef[pack.stage - 1], user: { coins: user.coins, dailyGift: user.dailyGift } });
                break;
            case 'firstCash':
                this.addPackage('firstCash');
                break;
            case 'firstMoney':
                var obj = this.dbuser;
                obj.freeExpire = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                this.send({ user: { freeExpire: obj.freeExpire } });
                break;
            case 'timelyGift':
                var obj = this.dbuser;
                var now = new Date();
                debugout('tg', now, obj.timelygift_taken_time, now - obj.timelygift_taken_time);
                if ((now - obj.timelygift_taken_time) < 8 * 60 * 1000) return this.senderr('还没到时间呢，不能领奖');
                obj.timelygift_taken_time = now;
                obj.outlay_exp += 1;
                this.send({ user: { outlay_exp: obj.outlay_exp, timelygift_taken_time: obj.timelygift_taken_time } });
                break;
            case 'mkmail':
                self.storeMail(pack.from, pack.content);
                self.mailCount++;
                break;
            case 'Fcheck':
                //打开福利大厅时
                var now = new Date();
                var obj = this.dbuser;
                if (obj.lastCheck) {
                    if (now.getMonth() != obj.lastCheck.getMonth()) {
                        for (var x = 0; x < 7; x++) {
                            obj.month[37 - x] = obj.month[30 - x];
                        }
                        for (var x = 0; x < 31; x++) {
                            obj.month[x] = 1;
                        }

                    }
                } else {
                    obj.lastCheck = now;
                    obj.month = new Array(38).fill(1)
                }

                this.send({ 'c': 'Fcheck', user: { month: obj.month } })
                break;
            case 'check':
                //0-30  为本月  31-37  上月
                var obj = this.dbuser;
                var now = new Date();

                if (obj.month[now.getDate() - 1] == 1) {
                    obj.lastCheck = now;
                    obj.month[now.getDate() - 1] = 2;
                } else {
                    this.senderr('已签到')
                }

                //签到金钱   
                var lian = 0,
                    leiji = 0;
                for (var x = 0; x < 7; x++) {
                    var dat = now.getDate() - 1 - x;
                    if (dat < 0) {
                        dat = 38 + dat;
                    }
                    if (obj.month[dat] == 2) {
                        ++lian;
                    } else {
                        break;
                    }
                }
                for (var x = 0; x < 31; x++) {
                    leiji += (obj.month[x] - 1);
                }

                var ja = 1000,
                    jb = 0,
                    jc = 0;
                jb = 500 * (lian - 1)
                if (jb > 3000) {
                    jb = 3000
                }
                if (jb < 0) { jb = 0 }
                if (leiji == 15) {
                    jc = 5500
                }
                if (leiji == 25) {
                    jc = 10000
                }
                ja = vip[obj.vipLv] * ja;
                jb = vip[obj.vipLv] * jb;
                jc = vip[obj.vipLv] * jc;
                var zong = ja + jb + jc;
                obj.coins += zong;
                this.send({ 'c': 'check', user: { month: obj.month, coins: obj.coins } })
                break;
            case 'rcvmail':
                g_db.p.mails.find({ _id: ObjectID(pack.mailid), used: false }).limit(1).toArray(function(err, mails) {
                    var ret = { c: 'rcvmail', mailid: pack.mailid, status: 'fail' };
                    if (err) {
                        self.send(ret);
                        return self.send({ err: err });
                    }
                    var mail = mails[0];
                    if (!mail) {
                        self.send(ret);
                        return self.send({ err: printf('no such mail %s', pack.mailid) });
                    }
                    g_db.p.mails.update({ _id: ObjectID(pack.mailid) }, { $set: { used: true } });
                    self.addPackage({ want: mail.content });
                    ret.status = 'ok';
                    ret.give = mail.content;
                    self.send(ret);
                    self.mailCount--;
                    //self.update('gifts');
                    //self.send({user:{gifts:self.dbuser.gifts}});
                });
                break;
                // case 'mail':
                // case 'mails':
                // 	g_db.p.mails.find({used:false, to:this.id}).sort({_t:-1}).limit(20).toArray(function(err, mails) {
                // 		if (err) return self.send({err:err});
                // 		self.send({c:'mails', mails:mails});
                // 	});
                // break;
            case "ffreward":
                var reType = Math.ceil(Math.random() * 10);
                var obj = this.dbuser;
                obj.rewardType = reType;
                this.send({ c: 'ffreward', type: reType })
                break;
            case 'realThing':
                var obj = this.dbuser;
                if (obj.tickets > pack.thing) {
                    if (obj.buyReal) {
                        obj.buyReal.push({ thing: pack.thing, name: pack.info.name, phone: pack.info.phone, address: pack.info.address });
                    } else {
                        obj.buyReal = [];
                        obj.buyReal.push({ thing: pack.thing, name: pack.info.name, phone: pack.info.phone, address: pack.info.address });
                    }
                    console.log(pack, obj.buyReal);
                    this.send({ c: 'realThing' });
                } else {
                    this.senderr('奖券不足')
                }
                break;
            case 'gift':
                pack.giftnum = pack.giftnum || 1;
                var need = pack.giftnum * conf.gifts[pack.giftname].coin;
                if (need > this.dbuser.coin) return this.send({ err: printf('not enough money, need %d', need) });
                this.dbuser.coin -= need;
                this.send({ user: { coin: this.dbuser.coin } });
                getDbuser({ nickname: pack.to }, function(err, dbuser) {
                    if (err) return self.send({ err: err });
                    var mail = { content: { gifts: {} }, _t: new Date(), from: self.dbuser.nickname || self.id, used: false };
                    mail.content.gifts[pack.giftname] = pack.giftnum || 1;
                    storeMail(dbuser, mail);
                });
                break;
            case 'sellgift':
                var gifts = this.dbuser.gifts;
                if (!gifts) return this.send({ err: 'no gifts' });
                var gift = gifts[pack.giftid];
                if (!gift) return this.send({ err: printf('no such gift %s', pack.giftid) });
                if (gift < pack.count) return this.send({ err: printf('not enough gift number %d', pack.count) });
                var left = gifts[pack.giftid] - pack.count;
                if (left) gifts[pack.giftid] = left;
                else delete gifts[pack.giftid];
                this.dbuser.coin += conf.gifts[pack.giftid].coin * pack.count;
                this.update('gifts', 'coin');
                break;
            case 'onlinecount':
                this.ws.sendp({ c: 'onlinecount', all: onlineUsers.all });
                break;
            case 'bank':
                if (pack.coin < 0 && (this.bank + pack.coin) < 0) {
                    return this.senderr('没有那么多钱')
                }
                if (pack.coin > 0 && (this.coins - pack.coin) < 0) {
                    return this.senderr('没有那么多钱')
                }
                this.bank += pack.coin;
                this.coins -= pack.coin;
                // this.dbuser.testa = [1, 2, 3, 4, 5, 6, 7, 8];
                // delete this.dbuser.testa;
                self.ws.sendp({ c: 'bank', user: { bank: this.bank, coins: this.coins } });
                break;
            case 'board':
                var type = listboard[pack.type];
                if (!type) return this.send({ err: printf('no such board %s', pack.type) });
                var now = new Date();
                if (now - type.time <= (10 * 60 * 1000)) return this.send({ c: 'board', type: pack.type, board: type.b });
                var proj = { nickname: 1, vip: 1, face: 1 };
                proj[pack.type] = 1;
                g_db.p.users.find({}, proj, {
                    limit: 50,
                    sort: [
                        [pack.type, 'desc']
                    ]
                }).toArray(function(err, r) {
                    if (err) return self.senderr(err);
                    type.time = now;
                    type.b = r;
                    self.send({ c: 'board', type: pack.type, board: r });
                });
                break;
            case 'createInviteCode':
                // console.log(this)
                if (this.table) this.send({ c: 'inviteCode', v: this.table.code });
                else this.senderr('no table');
                break;
            case 'join':
                this.join(pack.code);
                break;
            case 'backroom':
                this.backRoom(pack.code);
                break;
                //this.send({c:'table.status', id:2});
            case 'mails':
                var ret = [];
                var self = this;
                var cur = g_db.p.mails.find({ to: this.id, used: false }).sort({ time: -1 }).skip(pack.start || 0).limit(30).toArray(function(err, result) {
                    for (var i = 0; i < result.length; i++) {
                        var item = result[i];
                        ret.push({ id: item._id, from: item.from, to: self.nickname, time: item.time, used: item.used, content: item.content });
                    }
                    self.send({ c: 'mails', v: ret });
                });
                break;
            case 'addmail':
                var self = this;
                var obj = this.dbuser;
                var now = new Date();
                if (+pack.content.coins <= 0) {
                    return this.senderr('金钱须大于0')
                }
                getDbuser({ showId: pack.toId }, function(err, dbuser) {
                    if (err) return self.send({ err: err });
                    var mail = { content: { gifts: {} }, _t: new Date(), from: self.dbuser.showId || self.id, used: false };
                    mail.content.gifts = pack.content;
                    self.dbuser.coins -= +pack.content.coins;
                    self.storeMail(dbuser, mail);
                    if (obj.yifasong) {
                        obj.yifasong.push({ toid: pack.toId, money: +pack.content.coins, time: now, from: obj.showId, name: pack.toName })
                    } else {
                        obj.yifasong = [];
                        obj.yifasong.push({ toid: pack.toId, money: +pack.content.coins, time: now, from: obj.showId, name: pack.toName })
                    }
                    self.send({ user: { coins: self.dbuser.coins, yifasong: obj.yifasong }, 'c': 'addmailsuccess' })
                });
                break;
            case 'trans':
                var dest = onlineUsers.get(pack.to);
                if (dest) {
                    dest.send(pack);
                }
                break;
            case 'alltables':
                // debugout('all', alltables.all());
                if (this.dbuser.isAdmin) this.send({ c: 'alltables', tables: alltables.all('showAdminData') });
                else this.send({ c: 'alltables', tables: alltables.all() });
                break;
            case 'withdraw':
                // if (!withdrawCache[this.id]) {
                // 	withdrawCache[this.id]={from:this.id, rmb:pack.coins};
                g_db.p.withdraw.insert({ from: this.id, nickname: this.nickname, exported: false, _t: new Date(), rmb: pack.coins }, function() {
                    self.coins -= pack.coins;
                    self.send({ c: 'withdraw.ok' });
                });
                // } else {
                // 	withdrawCache[this.id].rmb+=pack.coins;
                // 	g_db.p.withdraw.update({from:this.id}, {$set:{rmb:withdrawCache[this.id].rmb}}, function() {
                // 		self.coins-=pack.coins;
                // 		self.send({c:'withdraw.ok'});
                // 	});
                // }
                break;
            case 'bindCreditCard':
                this.bank = pack.bank;
                break;
            case 'withdrawList':
                if (!this.dbuser.isAdmin) return;
                var now = new Date();
                if (now - withdrawListInMem.time <= (10 * 60 * 1000)) return this.send({ c: 'withdrawList', data: withdrawListInMem.data });
                g_db.p.withdraw.find({ exported: false }, {}, {
                    sort: [
                        ['_t', 'desc']
                    ]
                }).toArray(function(err, r) {
                    if (err) return self.senderr(err);
                    withdrawListInMem.data = r;
                    withdrawListInMem.time = now;
                    self.send({ c: 'withdrawList', data: withdrawListInMem.data });
                });
                break;
            case 'createServer':
                // if (!this.dbuser.isAdmin) return;
                var tbl = tables.availble(pack.roomtype, pack.opt);
                if (!tbl) return this.err('创建房间失败');
                pack.opt._id = tbl.roomid;
                g_db.p.servers.insertOne(pack.opt);
                this.send({ c: 'createServer', id: tbl.roomid });
                break;
            case 'closeServer':
                if (!this.dbuser.isAdmin) return;
                tables.remove(pack.roomid);
                g_db.p.servers.deleteOne({ _id: pack.roomid });
                break;
            case 'waterbill':
                async.parallel([
                        function(cb) {
                            g_db.p.withdraw.find({ from: self.id }).limit(20).toArray(cb);
                        },
                        function(cb) {
                            g_db.p.bills.find({ user: self.id }).limit(20).toArray(cb);
                        }
                    ],
                    function(err, r) {
                        if (err) return self.err(err);
                        var rechargeList = r[1],
                            withdrawList = r[0];
                        var final = [];
                        for (var i = 0; i < rechargeList.length; i++) {
                            final.push({ time: rechargeList[i].time, rmb: rechargeList[i].pack.rmb, type: '存入' });
                        }
                        for (var i = 0; i < withdrawList.length; i++) {
                            final.push({ time: withdrawList[i]._t, rmb: withdrawList[i].rmb, type: '取出' });
                        }
                        final.sort(function(a, b) { return b.time - a.time });
                        self.send({ c: 'waterbill', data: final.slice(0, 20) });
                    });
                break;
            case 'safe.deposit':
                if (self.coins < pack.coins) return self.senderr('现金不足');
                self.savedMoney += pack.coins;
                self.coins -= pack.coins;
                break;
            case 'safe.withdraw':
                if (self.savedMoney < pack.coins) return self.senderr('保险箱中没有那么多资金');
                self.savedMoney -= pack.coins;
                self.coins += pack.coins;
                break;
            case 'verifypwd':
                if (pack.pwd == this.dbuser.pwd) return self.send({ c: 'verifypwd.ok' });
                self.senderr('密码错误');
                break;
            case 'set':
                if (self.dbuser[pack.type]) {
                    self[pack.type] = pack.v;
                }
                break;
            case 'resetpwd':
                if (self.dbuser.pwd != pack.old) return self.senderr('原始密码不正确');
                self.dbuser.pwd = pack.new;
                break;
            case 'personhis':
                getDB(function(err, db) {
                    if (err) return self.senderr(err);
                    db.games.find({ user: self.id }).sort({ t: -1 }).limit(20).toArray(function(err, r) {
                        if (err) return self.senderr(err);
                        /*
                         r={user:string, 
                        	 deal:{zhuang:number,xian:number,he:number,xianDui:number, zhuangDui:number}, 
                        	 r:{win:'player'|'banker'|'tie', playerPair:boolean, bankerPair:boolean, playerCard:[PlayingCard], bankerCard:[PlayingCard]},
                        	 oldCoins:number, 
                        	 newCoins:number, 
                        	 t:Date
                        	}
                        */
                        self.send({ c: 'personhis', data: r });
                    });
                })
                break;
            case 'GMshengqing':
                var now = new Date();
                var obj = this.dbuser;
                if (obj.credit) {
                    if (obj.hasOwnProperty('getCreditCoins')) {
                        if ((obj.credit - obj.getCreditCoins) > pack.money) {
                            obj.coins += +pack.money;
                            obj.getCreditCoins += +pack.money
                            obj.shenqinglist.push({ money: +pack.money, time: now })
                            this.send({ user: { coins: obj.coins, getCreditCoins: obj.getCreditCoins, shenqinglist: obj.shenqinglist } })
                        } else {
                            this.senderr('信用值不足');
                        }
                    } else {
                        obj.getCreditCoins = +pack.money;
                        obj.coins += +pack.money;
                        obj.shenqinglist = [];
                        obj.shenqinglist.push({ money: +pack.money, time: now })
                        this.send({ user: { coins: obj.coins, getCreditCoins: obj.getCreditCoins, shenqinglist: obj.shenqinglist } })
                    }
                }
                break;
            case 'GMgetinfo':
                var self = this;
                g_db.p.users.find({ showId: +pack.id }).limit(1).toArray(function(e, r) {
                    if (!r[0]) return self.senderr('没有这个用户')
                        // console.log(r[0])
                    self.send({ c: 'GMgetinfo', info: { coins: r[0].coins, name: r[0].nickname, sid: r[0].showId } })
                })
                break;
            default:
                var isprocessed = this.emit(pack.c, pack, this);
                if (this.table) isprocessed = this.table.msg(pack, this) || isprocessed;
                if (!isprocessed) this.emit('ans', pack, this);
                //if ((!this.table || !this.table.msg(pack, this)) && !isprocessed) this.ws.sendp({err:'unknown cmd', pack:pack});

                break;
        }
    }
};
var listboard = { coins: { b: [], time: 0 }, diamond: { b: [], time: 0 }, tickets: { b: [], time: 0 }, reward: { b: [], time: 0 }, win: { b: [], time: 0 } };
var withdrawListInMem = { time: 0 };
var withdrawCache = {}; // not usable yet

module.exports = User;