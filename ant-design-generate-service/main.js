const { ResultSuccess } = require("./utils/utils");
const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const generate = require("./utils/generateProTable");
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

app.get("/Success", async (req, res) => {
  return ResultSuccess(res, "成功");
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
