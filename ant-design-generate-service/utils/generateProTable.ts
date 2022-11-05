// https://nodejs.org/dist/latest-v18.x/docs/api/
var fs = require("fs");
var { existsSync } = require("fs");
var path = require("path");
var utils = require("./utils");
const opn = require("opn");
const prettier = require("prettier");

const indexFile = "table.tsx";
const configFile = "config.tsx";
const tags = ["///开始", "///结束"];
const tagsQuo = ["'///去除引号", "\\'///去除引号", "///去除引号\\'", '\\"///去除引号', '///去除引号\\"', "///去除引号"];

exports.generateProTable = function (res: any, generateData: any) {
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
    fs.mkdir("/tmp/a/apple");
  }

  fs.copyFileSync(indexFilePath, generateIndexFilePath);
  fs.copyFileSync(configFilePath, generateConfigFilePath);

  let generateIndexFilePathStr = fs.readFileSync(generateIndexFilePath, "utf-8");
  let generateConfigFilePathStr = fs.readFileSync(generateConfigFilePath, "utf-8");
  const columnsPattern = `${tags[0]}1[\\d\\D]*${tags[1]}1`;
  const columnsRegExp = new RegExp(columnsPattern, "g");
  const initDataPattern = `${tags[0]}2[\\d\\D]*${tags[1]}2`;
  const initDataRegExp = new RegExp(initDataPattern, "g");
  const tableDataListPattern = `${tags[0]}3[\\d\\D]*${tags[1]}3`;
  const tableDataListRegExp = new RegExp(tableDataListPattern, "g");

  const deletePattern = `${tags[0]}删除[\\d\\D]*${tags[1]}删除`;
  const deleteRegExp = new RegExp(deletePattern, "g");

  generateConfigFilePathStr = generateConfigFilePathStr.replace(columnsRegExp, "const tableColumns = " + columns + "?? staticColumns;");
  generateConfigFilePathStr = generateConfigFilePathStr.replace(initDataRegExp, initData);
  generateConfigFilePathStr = generateConfigFilePathStr.replace(tableDataListRegExp, "const tableDataList = " + tableDataList);

  // 删除无用代码片段
  generateIndexFilePathStr = generateIndexFilePathStr.replace(deleteRegExp, "");
  generateConfigFilePathStr = generateConfigFilePathStr.replace(deleteRegExp, "");
  // 删除引号
  generateIndexFilePathStr = replaceStringByRegExpArr(tagsQuo, generateIndexFilePathStr, "");
  generateConfigFilePathStr = replaceStringByRegExpArr(tagsQuo, generateConfigFilePathStr, "");
  // 美化代码
  const [generateIndexFilePrettierStr, generateIndexFilePrettierSuccess] = prettierFile(generateIndexFilePathStr);
  const [generateConfigFilePrettierStr, generateConfigFilePrettierSuccess] = prettierFile(generateConfigFilePathStr);
  // 重新写入
  fs.writeFileSync(generateIndexFilePath, generateIndexFilePrettierStr, (error: any) => {
    if (error) console.error(`${path}创建失败：${error}`);
  });
  fs.writeFileSync(generateConfigFilePath, generateConfigFilePrettierStr, (error: any) => {
    if (error) console.error(`${path}创建失败：${error}`);
  });

  // 打开组件预览
  opn(previewUrl);
  return utils.ResultSuccess(res);
};

/** 替换字符串中的标签
 * @param regExpArr 正则数组
 * @param str 要替换的字符串
 * @param replaceStr 要替换成的字符串
 */
const replaceStringByRegExpArr = (regExpArr: string[], str: string, replaceStr: string) => {
  for (const i in regExpArr) {
    const regExp = regExpArr[i];
    const pattern = `${regExp}`;
    const runRegExp = new RegExp(pattern, "g");
    str = str.replace(runRegExp, replaceStr);
  }
  return str;
};

// 默认的prettier配置
const defaultPrettierOptions1 = {
  singleQuote: true,
  trailingComma: "all",
  printWidth: 120,
  tabWidth: 2,
  proseWrap: "always",
  endOfLine: "lf",
  bracketSpacing: false,
  arrowFunctionParentheses: "avoid",
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json"
      }
    },
    {
      files: "document.ejs",
      options: {
        parser: "html"
      }
    }
  ]
};
// Admin项目配置
const defaultPrettierOptions = {
  singleQuote: true,
  trailingComma: "all",
  printWidth: 180,
  overrides: [
    {
      files: ".prettierrc",
      options: { parser: "json" }
    }
  ]
};

// 格式化美化文件
type prettierFileType = (content: string) => [string, boolean];
export const prettierFile: prettierFileType = (content: string) => {
  let result = content;
  let hasError = false;
  try {
    result = prettier.format(content, {
      parser: "typescript",
      ...defaultPrettierOptions
    });
  } catch (error) {
    hasError = true;
  }
  return [result, hasError];
};
