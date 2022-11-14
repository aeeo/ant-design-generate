import { request } from 'umi';
import { Button, message } from 'antd';
import { EventType, ApiType } from '../../entity/types';

export default async (type: ApiType, url: string, method: string, afterScript: string): Promise<any> => {
  let response = {};
  await request(url, { method })
    .then(function (res) {
      message.success('请求接口成功');
      response = res;
    })
    .catch(function (error) {
      message.error('出错了', error);
    });

  let returnData: any = {};
  // console.debug('执行脚本前数据', response, afterScript);
  try {
    // eslint-disable-next-line no-eval
    eval(afterScript);
  } catch (err) {
    message.error('后执行脚本出错。' + err);
    console.error('后执行脚本出错。', err);
  }
  // console.debug('执行脚本后数据', returnData);
  switch (type) {
    case 'apiSelectList': {
      return [returnData, returnData.length];
    }
    case 'apiSelectDetail': {
      return returnData;
    }
  }
};
