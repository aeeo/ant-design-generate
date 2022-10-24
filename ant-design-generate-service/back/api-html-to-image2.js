// 引入puppeteer
const puppeteer = require("puppeteer");

// 需要生成的图的文件名
const fileName = "example.png";
// html网络地址
const url = "file:///C:/Users/Z/Desktop/templates/www.ntyxbwg.com/about.html";
// const url = "http://127.0.0.1:65454/about.html";
generateComponentImage(url, fileName);

// 生成组件图片预览
async function generateComponentImage(
  htmlFilePath,
  componentPreviewImage,
  callback
) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();
  await page.goto(htmlFilePath);
  await page.screenshot({ path: componentPreviewImage, fullPage: true });
  await browser.close();
  if (callback) {
    callback();
  }
}
