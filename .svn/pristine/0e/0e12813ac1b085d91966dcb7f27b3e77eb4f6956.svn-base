//doc:http://wiki.open.qq.com/wiki/%E8%85%BE%E8%AE%AF%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%94%E7%94%A8%E7%AD%BE%E5%90%8D%E5%8F%82%E6%95%B0sig%E7%9A%84%E8%AF%B4%E6%98%8E#.E7.AD.BE.E5.90.8D.E7.94.9F.E6.88.90.E6.80.BB.E4.BD.93.E8.AF.B4.E6.98.8E
var crypto = require("crypto");
var urlencode = require("./urlencode");

//Step 1. 构造源串
function _createSourceString(method, uri, obj) {
    //第1步：将请求的URI路径进行URL编码，得到： %2Fv3%2Fuser%2Fget_info
    var step1 = urlencode(uri);

    //第2步：将除“sig”外的所有参数按key进行字典升序排列，排列结果为：appid，format，openid，openkey，pf，userip
    var keys = Object.keys(obj).sort();

    //第3步：将第2步中排序后的参数(key=value)用&拼接起来：
    var step2 = keys.map(function (key) {
        return key + "=" + obj[key];
    }).join("&");

    //然后进行URL编码
    var step3 = urlencode(step2);

    //第4步：将HTTP请求方式，第1步以及第3步中的到的字符串用&拼接起来，得到源串：
    return method + "&" + step1 + "&" + step3;
}

function createSig(appkey, method, uri, obj) {
    var ss = _createSourceString(method, uri, obj);
    var key = appkey + "&";
    var hmac = crypto.createHmac("sha1", key);
    hmac.update(ss);
    return hmac.digest("base64");
}


if (require.main == module) {
    console.log("test qq_sig");
    function test1() {
        var assert = require("assert");
        var appkey = "228bf094169a40a3bd188ba37ebe8723";
        var method = 'GET';
        var uri = "/v3/user/get_info";
        var obj = {
            openid: "11111111111111111",
            openkey: "2222222222222222",
            appid: "123456",
            pf: "qzone",
            format: "json",
            userip: "112.90.139.30"
        };
        var s1 = _createSourceString(method, uri, obj);
        var s2 = "GET&%2Fv3%2Fuser%2Fget_info&appid%3D123456%26format%3Djson%26openid%3D11111111111111111%26openkey%3D2222222222222222%26pf%3Dqzone%26userip%3D112.90.139.30";

        //console.log(s1);
        //console.log(s2);
        assert.equal(s1, s2);

        var s3 = createSig(appkey, method, uri, obj);
        var s4 = "FdJkiDYwMj5Aj1UG2RUPc83iokk=";

        assert.equal(s3, s4);
    }
    function test2() {
        var assert = require("assert");
        var appkey = "L6SofXtfJCCufkpr";
        var method = 'GET';
        var uri = "/v3/user/get_info";
        var obj = {
            openid: "B945ABAD65247F4E9CECC04A834879EA",
            openkey: "8398AD5E588780A8FEEA12C05CAD8D75",
            appid: "1101487272",
            pf: "qzone"
        };
        var s1 = _createSourceString(method, uri, obj);
        var s2 = "GET&%2Fv3%2Fuser%2Fget_info&appid%3D1101487272%26openid%3DB945ABAD65247F4E9CECC04A834879EA%26openkey%3D8398AD5E588780A8FEEA12C05CAD8D75%26pf%3Dqzone";

        //console.log(s1);
        //console.log(s2);
        assert.equal(s1, s2);

        var s3 = createSig(appkey, method, uri, obj);
        var s4 = "7fsRJQuq6VyPT9ldcbXH6dsfJ2A=";

        assert.equal(s3, s4);
    }
    test1();
    test2();
}
module.exports = createSig;
//# sourceMappingURL=qq_sig.js.map
