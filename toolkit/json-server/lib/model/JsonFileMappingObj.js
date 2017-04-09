/**
 * Created by liliwen on 2017/4/9.
 */
'use strict';

function JsonFileMappingObj(relativePath, json) {
    this._url = relativePath;
    this._json = json;
}
JsonFileMappingObj.prototype = {
    setUrl(url) {
        this._url = url;
    },
    getUrl() {
        return this._url;
    },
    setJson(json) {
        this._json = json;
    },
    getJson() {
        return this._json;
    }
};

module.exports = JsonFileMappingObj;