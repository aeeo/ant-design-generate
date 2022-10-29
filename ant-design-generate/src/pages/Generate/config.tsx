import { DownOutlined } from '@ant-design/icons';
import type { ProColumnType } from '@ant-design/pro-components';
// 初始数据列配置
export const columns: ProColumnType<any>[] = [
  { title: 'key', dataIndex: 'key', valueType: 'digit' },
  { title: 'id', dataIndex: 'id', valueType: 'digit' },
  { title: 'name', dataIndex: 'name', valueType: 'text' },
  { title: 'age', dataIndex: 'age', valueType: 'digit' },
  { title: 'createTime', dataIndex: 'createTime', valueType: 'digit' },
  { title: 'phone', dataIndex: 'phone', valueType: 'digit' },
];
// 生成初始数据
export const genData = (total: number) => {
  if (total < 1) {
    return [];
  }
  const tableDataList = [
    {
      key: 1,
      id: 1,
      name: '赵通1',
      age: 19,
      createTime: 1667046586317,
      phone: 18700871300,
    },
    {
      key: 2,
      id: 2,
      name: '赵通2',
      age: 19,
      createTime: 1667046586317,
      phone: 18700871300,
    },
    {
      key: 3,
      id: 3,
      name: '赵通3',
      age: 19,
      createTime: 1667046586317,
      phone: 18700871300,
    },
    {
      key: 4,
      id: 4,
      name: '赵通3',
      age: 19,
      createTime: 1667046586317,
      phone: 18700871300,
    },
    {
      key: 5,
      id: 5,
      name: '赵通3',
      age: 19,
      createTime: 1667046586317,
      phone: 18700871300,
    },
  ];
  const data: any[] = [];
  for (let i = 1; i <= total; i += 1) {
    data.push(tableDataList[i]);
  }
  return data;
};

// 初始化配置
export const initConfig = {
  bordered: true,
  loading: false,
  columns: [
    { title: 'key', dataIndex: 'key', valueType: 'digit' },
    { title: 'id', dataIndex: 'id', valueType: 'digit' },
    { title: 'name', dataIndex: 'name', valueType: 'text' },
    { title: 'age', dataIndex: 'age', valueType: 'digit' },
    { title: 'createTime', dataIndex: 'createTime', valueType: 'digit' },
    { title: 'phone', dataIndex: 'phone', valueType: 'digit' },
  ],
  pagination: { show: true, size: 'small', pageSize: 5, current: 1, total: 10 },
  size: 'small',
  expandable: false,
  headerTitle: '高级表格',
  tooltip: '高级表格 tooltip',
  showHeader: true,
  footer: true,
  rowSelection: true,
  scroll: false,
  hasData: true,
  toolBarRender: true,
  showSearch: true,
  search: {
    span: 8,
    collapseRender: true,
    labelWidth: 80,
    filterType: 'query',
    layout: 'horizontal',
  },
  options: { show: true, density: true, fullScreen: true, setting: true },
};
