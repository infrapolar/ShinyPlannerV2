(function (a, b, c, d, e, f) {
    function k(a) {
        var b, c = a.length, e = this, f = 0, g = e.i = e.j = 0, h = e.S = [];
        for (c || (a = [c++]); d > f;) h[f] = f++;
        for (f = 0; d > f; f++) h[f] = h[g = j & g + a[f % c] + (b = h[f])], h[g] = b;
        (e.g = function (a) {
            for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--;) b = h[f = j & f + 1], c = c * d + h[j & (h[f] = h[g = j & g + b]) + (h[g] = b)];
            return e.i = f, e.j = g, c
        })(d)
    }

    function l(a, b) {
        var e, c = [], d = (typeof a)[0];
        if (b && "o" == d) for (e in a) try {
            c.push(l(a[e], b - 1))
        } catch (f) {
        }
        return c.length ? c : "s" == d ? a : a + "\0"
    }

    function m(a, b) {
        for (var d, c = a + "", e = 0; c.length > e;) b[j & e] = j & (d ^= 19 * b[j & e]) + c.charCodeAt(e++);
        return o(b)
    }

    function n(c) {
        try {
            return a.crypto.getRandomValues(c = new Uint8Array(d)), o(c)
        } catch (e) {
            return [+new Date, a, a.navigator.plugins, a.screen, o(b)]
        }
    }

    function o(a) {
        return String.fromCharCode.apply(0, a)
    }

    var g = c.pow(d, e), h = c.pow(2, f), i = 2 * h, j = d - 1;
    c.seedrandom = function (a, f) {
        var j = [], p = m(l(f ? [a, o(b)] : 0 in arguments ? a : n(), 3), j), q = new k(j);
        return m(o(q.S), b), c.random = function () {
            for (var a = q.g(e), b = g, c = 0; h > a;) a = (a + c) * d, b *= d, c = q.g(1);
            for (; a >= i;) a /= 2, b /= 2, c >>>= 1;
            return (a + c) / b
        }, p
    }, m(c.random(), b)
})(this, [], Math, 256, 6, 52);

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

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
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

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

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

} //copied from FtHoFPlanner

var Planner = {
    spellCountCut: 100000,
    totalSpellCount: 0,
    seed: "aaaaa",
    JustResurrect(){

        let lastSuccess = -1
        let failChance = 0.15
        for (let i = this.totalSpellCount; i < this.totalSpellCount+this.spellCountCut; i++){
            Math.seedrandom(this.seed + '/' + i)
            let successSeed = Math.random()
            let wrinklerSeed = Math.random()

            if (wrinklerSeed < 0.0001){
                if (successSeed < 1-failChance)
                    return `1) Cast Resurrect Abomination at cast ${i+1}\n`
                    if (successSeed < 1-(failChance*0.1) && lastSuccess != -1)
                        return `1) Cast Diminish Ineptitude at cast ${lastSuccess+1}\n2) Cast Resurrect Abomination at cast ${i+1}\n`

            }
            if (successSeed < 1-failChance){
                lastSuccess = i
            }

        }
        return "no shiny found in 100000 casts"
    }
}
function ReadSave(save) {
    save = save.split('!END!')[0];
    save = Base64.decode(save)
    save = save.split('|')
    let seed = save[2].split(';')[4]
    let totalSpellCount = save[5].split(';')[7].split(' ')[2]
    return [seed, totalSpellCount]
}
const saveinput = document.getElementById("save")
const spellscastinput = document.getElementById("spells")
const seedinput = document.getElementById("seed")
const output = document.getElementById("output")
function getnextshiny(){
    if (saveinput.value != ''){
        let result = ReadSave(saveinput.value)
        seedinput.value = result[0]
        spellscastinput.value = result[1]
    }
    Planner.seed = seedinput.value;
    Planner.totalSpellCount = Number(spellscastinput.value);
    output.innerHTML = Planner.JustResurrect();
    return;
}
