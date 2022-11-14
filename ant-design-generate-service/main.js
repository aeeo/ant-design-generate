const { ResultSuccess } = require("./utils/utils");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const generate = require("./utils/generateProTable");

// 解决跨域问题
app.all("*", function (req, res, next) {
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.send(200); // 让options 尝试请求快速结束
  else next();
});

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

app.get("/selectList", async (req, res) => {
  // 模拟响应的数据
  const tableDataList = [
    {
      key: 1,
      id: 1,
      name: "赵通1",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    },
    {
      key: 2,
      id: 2,
      name: "赵通2",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    },
    {
      key: 3,
      id: 3,
      name: "赵通3",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    },
    {
      key: 4,
      id: 4,
      name: "赵通4",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    },
    {
      key: 5,
      id: 5,
      name: "赵通5",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    },
    {
      key: 6,
      id: 6,
      name: "赵通6",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    },
    {
      key: 7,
      id: 7,
      name: "赵通7",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    },
    {
      key: 8,
      id: 8,
      name: "赵通8",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    },
    {
      key: 9,
      id: 9,
      name: "赵通9",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    },
    {
      key: 10,
      id: 10,
      name: "赵通10",
      age: 19,
      createTime: Date.now(),
      phone: 18700871300
    }
  ];
  return ResultSuccess(res, "成功", tableDataList);
});
app.get("/selectDetail", async (req, res) => {
  // 模拟响应的数据
  const tableDataDetail = {
    key: 1,
    id: 1,
    name: "赵通1",
    age: 19,
    createTime: Date.now(),
    phone: 18700871300
  };
  return ResultSuccess(res, "成功", tableDataDetail);
});

app.post("/generate", async (req, res) => {
  console.debug(req.body);
  try {
    return generate.generateProTable(res, req.body);
  } catch (e) {
    console.error(e);
  }
});

// 监听
const port = 8081;
app.listen(port, function () {
  console.debug("success listen..." + port);
});
