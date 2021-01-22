"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPack = void 0;
var KeysMap_1 = require("./KeysMap");
function isArray(x) {
    return Array.isArray(x);
}
function isObject(o) {
    //return o === Object(o) && Object.prototype.toString.call(o) !== '[object Array]'
    return o === Object(o) && Object.prototype.toString.call(o) === '[object Object]';
}
function isObjectWithKeys(o) {
    return isObject(o) && Object.keys(o).length > 0;
}
var JsonPack;
(function (JsonPack) {
    var header = 'JsonPack:';
    function pack(o) {
        var keys = new KeysMap_1.KeysMap();
        var result = packAny(o, keys);
        return header + JSON.stringify({
            keys: keys.toArray(),
            data: result
        });
    }
    JsonPack.pack = pack;
    function packAny(o, keys) {
        var e_1, _a;
        if (isArray(o)) {
            return o.map(function (x) { return packAny(x, keys); });
        }
        else if (isObjectWithKeys(o)) {
            //return packObject(o, keys)
            var result = {};
            try {
                for (var _b = __values(Object.keys(o)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    if (!keys.has(key)) {
                        keys.add(key);
                    }
                    var newKey = keys.get(key);
                    if (newKey !== undefined) {
                        result[newKey] = packAny(o[key], keys);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        }
        return o;
    }
    function unpack(packedString) {
        var e_2, _a;
        if (!packedString.startsWith(header))
            throw new Error('not a pack! ');
        var jsonString = packedString.substr(header.length);
        var x = JSON.parse(jsonString);
        if (!x.keys)
            throw new Error('no keys!');
        if (!x.data)
            throw new Error('no data!');
        // so x.keys is array of arrays
        var keyByCode = new Map();
        try {
            for (var _b = __values(x.keys), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
                keyByCode.set(v, k);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return unpackAny(x.data, keyByCode);
    }
    JsonPack.unpack = unpack;
    function unpackAny(o, keyByCode) {
        var e_3, _a;
        if (isArray(o)) {
            return o.map(function (x) { return unpackAny(x, keyByCode); });
        }
        else if (isObjectWithKeys(o)) {
            var result = {};
            try {
                for (var _b = __values(Object.keys(o)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    var newKey = keyByCode.get(key);
                    if (newKey !== undefined) {
                        result[newKey] = unpackAny(o[key], keyByCode);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return result;
        }
        return o;
    }
})(JsonPack = exports.JsonPack || (exports.JsonPack = {}));
