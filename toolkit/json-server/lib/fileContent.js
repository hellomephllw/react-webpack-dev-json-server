/**
 * Created by liliwen on 2017/4/9.
 */
'use strict';
module.exports = {
    /**列出该目录所有文件*/
    listAllFilesOfDir(dirname) {
        return fs.readdirSync(dirname, 'utf8');
    },
    /**获取某目录下所有文件的路径，allFilePaths参数必须为空*/
    getAllFileAbsolutePaths(dirPath, allFilePaths) {
        let filenames = listFilesOfDir(dirPath),
            fileStat,
            filePath;

        if (!allFilePaths) allFilePaths = [];

        for (let i = 0, len = filenames.length; i < len; ++i) {
            filePath = `${dirPath}/${filenames[i]}`;
            fileStat = fs.statSync(filePath);
            if (fileStat.isFile()) allFilePaths.push(filePath);
            else getAllFilePaths(filePath, allFilePaths);
        }

        return allFilePaths;
    }
};