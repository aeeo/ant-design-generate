// const { template, templateJson, templateCss, templateJs } = require("./template");
const { ResultSuccess } = require("./utils/utils");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var moment = require("moment");
const puppeteer = require("puppeteer");
const opn = require("opn");
//在原有的基础上加上下面代码即可
app.use(
  bodyParser.json({
    limit: "50mb"
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true
  })
);
// http://nodejs.cn/api/fs.html
var fs = require("fs");
var path = require("path");

const port = 8081;

app.get("/Success", async (req, res) => {
  return ResultSuccess(res, "成功");
});

app.get("/generate", async (req, res) => {
  return ResultSuccess(res, "成功");
});

// 监听
app.listen(port, function () {
  console.log("success listen..." + port);
});
