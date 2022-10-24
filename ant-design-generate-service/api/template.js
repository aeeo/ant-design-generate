// http://nodejs.cn/api/fs.html
// 模板信息
var fs = require("fs");
var path = require("path");
const templateRelativePath = "\\uz-front\\components\\_BASE\\base-template-100\\BaseTemplate100.vue";
const templateDataRelativePath = "\\uz-front\\components\\_BASE\\base-template-100\\data.json";
const templateJsRelativePath = "\\uz-front\\components\\_BASE\\base-template-100\\static\\js\\common.js";
const templateCssRelativePath = "\\uz-front\\components\\_BASE\\base-template-100\\static\\css\\common.css";
const templatePath = path.join("../", templateRelativePath);
const templateJsonPath = path.join("../", templateDataRelativePath);
const templateJsPath = path.join("../", templateJsRelativePath);
const templateCssPath = path.join("../", templateCssRelativePath);
const template = fs.readFileSync(templatePath, "utf-8", function (error, dataStr) {
  if (error) {
    console.error(error);
  }
  return;
});
const templateJson = fs.readFileSync(templateJsonPath, "utf-8", function (error, dataStr) {
  if (error) {
    console.error(error);
  }
  return;
});
const templateJs = fs.readFileSync(templateJsPath, "utf-8", function (error, dataStr) {
  if (error) {
    console.error(error);
  }
  return;
});
const templateCss = fs.readFileSync(templateCssPath, "utf-8", function (error, dataStr) {
  if (error) {
    console.error(error);
  }
  return;
});

module.exports = { template, templateJson, templateCss, templateJs };
