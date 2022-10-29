// https://nodejs.org/dist/latest-v18.x/docs/api/
var fs = require("fs");
var { existsSync } = require("fs");
var path = require("path");
var utils = require("./utils");
const opn = require("opn");

const indexFile = "index.tsx";
const configFile = "config.tsx";
const tags = ["///开始", "///结束"];

exports.generateProTable = function (res, generateData) {
  const { name, templatePath, generatePath, columns, tableDataList, initData, previewUrl } = generateData;

  const indexFilePath = path.join(templatePath, indexFile); // 文件绝对路径
  const generateIndexFilePath = path.join(generatePath, indexFile); // 文件绝对路径
  const configFilePath = path.join(templatePath, configFile); // 文件绝对路径
  const generateConfigFilePath = path.join(generatePath, configFile); // 文件绝对路径
  if (!existsSync(templatePath)) return utils.ResultFail(res, `模板${templatePath}路径不存在！`);
  if (!existsSync(indexFilePath)) return utils.ResultFail(res, `模板${indexFile}不存在！`);
  if (!existsSync(configFilePath)) return utils.ResultFail(res, `模板${configFilePath}不存在！`);

  fs.accessSync(generatePath, fs.constants.R_OK);
  fs.accessSync(templatePath, fs.constants.R_OK);

  // 如果目录不存在则创建目录
  if (!existsSync(generatePath)) {
    mkdir("/tmp/a/apple");
  }

  fs.copyFileSync(indexFilePath, generateIndexFilePath);
  fs.copyFileSync(configFilePath, generateConfigFilePath);

  let generateConfigFilePathStr = fs.readFileSync(generateConfigFilePath, "utf-8");
  const columnsPattern = `${tags[0]}1[\\d\\D]*${tags[1]}1`;
  const columnsRegExp = new RegExp(columnsPattern, "g");
  const initDataPattern = `${tags[0]}2[\\d\\D]*${tags[1]}2`;
  const initDataRegExp = new RegExp(initDataPattern, "g");
  const tableDataListPattern = `${tags[0]}3[\\d\\D]*${tags[1]}3`;
  const tableDataListRegExp = new RegExp(tableDataListPattern, "g");

  generateConfigFilePathStr = generateConfigFilePathStr.replace(columnsRegExp, columns);
  generateConfigFilePathStr = generateConfigFilePathStr.replace(initDataRegExp, initData);
  generateConfigFilePathStr = generateConfigFilePathStr.replace(tableDataListRegExp, "const tableDataList = " + tableDataList);

  fs.writeFileSync(generateConfigFilePath, generateConfigFilePathStr, (error) => {
    if (error) console.error(`${path}创建失败：${error}`);
  });

  // 打开组件预览
  opn(previewUrl);
  return utils.ResultSuccess(res);
};
