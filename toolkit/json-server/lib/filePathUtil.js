/**
 * Created by liliwen on 2017/4/9.
 */
'use strict';
const
    fs = require('fs'),
    AbsPathWithRelativePathMappingObj = require('./model/AbsPathWithRelativePathMappingObj');

module.exports = {
    //指定的根目录名称
    _rootDirName: '',
    setRootDirName(rootDirName) {
        this._rootDirName = rootDirName;
    },
    /**列出某目录所有文件*/
    listAllFilesOfDir(dirname) {
        return fs.readdirSync(dirname, 'utf8');
    },
    /**获取某目录下所有子文件的路径，allFilePaths参数必须为空*/
    getAllFileAbsolutePaths(dirPath, allFilePaths) {
        let filenames = this.listAllFilesOfDir(dirPath),
            fileStat,
            filePath;

        if (!allFilePaths) allFilePaths = [];

        for (let i = 0, len = filenames.length; i < len; ++i) {
            filePath = `${dirPath}/${filenames[i]}`;
            fileStat = fs.statSync(filePath);
            if (fileStat.isFile()) allFilePaths.push(filePath);
            else this.getAllFileAbsolutePaths(filePath, allFilePaths);
        }

        return allFilePaths;
    },
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
    /**通过绝对路径获取文件的相对路径，具体相对路径的根目录可以配置*/
    getRelativeFilePaths(jsonFileAbsolutePaths) {
        let rootDirName = this._rootDirName,
            absoluteFilePath,
            relativeFilePath,
            relativeFilePaths = [];

        for (let i = 0, len = jsonFileAbsolutePaths.length; i < len; ++i) {
            absoluteFilePath = jsonFileAbsolutePaths[i];
            relativeFilePath = absoluteFilePath.split(rootDirName)[1];
            relativeFilePaths.push(relativeFilePath);
        }

        return relativeFilePaths;
    },
    /**通过绝对路径获取文件的相对路径的映射对象，具体相对路径的根目录可以配置*/
    getRelativeFilePathsMappingObject(jsonFileAbsolutePaths) {
        let rootDirName = this._rootDirName,
            absoluteFilePath,
            relativeFilePath,
            mappingObj,
            relativeFilePathsMappingObject = [];

        for (let i = 0, len = jsonFileAbsolutePaths.length; i < len; ++i) {
            absoluteFilePath = jsonFileAbsolutePaths[i];
            relativeFilePath = absoluteFilePath.split(rootDirName)[1];

            mappingObj = new AbsPathWithRelativePathMappingObj(absoluteFilePath, relativeFilePath);

            relativeFilePathsMappingObject.push(mappingObj);
        }

        return relativeFilePathsMappingObject;
    }
};