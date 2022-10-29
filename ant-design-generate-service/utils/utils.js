var moment = require("moment");
// 转驼峰 border-bottom-color => borderBottomColor
exports.toHump = function (value) {
  var arr = value.split("-");
  for (var i = 1; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
  }
  return arr.join("");
};
// 首字母大写驼峰 border-bottom-color => BorderBottomColor
exports.toFirstUpperCase = function (value) {
  var arr = value.split("-");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
  }
  return arr.join("");
};
// 替换Tag
exports.replaceTag = function (templateStr, html, componentName, uzzuzRelativePath, privateHtmlImageListField, privateCssImageListField) {
  // 模板信息
  const templateInfoPattern = "<!-- Tag:模板信息开始 -->[\\d\\D]*<!-- Tag:模板信息结束 -->";
  const templateInfoRegExp = new RegExp(templateInfoPattern, "g");
  let templateInfoRegExpStr = templateInfoRegExp.exec(templateStr);
  let date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  let templateInfo = `<!-- Tag:模板信息开始 -->\n<!-- 创建人：赵通 -->\n<!-- 创建时间：${date}  -->\n<!-- 模板描述： -->\n<!-- Tag:模板信息结束 -->`;
  templateStr = templateStr.replace(templateInfoRegExpStr, templateInfo);

  // 主体HTML片段
  const templateHtmlPattern = "<!-- Tag:Html片段开始 -->[\\d\\D]*<!-- Tag:Html片段结束 -->";
  const templateHtmlRegExp = new RegExp(templateHtmlPattern, "g");
  let mainHtml = templateHtmlRegExp.exec(html);
  if (!mainHtml) {
    console.error("模板中没有主体HTML片段");
    return;
  }
  mainHtml = mainHtml[0].replace("<!-- Tag:Html片段开始 -->", "").replace("<!-- Tag:Html片段结束 -->", "");
  // 主体HTML
  const templateMainHtmlPattern = "<!-- Tag:主体内容开始 -->[\\d\\D]*<!-- Tag:主体内容结束 -->";
  const templateMainHtmlRegExp = new RegExp(templateMainHtmlPattern, "g");
  let templateMainHtmlRegExpStr = templateMainHtmlRegExp.exec(templateStr);
  let templateMainHtml = `<!-- Tag:主体内容开始 -->${mainHtml}<!-- Tag:主体内容结束 -->`;
  templateStr = templateStr.replace(templateMainHtmlRegExpStr, templateMainHtml);
  // import UZZUZ
  const templateUZZUZPattern = "// Tag:UZZUZ开始[\\d\\D]*// Tag:UZZUZ结束";
  const templateUZZUZRegExp = new RegExp(templateUZZUZPattern, "g");
  let templateUZZUZRegExpStr = templateUZZUZRegExp.exec(templateStr);
  let templateUZZUZ = `// Tag:UZZUZ开始\nimport UZZUZ from '${uzzuzRelativePath}'\n// Tag:UZZUZ结束`;
  templateStr = templateStr.replace(templateUZZUZRegExpStr, templateUZZUZ);
  // 组件name
  const templateComponentNamePattern = "// Tag:组件名开始[\\d\\D]*// Tag:组件名结束";
  const templateComponentNameRegExp = new RegExp(templateComponentNamePattern, "g");
  let templateComponentNameRegExpStr = templateComponentNameRegExp.exec(templateStr);
  let templateComponentName = `// Tag:组件名开始\n  name: "${componentName}",\n  // Tag:组件名结束`;
  templateStr = templateStr.replace(templateComponentNameRegExpStr, templateComponentName);

  // 私有字段
  const privateFieldPattern = "// Tag:组件私有字段正则标记开始[\\d\\D]*// Tag:组件私有字段正则标记结束";
  const privateFieldRegExp = new RegExp(privateFieldPattern, "g");
  let exstr = privateFieldRegExp.exec(templateStr)[0];
  let privatePrefix = "// Tag:组件私有字段正则标记开始\r\nconst privateField = ";
  let privateSuffix = "\r\n// Tag:组件私有字段正则标记结束";
  let replaceStr = exstr.replace(privatePrefix, "").replace(privateSuffix, "");
  let cssImageListPattern = /cssImageList": [[\s\S]*?]/g;
  replaceStr.replace(cssImageListPattern, `cssImageList: [\n ${privateCssImageListField}\n  ],`);

  replaceStr = replaceStr.slice(0, replaceStr.length - 2) + `\n${privateHtmlImageListField}` + replaceStr.slice(replaceStr.length - 2);
  replaceStr = privatePrefix + replaceStr + privateSuffix;
  templateStr = templateStr.replace(exstr, replaceStr);

  return templateStr;
};

// 生成文件信息
exports.generateFiles = function (
  generateComponentPath,
  generateComponentAssetsPath,
  generateComponentAssetsRelativePath,
  generateComponentNameHump,
  uzzuzRelativePath,
  html,
  htmlPath,
  unCss,
  cssPath,
  dataJson
) {
  const insertTemplateIndex = 1;
  const imagesPath = path.join(generateComponentAssetsPath, "images");
  const imagesRelativePath = path.join(generateComponentAssetsRelativePath, "images");
  let filesInfo = [];
  let privateHtmlImageListField = "";
  extractHtmlImages(html, htmlPath, imagesPath, imagesRelativePath, (data) => {
    html = data.html;
    let images = data.images;
    for (let i in images) {
      // 去重
      let exist = false;
      for (let fileIndex in filesInfo) {
        if (filesInfo[fileIndex].imagePrivateFieldName == images[i].imagePrivateFieldName) {
          exist = true;
        }
      }
      if (!exist) {
        filesInfo.push({
          type: "copyFile",
          targetUrl: images[i].targetUrl,
          targetRelativeUrl: images[i].targetRelativeUrl,
          sourceUrl: images[i].sourceUrl,
          imagePrivateFieldName: images[i].imagePrivateFieldName
        });
        let imageUrl = images[i].targetRelativeUrl.split("\\").join("/");
        privateHtmlImageListField += `  ${images[i].imagePrivateFieldName}: '${imageUrl}',\n`;
      }
    }
  });
  let privateCssImageListField = "   ";
  extractCssImages(unCss, cssPath, imagesPath, imagesRelativePath, (data) => {
    unCss = data.unCss;
    let images = data.images;
    for (let i in images) {
      let exist = false;

      for (let fileIndex in filesInfo) {
        if (filesInfo[fileIndex].imagePrivateFieldName == images[i].imagePrivateFieldName) {
          exist = true;
        }
      }
      if (!exist) {
        filesInfo.push({
          type: "copyFile",
          targetUrl: images[i].targetUrl,
          targetRelativeUrl: images[i].targetRelativeUrl,
          sourceUrl: images[i].sourceUrl,
          imagePrivateFieldName: images[i].imagePrivateFieldName
        });
        let imageUrl = images[i].targetRelativeUrl.split("\\").join("/");
        privateCssImageListField += `{\n      type: 'image',\n      key: '${images[i].imagePrivateFieldName}',\n      url: '${imageUrl}'\n    },`;
      }
    }
  });

  // #region 组件资源文件
  let templateStr = template;
  let templateJsonStr = templateJson;
  let templateJsStr = templateJs;
  let templateCssStr = templateCss; // 没用到
  // 资源根目录
  filesInfo.push({ type: "mkdir", path: generateComponentAssetsPath });
  // 资源images
  filesInfo.push({
    type: "mkdir",
    path: imagesPath
  });
  // #endregion 组件资源文件

  // #region 组件文件
  // 根目录
  filesInfo.push({ type: "mkdir", path: generateComponentPath });
  filesInfo.push({
    type: "mkdir",
    path: path.join(generateComponentPath, "static")
  });
  // static/css
  filesInfo.push({
    type: "mkdir",
    path: path.join(generateComponentPath, "static", "css")
  });
  // common.css
  filesInfo.push({
    type: "file",
    path: path.join(generateComponentPath, "static", "css", "common.css"),
    writeStr: unCss ? unCss.replace(/<!-- Tag:换行 -->/g, "\r\n") : ""
  });

  // static/js
  filesInfo.push({
    type: "mkdir",
    path: path.join(generateComponentPath, "static", "js")
  });
  // common.js
  filesInfo.push({
    type: "file",
    path: path.join(generateComponentPath, "static", "js", "common.js"),
    writeStr: templateJsStr
  });
  // Vue文件
  const vuePath = path.join(generateComponentPath, generateComponentNameHump + ".vue");

  templateStr = replaceTag(templateStr, html, generateComponentNameHump, uzzuzRelativePath, privateHtmlImageListField, privateCssImageListField);
  filesInfo.push({
    type: "file",
    path: vuePath,
    writeStr: templateStr.replace(/<!-- Tag:换行 -->/g, "\r\n")
  });

  // data.json
  const dataJsonPath = path.join(generateComponentPath, "data.json");
  filesInfo.push({
    type: "file",
    path: dataJsonPath,
    writeStr: templateJsonStr
  });
  // schema.json
  const schemaJsonPath = path.join(generateComponentPath, "schema.json");
  filesInfo.push({
    type: "file",
    path: schemaJsonPath,
    writeStr: "{}"
  });
  //#endregion 组件文件
  return filesInfo;
};
// 提取内容的图片文件
// html :src="uzzuz.componentUtil.static(privateField.imageIconPhone)"
exports.extractHtmlImages = function (html, htmlPath, imagesPath, imagesRelativePath, callback) {
  // 提取src图片
  var pattern1 = /src[=\"]*[./]*(image|img)[A-Za-z0-9-_/]+.(bmp|jpg|jpeg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng)\"/g;
  var pattern2 = /[./]*(image|img)[A-Za-z0-9-_/]+.(bmp|jpg|jpeg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng)/g;
  let htmlImagesMatch = html.match(pattern1);
  let htmlImages = JSON.parse(JSON.stringify(htmlImagesMatch));
  for (let index in htmlImages) {
    let htmlImageRelativePath = htmlImages[index].match(pattern2)[0];
    let htmlImageAbsolutePath = path.join(absolutePath, htmlPath, htmlImageRelativePath);
    htmlImages[index] = path.parse(htmlImageAbsolutePath);
    let base = htmlImages[index].base; // "logob.png"
    let name = htmlImages[index].name; // "logob"
    let type = htmlImages[index].ext.slice(1); // "png"
    let privateFieldName = toHump("image-" + type + "-" + name);
    let srcPrivateFieldName = `:src="uzzuz.componentUtil.static(privateField.${privateFieldName})"`;
    htmlImages[index].imagePrivateFieldName = privateFieldName;
    htmlImages[index].sourceUrl = htmlImageAbsolutePath;
    htmlImages[index].targetUrl = path.join(imagesPath, privateFieldName + htmlImages[index].ext);
    htmlImages[index].targetRelativeUrl = path.join(imagesRelativePath, privateFieldName + htmlImages[index].ext);
    html = html.replace(htmlImagesMatch[index], srcPrivateFieldName);
  }
  // style=(\\"\\r\\n|[a-zA-Z0-9".-: ;()_-]+)*(images|img)((\\r\\n|[a-zA-Z0-9".-: ;()_-]+)*)
  // 提取style图片 style="background-image: url(images/09Bu_KpsRG2fNp-MeOiRxQ.jpg);"
  // var pattern3 =
  //   /style=\"[\s\S]*url\([A-Za-z0-9-_/]*.(bmp|jpg|jpeg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng)\)[\s\S]*"/g;
  var pattern3 = /style=.*?".*?"/g; // 2022年6月26日
  var pattern4 = /[A-Za-z0-9-_/]*.(bmp|jpg|jpeg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng)/g;
  let htmlStyleMatch = html.match(pattern3);
  let htmlStyleImages = [];
  for (let index in htmlStyleMatch) {
    let pattern4Arr = htmlStyleMatch[index].match(pattern4);
    if (!pattern4Arr || pattern4Arr.length == 0) {
      continue;
    } else {
      htmlStyleImages.push(htmlStyleMatch[index]);
    }
  }
  let htmlStyleImagesMatch = JSON.parse(JSON.stringify(htmlStyleImages));
  for (let index in htmlStyleImages) {
    let pattern4Arr = htmlStyleImages[index].match(pattern4);
    if (!pattern4Arr || pattern4Arr.length == 0) {
      continue;
    }
    htmlStyleImagesMatch.push(htmlStyleImages[index]);
    let htmlImageRelativePath = pattern4Arr[0];
    let htmlImageAbsolutePath = path.join(absolutePath, htmlPath, htmlImageRelativePath);
    htmlStyleImages[index] = path.parse(htmlImageAbsolutePath);
    let base = htmlStyleImages[index].base; // "logob.png"
    let name = htmlStyleImages[index].name; // "logob"
    let type = htmlStyleImages[index].ext.slice(1); // "png"
    let privateFieldName = toHump("image-" + type + "-" + name);
    let srcPrivateFieldName = htmlStyleImagesMatch[index] + ` :style="'background-image: url('\n + uzzuz.componentUtil.static(\nprivateField.${privateFieldName})\n +\n');'"`;
    htmlStyleImages[index].imagePrivateFieldName = privateFieldName;
    htmlStyleImages[index].sourceUrl = htmlImageAbsolutePath;
    htmlStyleImages[index].targetUrl = path.join(imagesPath, privateFieldName + htmlStyleImages[index].ext);
    htmlStyleImages[index].targetRelativeUrl = path.join(imagesRelativePath, privateFieldName + htmlStyleImages[index].ext);
    html = replaceStr(html, htmlStyleImagesMatch[index], srcPrivateFieldName, index);
  }
  let allImages = [];
  if (htmlImages) allImages = allImages.concat(htmlImages);
  if (htmlStyleImages) allImages = allImages.concat(htmlStyleImages);
  if (callback) {
    callback({ html, images: allImages });
    return;
  }
  return { html, images: allImages };
};
exports.extractCssImages = function (unCss, cssPath, imagesPath, imagesRelativePath, callback) {
  const cssImagesPattern1 = /url\([./]*(image|img)[A-Za-z0-9-_/]+.(bmp|jpg|jpeg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng)\)/g;
  const cssImagesPattern2 = /[./]*(image|img)[A-Za-z0-9-_/]+.(bmp|jpg|jpeg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|avif|apng)/g;
  let cssImagesMatch = unCss.match(cssImagesPattern1);
  let cssImages = JSON.parse(JSON.stringify(cssImagesMatch));
  for (let index in cssImages) {
    let cssImagesRelativePath = cssImages[index].match(cssImagesPattern2)[0];
    let cssImagesAbsolutePath = path.join(absolutePath, cssPath, cssImagesRelativePath);
    cssImages[index] = path.parse(cssImagesAbsolutePath);
    let base = cssImages[index].base; // "logob.png"
    let name = cssImages[index].name; // "logob"
    let type = cssImages[index].ext.slice(1); // "png"
    let privateFieldName = toHump("image-" + type + "-" + name);
    let urlPrivateFieldName = `var(--${privateFieldName})`;
    cssImages[index].imagePrivateFieldName = privateFieldName;
    cssImages[index].sourceUrl = cssImagesAbsolutePath;
    cssImages[index].targetUrl = path.join(imagesPath, privateFieldName + cssImages[index].ext);
    cssImages[index].targetRelativeUrl = path.join(imagesRelativePath, privateFieldName + cssImages[index].ext);
    unCss = unCss.replace(cssImagesMatch[index], urlPrivateFieldName);
  }
  let allImages = cssImages;
  if (callback) {
    callback({ unCss, images: allImages });
    return;
  }
  return { unCss, images: allImages };
};

// 文件生成
exports.createFs = function (filesInfo) {
  for (let i in filesInfo) {
    let type = filesInfo[i].type;
    let path = filesInfo[i].path;
    let writeStr = filesInfo[i].writeStr;
    if (type == "file") {
      if (!writeStr) {
        writeStr = "";
        console.warn(`${path}写入文件内容空。`);
      }
      fs.writeFileSync(path, writeStr, (error) => {
        if (error) console.error(`${path}创建失败：${error}`);
      });
    } else if (type == "mkdir") {
      fs.mkdirSync(path, { recursive: true }, (error) => {
        if (error) console.error(`${path}创建目录失败：${error}`);
      });
    }
  }
  for (let i in filesInfo) {
    let type = filesInfo[i].type;
    let sourceUrl = filesInfo[i].sourceUrl;
    let targetUrl = filesInfo[i].targetUrl;
    if (type == "copyFile") {
      fs.copyFileSync(sourceUrl, targetUrl);
    }
  }
};

// 生成组件图片预览
exports.generateComponentImage = async function (htmlFileAbsolutePath, componentPreviewImage, componentAssetsPreviewImage, callback) {
  const timeOut = 5000;
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });
  const page = await browser.newPage();
  await page.goto(htmlFileAbsolutePath);
  // 等待浏览器的加载
  await page.waitForTimeout(timeOut);
  await page.screenshot({ path: componentAssetsPreviewImage, fullPage: true });

  // const page2 = await browser.newPage();
  // await page2.goto(htmlFileAbsolutePath);
  // // 等待浏览器的加载
  // await page.waitFor(timeOut);
  await page.screenshot({ path: componentPreviewImage, fullPage: true });
  await browser.close();
  if (callback) {
    callback();
  }
};

// 根据下标替换字符串
exports.replaceStr = function (str, replaceStr, replacedStr, num) {
  let index = findStrIndex(str, replaceStr, num);
  let str1 = str.substring(0, index);
  let str2 = str.substring(index + replaceStr.length);
  return str1 + replacedStr + str2;
};

/**
 * 查找字符串第几次出现的位置
 * @param {Object} str 源字符串
 * @param {Object} cha 要查询的字符或字符串
 * @param {Object} num 第几次出现，第一次则为 0
 */
exports.findStrIndex = function (str, cha, num) {
  let x = str.indexOf(cha);
  for (let i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }
  return x;
};

// 返回
exports.ResultSuccess = (res, message, data) => {
  return res.json({
    successed: true,
    code: 200,
    data: data,
    message: message
  });
};
exports.ResultFail = (res, message, data, code) => {
  return res.json({
    successed: false,
    code: code ? code : 1001,
    data: data,
    message: message
  });
};
