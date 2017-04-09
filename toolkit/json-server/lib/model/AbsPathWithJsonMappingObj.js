/**
 * Created by liliwen on 2017/4/9.
 */
'use strict';

function AbsPathWithJsonMappingObj(absPath, json) {
    this._absPath = absPath;
    this._json = json;
}
AbsPathWithJsonMappingObj.prototype = {
    setAbsPath(absPath) {
        this._absPath = absPath;
    },
    getAbsPath() {
        return this._absPath;
    },
    setJson(json) {
        this._json = json;
    },
    getJson() {
        return this._json;
    }
};

module.exports = AbsPathWithJsonMappingObj;