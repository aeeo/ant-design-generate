/** 替换字符串中的标签
 * @param regExpArr 正则数组
 * @param str 要替换的字符串
 * @param replaceStr 要替换成的字符串
 */
export const replaceStringByRegExp = (regExp: string, str: string, replaceStr: string) => {
  const pattern = `${regExp}`;
  const runRegExp = new RegExp(pattern, 'g');
  str = str.replace(runRegExp, replaceStr);
  return str;
};

/** 替换字符串中的标签
 * @param regExpArr 正则数组
 * @param str 要替换的字符串
 * @param replaceStr 要替换成的字符串
 */
export const replaceStringByRegExpArr = (regExpArr: string[], str: string, replaceStr: string) => {
  for (const i in regExpArr) {
    const regExp = regExpArr[i];
    str = replaceStringByRegExp(regExp, str, replaceStr);
  }
  return str;
};
