import { request } from 'umi';
import { Button, message } from 'antd';
import { EventType, ApiType } from '../../entity/types';

export default async (type: ApiType, url: string, method: string, afterScript: string): Promise<any> => {
  switch (type) {
    case 'apiSelectList': {
      let data: any[] = [];
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
      // console.debug('数据', data);
      try {
        // eslint-disable-next-line no-eval
        eval(afterScript);
      } catch (err) {
        message.error('后执行脚本出错。' + err);
      }
      return [data, data.length];
    }
    case 'apiSelectDetail': {
      let data: any = {};
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
      // console.debug('数据', data);
      try {
        // eslint-disable-next-line no-eval
        eval(afterScript);
      } catch (err) {
        message.error('后执行脚本出错。' + err);
      }
      return data;
    }
    default:
      message.error('数据源类型错误' + type);
      return {};
  }
};
