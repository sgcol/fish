/*
URL编码规则：
签名验证时，要求对字符串中除了“-”、“_”、“.”之外的所有非字母数字字符都替换成百分号(%)后跟两位十六进制数。
十六进制数中字母必须为大写。
*/
function _ToHexString(s) {
    var buf = new Buffer(s, "utf8");
    var arr = [];
    var conv = function (c) {
        var s = c.toString(16).toUpperCase();
        if (s.length < 2)
            s = "0" + s;
        return "%" + s;
    };
    for (var i = 0; i < buf.length; ++i) {
        arr.push(conv(buf[i]));
    }
    return arr.join("");
}

var notConvertChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_.";
var notConvertMap = {};
(function () {
    for (var i = 0; i < notConvertChars.length; ++i) {
        notConvertMap[notConvertChars.charAt(i)] = true;
    }
})();

function _isConvertChar(c) {
    return !(c in notConvertMap);
}

function urlencode(s) {
    var s2 = "";
    for (var i = 0; i < s.length; ++i) {
        var c = s.charAt(i);
        if (_isConvertChar(c)) {
            s2 += _ToHexString(c);
        } else {
            s2 += c;
        }
    }
    return s2;
}
if (require.main === module) {
    console.log("test urlencode");
    var assert = require("assert");

    var s1 = "appid=123456&format=json&openid=11111111111111111&openkey=2222222222222222&pf=qzone&userip=112.90.139.30";
    var s2 = "appid%3D123456%26format%3Djson%26openid%3D11111111111111111%26openkey%3D2222222222222222%26pf%3Dqzone%26userip%3D112.90.139.30";

    //console.log(urlencode(s1));
    //console.log(s2);
    assert.equal(urlencode(s1), s2);
}
module.exports = urlencode;
//# sourceMappingURL=urlencode.js.map
