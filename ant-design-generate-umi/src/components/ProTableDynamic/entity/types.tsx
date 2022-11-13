import type { TablePaginationConfig } from 'antd';
// 数据类型
export const valueTypeArray = [
  { value: `option`, label: `操作按钮`, initialValue: '' },
  { value: `password`, label: `密码输入框`, initialValue: '123456' },
  { value: `money`, label: `金额输入`, initialValue: '123456' },
  { value: `textarea`, label: `文本域`, initialValue: '123456\n121212' },
  { value: `date`, label: `日期`, initialValue: Date.now() },
  { value: `dateTime`, label: `日期时间`, initialValue: Date.now() },
  { value: `dateWeek`, label: `周`, initialValue: Date.now() },
  { value: `dateMonth`, label: `月`, initialValue: Date.now() },
  { value: `dateQuarter`, label: `季度输入`, initialValue: Date.now() },
  { value: `dateYear`, label: `年份输入`, initialValue: Date.now() },
  { value: `dateRange`, label: `日期区间`, initialValue: [Date.now(), Date.now()] },
  { value: `dateTimeRange`, label: `日期时间区间`, initialValue: [Date.now(), Date.now()] },
  { value: `time`, label: `时间`, initialValue: Date.now() },
  { value: `timeRange`, label: `时间区间`, initialValue: [Date.now(), Date.now()] },
  { value: `text`, label: `文本框`, initialValue: '123456' },
  { value: `select`, label: `下拉框`, initialValue: 'open' },
  { value: 'treeSelect', label: '树形下拉框', initialValue: ['0-0', '0-0-0'] },
  { value: `checkbox`, label: `多选框`, initialValue: 'open' },
  { value: `rate`, label: `星级组件`, initialValue: '' },
  { value: `radio`, label: `单选框`, initialValue: 'open' },
  { value: `radioButton`, label: `按钮单选框`, initialValue: 'open' },
  { value: `progress`, label: `进度条`, initialValue: '10' },
  { value: `percent`, label: `百分比组件`, initialValue: '20' },
  { value: `digit`, label: `数字输入框`, initialValue: '200000' },
  { value: `second`, label: `秒格式化`, initialValue: 20000 },
  { value: `avatar`, label: `头像`, initialValue: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' },
  { value: `code`, label: `代码框`, initialValue: '# 2121' },
  { value: `switch`, label: `开关`, initialValue: 'open' },
  { value: `fromNow`, label: `相对于当前时间`, initialValue: Date.now() },
  { value: `image`, label: `图片`, initialValue: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' },
  { value: `jsonCode`, label: `JSON代码框`, initialValue: '{ "name":"qixian" }' },
  { value: `color`, label: `颜色选择器`, initialValue: '#1890ff' },
];
// 控件
export const formFieldArray = [
  { value: `ProFormText`, label: `文本框` },
  { value: `ProFormTextArea`, label: `文本域` },
  { value: `ProFormSelect`, label: `下拉列表` },
];
// 分页位置 不知道为什么配置上不生效
export type TablePaginationPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

export type ApiType = 'apiSelectList' | 'apiSelectDetail' | 'apiAdd' | 'apiUpdate' | 'apiDelete' | 'apiDeleteBatch';

export type ApiInfo = {
  url: string;
  method: 'Get' | 'Post';
  afterScript: string;
  parameter: Array<KeyValue>;
  body: object;
};

export type KeyValue = {
  key: string;
  value: string;
};

export type EventInfo = {
  type: EventType;
  tableRecord: TableRecord;
};

export type EventType = 'eventDetail' | 'eventEdit' | 'eventAdd' | 'eventUpdate' | 'eventDelete' | 'eventDeleteBatch';

export type TableRecord = {
  reactNode: React.ReactNode;
  record: object;
  index: number;
};
