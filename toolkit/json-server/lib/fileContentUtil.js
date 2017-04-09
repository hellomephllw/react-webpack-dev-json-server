/**
 * Created by liliwen on 2017/4/9.
 */
'use strict';
const
    fs = require('fs'),
    AbsPathWithJsonMappingObj = require('./model/AbsPathWithJsonMappingObj');

module.exports = {
    /**获取某路径的json文件内容*/
    getJsonContent(jsonFileAbsolutePath) {
        let content;
        try {
            content = fs.readFileSync(jsonFileAbsolutePath, 'utf8');
        } catch (e) {
            throw new Error(e);
        }

        return content;
    },
    /**获取传入json文件中的所有json内容*/
    getAllJsonContentFromPaths(jsonFileAbsolutePaths) {
        let jsonFileContents = [],
            jsonFileAbsolutePath;
        for (let i = 0, len = jsonFileAbsolutePaths.length; i < len; ++i) {
            jsonFileAbsolutePath = jsonFileAbsolutePaths[i];
            jsonFileContents.push(this.getJsonContent(jsonFileAbsolutePath));
        }

        return jsonFileContents;
    },
    /**获取传入json文件中的所有json内容的路径映射对象*/
    getAllJsonContentsMappingObjectFromPaths(jsonFileAbsolutePaths) {
        let jsonFileContentsMappingObject = [],
            jsonFileAbsolutePath,
            mappingObject;
        for (let i = 0, len = jsonFileAbsolutePaths.length; i < len; ++i) {
            jsonFileAbsolutePath = jsonFileAbsolutePaths[i];

            mappingObject = new AbsPathWithJsonMappingObj(jsonFileAbsolutePath, this.getJsonContent(jsonFileAbsolutePath));

            jsonFileContentsMappingObject.push(mappingObject);
        }

        return jsonFileContentsMappingObject;
    },
    /**把所有json字符串变为json对象*/
    formatAllJsonStringToJsonObject(jsonStrs) {
        let jsons = [],
            jsonStr;
        for (let i = 0, len = jsonStrs.length; i < len; ++i) {
            jsonStr = jsonStrs[i];
            jsons.push(JSON.parse(jsonStr));
        }

        return jsons;
    },
    /**把json映射对象的json字符串变为json对象*/
    formatAllJsonStringFromMappingObjToJsonObject(jsonStrsMappingObj) {
        let jsonObjsMappingObj = [],
            jsonObjMappingObj,
            jsonStrMappingObj;

        for (let i = 0, len = jsonStrsMappingObj.length; i < len; ++i) {
            jsonStrMappingObj = jsonStrsMappingObj[i];
            jsonObjMappingObj = new AbsPathWithJsonMappingObj(
                jsonStrMappingObj.getAbsPath(), JSON.parse(jsonStrMappingObj.getJson()));

            jsonObjsMappingObj.push(jsonObjMappingObj);
        }

        return jsonObjsMappingObj;
    }
};