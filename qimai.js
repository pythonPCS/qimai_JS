
function btoa(input) {
    const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    while (i < input.length) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
}

function encryptA(str) {
    var temp = Array.prototype.map.call(str, function (c) {
        return c.charCodeAt(0);
    });
    return btoa(temp);
}

function encrypyB(a) {
    var e = "00000008d78d46a";
    a = a.split("");
    for (var n = a.length, t = e.length, o = ["c", "h", "a", "r", "C", "o", "d", "e", "A", "t"].join(""), s = 0; s < n; s++)
        a[s] = String.fromCharCode(a[s][o](0) ^ e[s % t][o](0));
    return a.join("")
}

function qimaiEncrypt(url, params){
    var data = Object.keys(params);
    var temp = [];
    data.forEach(function(key){
        temp.push(params[key]);
    });
    console.log(temp.sort().join(''));
    data = encryptA(temp.sort().join(''));
    console.log(data);
    data += "@#" + url;
    data += "@#" + (new Date() - (Math.floor(1000 + Math.random()*1000)) - 1515125653845);
    data += "@#1";
    console.log(data);
    return encryptA(encrypyB(data));
}

url = '/rank/index';   // 链接名称
params = {             // 可变参数
    "brand": "free",
    "country": "cn",
    "date": "2019-05-08",
    "genre": "5000",
    "device": "iphone",
    "is_rank_index": 1,
    "page": 2
};

t = qimaiEncrypt(url, params);
console.log(t);