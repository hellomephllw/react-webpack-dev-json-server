/**
 * Created by liliwen on 2017/4/9.
 */
'use strict';
module.exports = {
    /**指定的根目录名称*/
    rootDirName: 'mock-data',
    /**获取所有json文件的路径，即排除所有非json文件*/
    getJsonFileAbsolutePaths(allFilePaths) {
        let jsonFiles = [],
            reg = /.+\.json$/,
            filePath;

        for (let i = 0, len = allFilePaths.length; i < len; ++i) {
            filePath = allFilePaths[i];
            if (reg.test(filePath)) jsonFiles.push(filePath);
        }

        return jsonFiles;
    },
    /**获取文件的相对路径，具体相对路径可以配置*/
    getRelativeFilePaths(jsonFileAbsolutePaths) {
        let rootDirName = this.rootDirName,
            absoluteFilePath,
            relativeFilePath,
            relativeFilePaths = [];

        for (let i = 0, len = jsonFileAbsolutePaths.length; i < len; ++i) {
            absoluteFilePath = jsonFileAbsolutePaths[i];
            relativeFilePath = absoluteFilePath.split(rootDirName)[1];
            relativeFilePaths.push(relativeFilePath);
        }

        return relativeFilePaths;
    }
};