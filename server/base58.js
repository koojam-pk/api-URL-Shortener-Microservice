const alphabet = "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length; // base is the length of the alphabet (58 in this case)

function encode(num) {
    // utility to convert base 10 integer to base 58 string
    var encoded = '';
    while(num) {
        var remainder =  num % base;
        num = Math.floor(num / base);
        encoded = alphabet[remainder].toString() + encoded;
    }
    return encoded;
}

function decode(str) {
    // utility to convert base 58 integer to base 10 string
    var decoded = 0;
    while(str) {
        var index = alphabet.indexOf(str[0]);
        var power = str.length - 1;
        decoded += index * (Math.pow(base, power));
        str = str.substring(1);
    }
    return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode; 