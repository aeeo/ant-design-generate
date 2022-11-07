import { request } from 'umi';
import { Button, message } from 'antd';

export default async (
  type: string,
  url: string,
  method: string,
  afterScript: string,
) => {
  if (type === 'tableList') {
    const response = await request(url, { method })
      .then(function (response) {
        if (response && response.successed) {
          message.success('请求成功');
        } else {
          message.error('出错了');
        }
      })
      .catch(function (error) {
        message.error('出错了');
      });
    let data = {};
    let total = 10;
    try {
      eval(afterScript);
    } catch (err) {
      message.error('后执行脚本出错。');
      return undefined;
    }
    return [data, total];
  }
  return undefined;
};
