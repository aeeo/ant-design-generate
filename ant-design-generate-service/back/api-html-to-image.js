var phantom = require("phantom");

generateComponentImage(() => {
  console.log(123);
});

// 生成组件图片预览
function generateComponentImage(callback) {
  phantom.create().then(function (ph) {
    ph.createPage().then(function (page) {
      page.open("http://127.0.0.1:65454/about.html").then(function (status) {
        page.property("viewportSize", { width: 1920, height: 1080 });
        page.render("./baidu.png").then(function () {
          ph.exit();
          if (callback) {
            callback();
          }
        });
      });
    });
  });
}
