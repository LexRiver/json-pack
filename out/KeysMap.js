"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysMap = void 0;
/**
 * Store string keys and their short codes
 */
var KeysMap = /** @class */ (function () {
    function KeysMap() {
        this.codeByKey = new Map();
        this.nextIndex = 0;
    }
    KeysMap.prototype.has = function (key) {
        return this.codeByKey.has(key);
    };
    KeysMap.prototype.add = function (key) {
        if (this.has(key))
            throw new Error('already have key ' + key);
        this.codeByKey.set(key, this.nextIndex.toString(36));
        this.nextIndex++;
    };
    KeysMap.prototype.get = function (key) {
        return this.codeByKey.get(key);
    };
    KeysMap.prototype.toJsonString = function () {
        return JSON.stringify(__spread(this.codeByKey));
    };
    KeysMap.prototype.toArray = function () {
        return __spread(this.codeByKey);
    };
    return KeysMap;
}());
exports.KeysMap = KeysMap;
