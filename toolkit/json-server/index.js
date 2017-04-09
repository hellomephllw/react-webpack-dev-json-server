/**
 * Created by liliwen on 2017/4/8.
 */
'use strict';
const
    filePathUtil = require('./lib/filePathUtil'),
    fileContentUtil = require('./lib/fileContentUtil'),
    JsonFileMappingObj = require('./lib/model/JsonFileMappingObj');

module.exports = {
    /**构建json文件模式的服务*/
    buildJsonFileMode() {
        let jsonFileAbsolutePaths,
            jsonFileRelativePathsMappingObject,
            jsonObjectsMappingObject,
            jsonFilesMappingObj;

        jsonFileAbsolutePaths = this._getAllJsonFileAbsolutePaths();
        jsonFileRelativePathsMappingObject = this._getAllJsonFileRelativePaths(jsonFileAbsolutePaths);
        jsonObjectsMappingObject = this._getAllJsonObjectFromPaths(jsonFileAbsolutePaths);

        //生成json文件模式的映射对象
        jsonFilesMappingObj = this._generateJsonFilesMappingObj(jsonFileRelativePathsMappingObject, jsonObjectsMappingObject);

        return jsonFilesMappingObj;
    },
    //json文件模式的根目录
    _rootDirName: 'mock-data',
    //获取所有json文件绝对路径
    _getAllJsonFileAbsolutePaths() {
        let allFileAbsolutePaths,
            jsonFileAbsolutePaths;
        //设置json文件的根目录名称
        filePathUtil.setRootDirName(this._rootDirName);
        //获取所有文件的绝对路径
        allFileAbsolutePaths = filePathUtil.getAllFileAbsolutePaths(`${rootPath}/${this._rootDirName}`);
        //只取所有json文件的绝对路径
        jsonFileAbsolutePaths = filePathUtil.getJsonFileAbsolutePaths(allFileAbsolutePaths);

        return jsonFileAbsolutePaths;
    },
    //获取json文件相对路径
    _getAllJsonFileRelativePaths(allJsonFileAbsolutePaths) {
        return filePathUtil.getRelativeFilePathsMappingObject(allJsonFileAbsolutePaths)
    },
    //获取每个json文件中的对象
    _getAllJsonObjectFromPaths(allJsonFileAbsolutePaths) {
        let jsonContentsMappingObject,
            jsonObjectsMappingObject;

        jsonContentsMappingObject = fileContentUtil.getAllJsonContentsMappingObjectFromPaths(allJsonFileAbsolutePaths);
        jsonObjectsMappingObject = fileContentUtil.formatAllJsonStringFromMappingObjToJsonObject(jsonContentsMappingObject);

        return jsonObjectsMappingObject;
    },
    //获取json文件模式的映射对象
    _generateJsonFilesMappingObj(relativePathsMappingObj, jsonObjectsMappingObj) {
        let relativePathMappingObj,
            jsonObjectMappingObj,
            jsonFileMappingObj,
            jsonFilesMappingObj = [];

        for (let i = 0, len = relativePathsMappingObj.length; i < len; ++i) {
            relativePathMappingObj = relativePathsMappingObj[i];
            for (let j = 0, innerLen = jsonObjectsMappingObj.length; j < innerLen; ++j) {
                jsonObjectMappingObj = jsonObjectsMappingObj[j];
                if (relativePathMappingObj.getAbsPath() == jsonObjectMappingObj.getAbsPath()) {
                    jsonFileMappingObj = new JsonFileMappingObj(relativePathMappingObj.getRelativePath(), jsonObjectMappingObj.getJson());
                    jsonFilesMappingObj.push(jsonFileMappingObj);
                    break;
                }
            }
        }

        return jsonFilesMappingObj;
    }
};