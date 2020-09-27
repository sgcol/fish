'use strict';
var TableBase = require('./tablebase.js'),
    onlines = require('../online.js');
var async = require('async'), merge = require('gy-merge'), clone = require('clone'), color = require('colors'), printf = require('printf');
var debugout = require('debugout')(require('yargs').argv.debugout);
var _ = require('lodash');
var fishes = require('./ways.js')
var REWARD = require('../reward.js')
var getDB = require('../db.js'),
    g_db = null;
getDB(function(err, db) {
    if (!err) g_db = db;
});
// var initSrvStat=require('../servers.js'),srv_state={};
// initSrvStat(function(err, s) {
// 	if (!err) srv_state=s;
// })

function shortenCoinStr(n) {
    if (n > 100000000) return g(printf('%.2f', n / 100000000)) + '亿';
    if (n > 10000) return g(printf('%.2f', n / 10000)) + '万';
    return n;
}

function getNumberInNormalDistribution(mean, std_dev) {
    return mean + (uniform2NormalDistribution() * std_dev);
}

function uniform2NormalDistribution() {
    var sum = 0.0;
    for (var i = 0; i < 12; i++) {
        sum = sum + Math.random();
    }
    return sum - 6.0;
}

const GAME_STATUS = {
    KAIJU: 1,
    FAPAI: 2,
    QIEPAI: 0,
};

const FIELD_MAX_X = 90;
const FIELD_MAX_Y = 50;
const FISHTIDE_TYPE_NUM = 5;
const PROBILITY_OF_CREATE_FISH = 0.06;
const VIP = [1, 1.5, 1.5, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

const GAMETYPE = {
    'chu': {
        bulletType: { 10: true, 50: true, 90: true },
        fishFilter: [1, 2, 5],
        name: '幸运浅滩'
    },
    'zhong': {
        bulletType: { 100: true, 500: true, 1000: true, 5000: true, 9900: true },
        fishFilter: [10],
        name: '近海奇珍'

    },
    'gao': {
        bulletType: { 1000: true, 5000: true, 10000: true, 50000: true, 90000: true },
        fishFilter: [20, 50],
        name: '深海夺宝'

    }
}

const BIGFISH = ['zhadan', 'chuitouyu', 'chuitouyu2'];
const FISHNAME = { 'zhadan': '全屏炸弹', 'chuitouyu': '金龙', 'chuitouyu2': '银龙' };
var choushui = Math.random() * 0.02 + 0.03;

//圆，，交错椭圆 , 八方    ||||，交错，纵横
const FISHTIDE = {
    1: {
        count: 30,
        leng: 30,
        fish: [
            ['dinianyu'],
            ['tianshiyu']
        ]
    },
    2: {
        count: 15,
        fish: [
            ['xiaochouyu', 'dinianyu']
        ]
    },
    3: {
        count: 8,
        fish: [
            ['tianshiyu'],
            ['hetun'],
            ['dianmanyu'],
            ['fangyu'],
            ['chuitouyu2'],
            ['chuitouyu']
        ]
    },
    4: {
        count: 5,
        fish: [
            ['shayu', 'bianfuyu', 'shayu', 'bianfuyu'],
            ['jianyu', 'denglongyu', 'jianyu', 'denglongyu'],
            ['hama2', 'hama', 'chuitouyu2', 'chuitouyu']
        ]
    },
    5: {
        count: 12,
        fish: [
            ['hama', 'chuitouyu', 'hama2', 'chuitouyu2']
        ],
        fish2: 'xiaohuangyu'
    },
}

function addOff(arr, offX, offY) {
    var ret = [];
    arr.forEach(function(ele) {
        ret.push({ x: Number(ele.x) + Number(offX), y: Number(ele.y) + Number(offY) });
    })
    return ret;
}

function filter(element, index, array) {
    for (var z = 0; z < this[0]['fishFilter'].length; z++) {
        if (element.fish == this[0]['fishFilter'][z]) {
            // console.log(array[index])
            delete array[index]
        }
    }
}


function normalizeData(fishDef) {
    var prob = 0;
    for (var f in fishDef) {
        if (f == 'def') continue;
        if (!fishDef[f].probility) {
            console.log(printf('%s, 没有定义probility，这条鱼被删除', f).red);
            delete fishDef[f];
            continue;
        }

        prob += fishDef[f].probility;
    }
    var ret = [],
        last_p = 0;
    for (var f in fishDef) {
        if (f == 'def') continue;
        var fish = fishDef[f];
        var r = PROBILITY_OF_CREATE_FISH * (fishDef[f].probility / prob);
        var isGroup;
        var Magnification;
        if (f.indexOf('z-') == 0) {
            f = f.substr(2);
            isGroup = true;
        }

        var o = { probility: { min: last_p, max: last_p + r }, fish: f, ways: [], poses: [], isGroup: isGroup, Magnification: 1, zuyu: false };
        for (var k in fish) {
            if (k.indexOf('way') == 0) {
                o.ways.push(fish[k]);
            }
        }
        for (var k in fish) {
            if (k.indexOf('Mag') == 0) {
                o.Magnification = fish[k]
            }
        }
        for (var k in fish) {
            if (k.indexOf('pos') == 0) {
                o.poses.push(fish[k]);
                // 对鱼, 不是有光圈的，那个叫组鱼
                var w = +k.substr(3) - 1;
                o.group == null && (o.group = []);
                var groupways = [];
                var orgP = o.ways[w][0];
                for (var p = 0; p < fish[k].length; p++) {
                    var offP = fish[k][p],
                        offX = orgP.x - offP.x,
                        offY = orgP.y - offP.y;
                    groupways.push(addOff(o.ways[w], offX, offY));
                }
                o.group.push(groupways);
            }
            if (k == 'zhengzhu') {
                o.zuyu = true;
            }
        }
        if (f == 'xiaohuangyu') debugout('xiaohuangyu', o.group);
        ret.push(o);
        last_p += r;
    }
    // debugout('fishway', ret);
    return ret;
};
class FishServer extends TableBase {
    constructor(roomid, type, opt) {
        super(roomid, type, opt);
        this.roomid = roomid;
        this.profits = [];
        this.profits.sum = 0;
        this.roomtype = 'fish';
        this.gamedata.opt = GAMETYPE[opt.type];
        // f.forEach(filter, [this.gamedata.opt])
        // console.log(GAMETYPE[opt.type].fishFilter)
        // delete fishes[GAMETYPE[opt.type].fishFilter[0]]
        // delete fishes[GAMETYPE[opt.type].fishFilter[1]]
        this.fishDef = normalizeData(fishes)
            // this.gamedata.opt = merge({ bulletType: { 10: true, 50: true, 90: true } }, opt);
        this.opt = this.gamedata.opt;
        this.gamedata.roomid = roomid;
        this.gamedata.his = [];
        this.gamedata.seats = new Array(4);
        var self = this;
        this.startTime = new Date();
        this.fishID = 0;
        this.zuID = 0;
        this.aliveFish = {};
        this.step = [];
        this.writeTime = 1;
        setInterval(this.onStep.bind(this), 1000 / 15);
    }
    mk_transfer_gamedata(obj, idx) {
        // 简化user对象，只传输id nickname face level score
        // console.log(this);
        var self = this;
        if (!obj.seats) return { scene: obj };
        var sobj = {};
        for (var key in obj) {
            if (key == 'seats') {
                sobj[key] = new Array(4);
                for (var i in obj[key]) {
                    var seat = this.scene.seats[i];
                    if (!seat) continue;
                    var u = seat.user;
                    if (u) {
                        console.log(sobj.seats[i])
                        sobj.seats[i] = {};
                        sobj.seats[i].user = { id: u.id, nickname: u.nickname, face: u.dbuser.face, coin: u.coins, level: u.level, offline: seat.offline, showId: u.showId };
                    }
                }
            } else {
                sobj[key] = obj[key];
            }
        }
        return { scene: sobj };
    }
    onStep() {
        var now = new Date();
        var s = [];
        var updseats = {};
        for (var i = 0, l = this.step.length; i < l; i++) {
            var pack = this.step[i];
            if (pack.c == 'chgSeat') {
                if (this.gamedata.seats[pack.l]) {
                    this.gamedata.seats[pack.n] = this.gamedata.seats[pack.l];
                    delete this.gamedata.seats[pack.l];
                }
                if (this.scene.seats[pack.l]) {
                    this.scene.seats[pack.n] = this.scene.seats[pack.l];
                    delete this.scene.seats[pack.l];
                }
                s.push({ c: pack.c, user: { id: pack.comesfrom.id, level: pack.comesfrom.level, coin: pack.comesfrom.coins, nickname: pack.comesfrom.nickname }, n: pack.n, l: pack.l });
            }
            if (pack.c == 'table.fire') {
                debugout('ack fire', pack.coin, pack.seat, now.toTimeString());
                if (pack.coin > pack.comesfrom.coins)
                    pack.comesfrom.senderr('钱不够了')
                pack.comesfrom.coins -= pack.coin;
                pack.comesfrom.exp += pack.coin;
                updseats[pack.seat] = this.gamedata.seats[pack.seat];
                s.push({ c: pack.c, id: pack.comesfrom.id, rotation: pack.direction });
            }
            if (pack.c == 'table.hit') {
                var hited = false;
                var fish = this.aliveFish[pack.fishId];
                if (fish) {
                    var hitp = Math.random()
                    if (hitp <= fish.kp) {
                        hited = true
                    }
                    if (hited) {
                        /////////   特殊玩法
                        var energy = Math.random(),
                            energyPao = false;;
                        if (energy < 0.02) {
                            energyPao = true;
                            pack.comesfrom.energyPao = true;
                            setTimeout(function() {
                                pack.comesfrom.energyPao = false;
                            }, 15000)
                        }
                        if (pack.comesfrom.energyPao) {
                            pack.coin = 2 * pack.coin;
                        }
                        var delta = 0,
                            kill = 1;
                        if (pack.te == 1) {
                            for (var x = 0; x < 9; x++) {
                                if (this.aliveFish[(pack.fishId - 4 + x)]) {
                                    if (this.aliveFish[(pack.fishId - 4 + x)].zuyu) {
                                        delete this.aliveFish[(pack.fishId - 4 + x)];
                                        kill++;
                                        var money = pack.coin * fish.Magnification;
                                        delta += money;
                                        s.push({ c: pack.c, getcoin: money, id: pack.comesfrom.id, fishId: (pack.fishId - 4 + x) });
                                    }
                                }
                            }
                        };
                        if (pack.te == 2) {
                            var x = this.fishID - 50;
                            if (x < 0) x = 0;
                            for (x; x < this.fishID + 50; x++) {
                                if (this.aliveFish[x]) {
                                    if (this.aliveFish[x].fish == pack.fishName) {
                                        delete this.aliveFish[x];
                                        kill++;
                                        var money = pack.coin * fish.Magnification;
                                        delta += money;
                                        s.push({ c: pack.c, getcoin: money, id: pack.comesfrom.id, fishId: x });
                                    }
                                }
                            }
                        };

                        if (fish.fish == 'ding') {
                            s.push({ c: pack.c, getcoin: 0, id: pack.comesfrom.id, fishId: pack.fishId, ding: true });
                        }
                        if (fish.fish == 'zhadan') {
                            s.push({ c: pack.c, getcoin: 0, id: pack.comesfrom.id, fishId: pack.fishId, zhadan: true });
                            var x = this.fishID - 50;
                            if (x < 0) x = 0;
                            for (x; x < this.fishID + 50; x++) {
                                if (this.aliveFish[x]) {
                                    kill++;
                                    var money = pack.coin * this.aliveFish[x].Magnification;
                                    delta += money;
                                    delete this.aliveFish[x];
                                    s.push({ c: pack.c, getcoin: money, id: pack.comesfrom.id, fishId: x });
                                }
                            }
                        }
                        if (fish.fish.indexOf('jiang') == 0) {
                            var tieckt = +fish.fish.substr(9);
                            // console.log(tieckt)
                            pack.comesfrom.tickets += tieckt;
                            s.push({ c: pack.c, getticket: tieckt, id: pack.comesfrom.id, fishId: pack.fishId, getcoin: 0 });
                        }
                        //悬赏
                        if (pack.comesfrom.rewardBoard) {
                            for (var x = 0; x < 3; x++) {
                                if (fish.fish == pack.comesfrom.rewardBoard[x].name) {
                                    pack.comesfrom.rewardBoard[x].jishu++;
                                }
                            }
                            if (pack.comesfrom.rewardBoard[0].jishu >= pack.comesfrom.rewardBoard[0].number && pack.comesfrom.rewardBoard[1].jishu >= pack.comesfrom.rewardBoard[1].number && pack.comesfrom.rewardBoard[2].jishu >= pack.comesfrom.rewardBoard[2].number && pack.comesfrom.rewardTimes <= 10) {
                                pack.comesfrom.coins += pack.comesfrom.rewardBoard.coins * VIP[pack.comesfrom.vipLv];
                                pack.comesfrom.rewardTimes++;
                                pack.comesfrom.send({ c: 'reward', coins: pack.comesfrom.rewardBoard.coins, times: pack.comesfrom.rewardTimes })
                                pack.comesfrom.reward += pack.comesfrom.rewardBoard.coins;
                                comesfrom.dbuser.rewardType = 0;
                            }
                        }

                        delta += pack.coin * fish.Magnification;
                        pack.comesfrom.coins += delta;
                        pack.comesfrom.dailyGetCoin += delta;
                        pack.comesfrom.dailyGetFishes += kill;
                        if (BIGFISH.indexOf(fish.fish) >= 0) {
                            var all = onlines.all;
                            var _s = printf('恭喜%s在%s区击中了%s，获得%d金币', pack.comesfrom.nickname, this.gamedata.opt.name, FISHNAME[fish.fish], delta);
                            console.log(_s)
                            for (var i = 0, l = all.length; i < l; i++) {
                                var u = onlines.get(all[i]);
                                if (u.offline) continue;
                                u.send({ c: 'announce', s: _s });
                            }
                        }
                        delete this.aliveFish[pack.fishId];
                        updseats[pack.seat] = this.gamedata.seats[pack.seat];
                        s.push({ c: pack.c, getcoin: delta, id: pack.comesfrom.id, fishId: pack.fishId, energy: energyPao });
                    }
                }

            }
        }

        // create fish
        var factor = Math.random();
        if (factor <= PROBILITY_OF_CREATE_FISH) {
            var idx = this.fishDef.findIndex(function(ele) {
                return (factor <= ele.probility.max) && (factor > ele.probility.min);
            });
            if (idx >= 0) {
                // create this fish
                var fish = this.fishDef[idx];
                debugout('find fish', fish.fish, fish.group ? fish.group[0].length : 1);
                if (fish.group == null) {
                    var cmd = { c: 'fish' },
                        _w = Math.floor(Math.random() * fish.ways.length);

                    var firstpos = fish.ways[_w][0],
                        offX = 0,
                        offY = 0;
                    // console.log(firstpos, _w)
                    if (firstpos.x < 90 && firstpos.x > -90) {
                        if (firstpos.y > 0) {
                            offX -= getNumberInNormalDistribution(0, 8);
                        } else {
                            offX += getNumberInNormalDistribution(0, 8);
                        }
                    } else {
                        // if (firstpos.y > 50 && firstpos.y < -50) {
                        if (firstpos.x > 0) {
                            offY -= getNumberInNormalDistribution(0, 14);
                        } else {
                            offY += getNumberInNormalDistribution(0, 14);
                        }
                        // }
                    }
                    var yzhi = Math.floor(Math.random() * 34) - 14;
                    _w += 1;
                    if (fish.fish == 'zhadan' || fish.fish == 'ding' || fish.fish == 'jiangquan') {
                        var fname = fish.fish;
                        if (fish.fish == 'jiangquan') {
                            var num = Math.floor(Math.random() * this.gamedata.opt.fishFilter.length);
                            fname = fish.fish + this.gamedata.opt.fishFilter[num];
                            this.aliveFish[this.fishID] = { fish: fname, id: this.fishID, way: _w, Magnification: 0, kp: 0.007, ct: Date.parse(now) };
                        } else if (fish.fish == 'ding') {
                            this.aliveFish[this.fishID] = { fish: fname, id: this.fishID, way: _w, Magnification: 0, kp: 0.005, ct: Date.parse(now) };
                        } else {
                            var allMag = 50;
                            var x = this.fishID - 50;
                            if (x < 0) x = 0;
                            for (x; x < this.fishID + 50; x++) {
                                if (this.aliveFish[x]) {
                                    allMag += this.aliveFish[x].Magnification;
                                }
                            }
                            this.aliveFish[this.fishID] = { fish: fname, id: this.fishID, way: _w, Magnification: 0, kp: (1 - choushui) / allMag, ct: Date.parse(now) };
                            // console.log((1 - choushui) / allMag)
                        }
                        cmd.value = { fish: fname, way: _w, id: this.fishID, offx: 0, offy: 0, yzhi: 0 };
                    } else {
                        this.aliveFish[this.fishID] = { fish: fish.fish, id: this.fishID, way: _w, Magnification: fish.Magnification, kp: (1 - choushui) / fish.Magnification, ct: Date.parse(now) };
                        cmd.value = { fish: fish.fish, way: _w, id: this.fishID, offx: offX, offy: offY, yzhi: yzhi };
                    }
                    this.fishID++;
                    if (this.fishID >= Number.MAX_SAFE_INTEGER) this.fishID = 0;
                    s.push(cmd);
                } else {
                    var _g = Math.floor(Math.random() * fish.group.length);
                    var zuyubool = false;
                    var chuqi = false;
                    var firstpos = fish.group[_g][0][0],
                        offX = 0,
                        offY = 0;
                    // console.log(firstpos, _g)
                    if (firstpos.x < 90 && firstpos.x > -90) {
                        if (firstpos.y > 0) {
                            offX -= getNumberInNormalDistribution(0, 8);
                        } else {
                            offX += getNumberInNormalDistribution(0, 8);
                        }
                    } else {
                        // if (firstpos.y > 50 || firstpos.y < -50) {
                        if (firstpos.x > 0) {
                            offY -= getNumberInNormalDistribution(0, 14);
                        } else {
                            offY += getNumberInNormalDistribution(0, 14);
                        }
                        // }
                    }
                    var yzhi = Math.floor(Math.random() * 34) - 14;


                    if (fish.zuyu) {
                        zuyubool = (Math.random() - 0.03) > 0 ? false : true;
                        chuqi = (Math.random() - 0.02) > 0 ? false : true;
                    }
                    var cmd = { c: 'fish' };
                    cmd.value = { fish: fish.fish, way: _g + 1, id: this.fishID, zuyu: zuyubool, chuqi: chuqi, offx: offX, offy: offY, yzhi: yzhi };
                    s.push(cmd);
                    var killp = (1 - choushui) / fish.Magnification;
                    if (zuyubool) {
                        killp /= fish.group[_g].length;
                    }

                    for (var i = 0; i < fish.group[_g].length; i++) {
                        if (chuqi) {
                            killp /= 10;
                            chuqi = false;
                        }
                        this.aliveFish[this.fishID] = { fish: fish.fish, zuyu: zuyubool, id: this.fishID, way: _g + 1, Magnification: fish.Magnification, kp: killp, ct: Date.parse(now) };
                        this.fishID++;
                        if (this.fishID >= Number.MAX_SAFE_INTEGER) this.fishID = 0;
                    }
                }
            }
        }
        // chk alive fish
        var ellapse = now - this.startTime;
        if ((ellapse / (60 * 1000)) >= this.writeTime) {
            // console.log('11', this.writeTime)
            this.writeTime++;
            var allfishIDs = Object.keys(this.aliveFish);
            for (var i = 0, l = allfishIDs.length; i < l; i++) {
                var f = this.aliveFish[allfishIDs[i]];
                if ((Date.parse(now) - f.ct) >= (100 * 1000)) {
                    delete this.aliveFish[allfishIDs[i]];
                }
            }
            // chk fish tide
            var allfishIDs = Object.keys(this.aliveFish);
            for (var i = 0, l = allfishIDs.length; i < l; i++) {
                var f = this.aliveFish[allfishIDs[i]];
                if ((Date.parse(now) - f.ct) >= (30 * 1000)) {
                    delete this.aliveFish[allfishIDs[i]];
                }
            }

            if ((ellapse / (3 * 60 * 1000)) >= Math.ceil((this.writeTime - 1) / 3)) {
                // console.log('22')
                // var type = 4;
                var type = Math.floor(Math.random() * FISHTIDE_TYPE_NUM) + 1;
                var fishs = [];
                for (var y = 0; y < FISHTIDE[type]['fish'].length; y++) {
                    var fishe = [];
                    for (var x = 0; x < FISHTIDE[type].count; x++) {

                        var idx0 = this.fishDef.findIndex(function(ele) {
                            return FISHTIDE[type]['fish'][y][0] == ele.fish;
                        });
                        var idx1 = this.fishDef.findIndex(function(ele) {
                            return FISHTIDE[type]['fish'][y][1] == ele.fish;
                        });
                        var idx2 = this.fishDef.findIndex(function(ele) {
                            return FISHTIDE[type]['fish'][y][2] == ele.fish;
                        });
                        var idx3 = this.fishDef.findIndex(function(ele) {
                            return FISHTIDE[type]['fish'][y][3] == ele.fish;
                        });
                        for (var z = 0; z < FISHTIDE[type]['fish'][y].length; z++) {
                            var fish = this.fishDef[eval('idx' + z)]
                            this.aliveFish[this.fishID] = { fish: fish.fish, id: this.fishID, Magnification: fish.Magnification, kp: (1 - choushui) / fish.Magnification, ct: Date.parse(now) };
                            fishe.push(this.fishID);
                            this.fishID++;
                        }
                    }
                    fishs.push({ name: FISHTIDE[type]['fish'][y], fish: fishe })
                    if (FISHTIDE[type]['fish2']) {
                        fishs.push({ fish2: FISHTIDE[type]['fish2'] })
                    }
                }
                s.push({ c: 'fishtide', type: type, fishs: fishs });
                //tide comes
            }
        }


        var allupdseatIdx = Object.keys(updseats);
        for (var i = 0, l = allupdseatIdx.length; i < l; i++) {
            var _s = updseats[allupdseatIdx[i]];
            if (_s) {
                updseats[allupdseatIdx[i]] = { user: { coins: _s.user.coins } };

            }
        }
        // debugout('step', s);
        this.broadcast({ c: 'step', d: s, gamedata: { seats: updseats } });
        this.step = [];
    }
    leave(user) {
        // this.broadcast({c:'table.userout', id:user.id});
        this.msgDispatcher.emit('userleave', user);
        this.quit(user);
    }
    msg(pack, comesfrom) {
        var self = this;
        switch (pack.c) {
            case 'table.fire':
                if (this.gamedata.opt.bulletType[pack.coin]) {
                    pack.comesfrom = comesfrom;
                    this.step.push(pack);
                }
                break;
            case 'table.hit':
                if (this.gamedata.opt.bulletType[pack.coin]) {
                    pack.comesfrom = comesfrom;
                    this.step.push(pack);
                }
                break;
            case 'table.chat':
                pack.nickname = comesfrom.nickname || comesfrom.id;
                if (comesfrom.dbuser.nochat > new Date()) return comesfrom.send(pack);
                this.broadcast(pack);
                break;
            case 'allfish':
                // pack.comesfrom = comesfrom;
                comesfrom.send({ c: 'allfish', d: this.aliveFish, now: Date.parse(new Date()) })
                break;
            case 'chgSeat':
                pack.comesfrom = comesfrom;
                this.step.push(pack);
                break;
            case "freward":
                var reType = 0
                if (comesfrom.dbuser.rewardType) {
                    reType = comesfrom.dbuser.rewardType;
                } else {
                    reType = Math.ceil(Math.random() * 10);
                }
                comesfrom.rewardBoard = {};
                comesfrom.rewardBoard['coins'] = REWARD.coins[reType];
                for (var x = 0; x < 3; x++) {
                    comesfrom.rewardBoard[x] = {};
                    comesfrom.rewardBoard[x]['name'] = REWARD.type[reType][x];
                    comesfrom.rewardBoard[x]['number'] = REWARD.number[reType][x];
                    comesfrom.rewardBoard[x]['jishu'] = 0;
                }
                comesfrom.send({ c: 'freward', type: reType })
                break;
        }
        return super.msg(pack, comesfrom);
    }
};

module.exports = FishServer;