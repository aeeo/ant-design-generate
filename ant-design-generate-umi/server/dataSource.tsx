import { request } from 'umi';
import { Button, message } from 'antd';

export default async (type: string, url: string, method: string, afterScript: string): Promise<[any[], number]> => {
  let data: any[] = [];
  switch (type) {
    case 'tableList':
      await request(url, { method })
        .then(function (response) {
          if (response && response.successed) {
            data = response.data;
            message.success('请求成功');
          } else {
            message.error('出错了');
          }
        })
        .catch(function (error) {
          message.error('出错了', error);
        });
      break;
  }
  // console.debug('数据', data);
  try {
    // eslint-disable-next-line no-eval
    eval(afterScript);
    return [data, data.length];
  } catch (err) {
    message.error('后执行脚本出错。' + err);
    console.error('后执行脚本出错。', err);
  }
  return [[], 0];
};
