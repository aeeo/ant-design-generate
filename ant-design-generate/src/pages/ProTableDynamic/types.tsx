import type { TablePaginationConfig } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
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
// 分页位置 不知道为什么配置上不生效
export type TablePaginationPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
// // 初始化配置
// export interface config {
//   bordered: boolean; // 显示表格边框
//   loading: boolean; // 加载中
//   columns: ProColumns; // 表格的列
//   pagination: TablePaginationConfig;
//   size: 'small'; // 尺寸 default | middle | small
//   expandable: false; // 显示扩展列表
//   headerTitle: '高级表格'; // 头部标题
//   tooltip: '高级表格 tooltip'; // 提示框
//   showHeader: true; // 显示表头
//   footer: true; // 显示底脚
//   rowSelection: true; // 多选框
//   scroll: false; // 滚动
//   hasData: true; //
//   tableLayout: undefined; // 表格布局 - | auto | fixed	无 固定表头/列或使用了 column.ellipsis 时，默认值为 fixed
//   toolBarRender: true; // 显示工具栏
//   // 筛选表单 {} OR false:隐藏
//   showSearch: true;
//   search: {
//     span: 8; // 栅格
//     collapseRender: true; // 显示展开表单
//     labelWidth: 80; // label宽度
//     filterType: 'query'; // 表单类型 query:默认 light:轻量
//     layout: 'horizontal'; // 布局 horizontal:水品 vertical:垂直
//   };
//   // 工具栏
//   options: {
//     show: true; // 显示
//     density: true; // 显示紧凑按钮
//     fullScreen: true; // 显示全屏按钮
//     setting: true; // 显示设置按钮
//   };
// }
