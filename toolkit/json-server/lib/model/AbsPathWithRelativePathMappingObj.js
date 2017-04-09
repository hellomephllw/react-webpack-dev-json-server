/**
 * Created by liliwen on 2017/4/9.
 */
'use strict';

function AbsPathWithRelativePathMappingObj(absPath, relativePath) {
    this._absPath = absPath;
    this._relativePath = relativePath;
}
AbsPathWithRelativePathMappingObj.prototype = {
    setAbsPath(absPath) {
        this._absPath = absPath;
    },
    getAbsPath() {
        return this._absPath;
    },
    setRelativePath(relativePath) {
        this._relativePath = relativePath;
    },
    getRelativePath() {
        return this._relativePath;
    }
};

module.exports = AbsPathWithRelativePathMappingObj;