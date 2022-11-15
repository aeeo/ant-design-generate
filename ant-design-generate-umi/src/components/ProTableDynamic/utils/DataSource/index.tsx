import { request } from 'umi';
import { Button, message } from 'antd';
import { EventType, ApiType } from '../../entity/types';
import type { ProColumnType, ProFormInstance } from '@ant-design/pro-components';

export const dataSource = async (type: ApiType, url: string, method: string, afterScript: string): Promise<any> => {
  let response = {};
  await request(url, { method })
    .then(
      (res) => {
        message.success('请求接口成功');
        response = res;
      },
      (err) => {
        message.error('请求接口失败,请检查数据源配置:' + JSON.stringify(err));
      },
    )
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

/** 处理表格列表数据，返回表格数据对应的columns信息
 * @returns
 */
export const dealApiSelectDetail = (data: any): ProColumnType<any>[] => {
  if (!data) return [];
  let tableColumn: ProColumnType<any>[] = []; // 表格的列信息
  // 处理数据（给数据赋title、valueType）
  Object.entries(data).forEach(([key, keyValue]) => {
    let commonColumn: any = { title: key, dataIndex: key, valueType: 'text', value: keyValue };
    if (typeof keyValue === 'string') {
      commonColumn.valueType = 'text';
    }
    if (typeof keyValue === 'number') {
      commonColumn.valueType = 'digit';
    }
    tableColumn.push(commonColumn);
  });
  return tableColumn;
};

/** 处理表格列表数据，返回表格数据对应的columns信息
 * @returns
 */
export const dealApiSelectList = (dataList: Array<any>): ProColumnType<any>[] => {
  // 获取响应数据的第一条
  const dataFirst = dataList.length > 0 ? dataList[0] : undefined;
  if (!dataFirst) return [];
  return dealApiSelectDetail(dataFirst);
};
