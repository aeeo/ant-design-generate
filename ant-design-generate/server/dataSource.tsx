import request from 'umi-request';
import { Button, message } from 'antd';

export default async (type: string, url: string, method: string, afterScript: string) => {
  if (type == 'tableList') {
    const response = await request(url, { method });
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
