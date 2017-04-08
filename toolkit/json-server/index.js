/**
 * Created by liliwen on 2017/4/8.
 */
const fs = require('fs');

module.exports = function() {
    let filenames = fs.readdirSync(`${rootPath}/mock-data`, 'utf8');
    console.log('============');
    console.log(filenames);

    function listFilesOfDir(dirname) {
        return fs.readdirSync(dirname, 'utf8');
    }


    let arr = getAllFileAbsolutePaths(`${rootPath}/mock-data`);

    console.log(arr);

    let all = getJsonFileAbsolutePaths(arr);

    console.log(all);

    let parts = getRelativeFilePaths(all);

    console.log(parts);

    function getAllFileAbsolutePaths(dirPath, allFilePaths) {
        let filenames = listFilesOfDir(dirPath),
            fileStat,
            filePath;

        if (!allFilePaths) allFilePaths = [];

        for (let i = 0, len = filenames.length; i < len; ++i) {
            filePath = `${dirPath}/${filenames[i]}`;
            fileStat = fs.statSync(filePath);
            if (fileStat.isFile()) allFilePaths.push(filePath);
            else getAllFileAbsolutePaths(filePath, allFilePaths);
        }

        return allFilePaths;
    }

    function getJsonFileAbsolutePaths(allFilePaths) {
        let jsonFiles = [],
            reg = /.+\.json$/,
            filePath;
        for (let i = 0, len = allFilePaths.length; i < len; ++i) {
            filePath = allFilePaths[i];
            if (reg.test(filePath)) jsonFiles.push(filePath);
        }

        return jsonFiles;
    }

    function getRelativeFilePaths(jsonFileAbsolutePaths) {
        let rootDirName = 'mock-data',
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