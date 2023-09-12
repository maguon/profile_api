const crypto = require('crypto');

const base64Encode = (input) =>{
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=";
    var i = 0;
    input = utf8Encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
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
    if(output != null ){
        var l = output.length%4;
        if(l>0){
            for(;l<5;l++){
                output = output + '=';
            }
        }
    }
    return output;
}


const base64Decode = (input) =>{
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=";
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    output = utf8Decode(output);
    return output;
}

const utf8Encode = (string) => {
    string = string.replace(/\r\n/g,"\n");
    var encodeText = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            encodeText += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            encodeText += String.fromCharCode((c >> 6) | 192);
            encodeText += String.fromCharCode((c & 63) | 128);
        } else {
            encodeText += String.fromCharCode((c >> 12) | 224);
            encodeText += String.fromCharCode(((c >> 6) & 63) | 128);
            encodeText += String.fromCharCode((c & 63) | 128);
        }

    }
    return encodeText;
}

const utf8Decode = (encodeText) =>{
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while ( i < encodeText.length ) {
        c = encodeText.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if((c > 191) && (c < 224)) {
            c2 = encodeText.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = encodeText.charCodeAt(i+1);
            c3 = encodeText.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}

const getNumberRandomKey = (max,min) => {
    var Range = max - min;
    var Rand = Math.random();
    return(min + Math.round(Rand * Range));
}

const getSmsRandomKey = () =>{
    return getNumberRandomKey(9999,1000);
}

const getEntrustRandomKey = () => {
    return getNumberRandomKey(9999999999,1000000000);
}

const getSHA256Encode = (str) => {
    const hash = crypto.createHash('sha256').update(str).digest('hex');
    return hash;
}

const WXBizDataCrypt=(appId, sessionKey,encryptedData, iv)=>{
    // base64 decode
    sessionKey = Buffer.from(sessionKey, 'base64');
    encryptedData = Buffer.from(encryptedData, 'base64');
    iv = Buffer.from(iv, 'base64');
    let decoded;
    try {
        // 解密
        let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        decoded = decipher.update(encryptedData, 'binary', 'utf8');
        decoded += decipher.final('utf8');

        decoded = JSON.parse(decoded);

    } catch (err) {
        throw new Error('Illegal Buffer')
    }

    if (decoded.watermark.appid !== appId) {
        throw new Error(sysMsg.CUST_WECHAT_CHECK_IDENTITY);
    }
    return decoded;
}
module.exports = {
    base64Decode,
    base64Encode,
    getSmsRandomKey,
    getEntrustRandomKey  ,
    getSHA256Encode ,
    WXBizDataCrypt ,
};

