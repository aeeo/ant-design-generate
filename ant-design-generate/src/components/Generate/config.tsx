import { DownOutlined } from '@ant-design/icons';
import type { ProColumnType } from '@ant-design/pro-components';
import { TablePaginationPosition, ColumnParams } from '../../entity/types';
import { message } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import IconsDynamic from './subComps/IconsDynamic';

const staticColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    hideInTable: false,
    hideInSearch: false,
    sorter: true,
  },
  {
    title: '时间',
    dataIndex: 'time',
    valueType: 'date',
    hideInTable: false,
    hideInSearch: false,
    sorter: true,
  },
  {
    title: '地址',
    dataIndex: 'address',
    valueType: 'select',
    hideInTable: false,
    hideInSearch: false,
    sorter: true,
    filters: true,
    onFilter: true,
    valueEnum: {
      陕西: {
        text: '陕西',
      },
      广东: {
        text: '广东',
      },
    },
  },
  {
    title: '操作',
    key: 'table-operation',
    valueType: 'option',
    render: (_: React.ReactNode, entity: any, index: number) => [
      <a key="delete">删除</a>,
      <a key="link" className="ant-dropdown-link">
        更多 <DownOutlined />
      </a>,
    ],
  },
];
// 初始数据列配置
export const genColumns = (columnParams: ColumnParams) => {
  if (!columnParams) return staticColumns;
  const tableColumns =
    [
      { title: 'id', dataIndex: 'id', valueType: 'digit' },
      { title: '姓名', dataIndex: 'name', valueType: 'text' },
      { title: 'age', dataIndex: 'age', valueType: 'digit' },
      { title: 'createTime', dataIndex: 'createTime', valueType: 'digit' },
      { title: 'phone', dataIndex: 'phone', valueType: 'digit' },
      {
        title: '操作',
        dataIndex: 'table-operation',
        valueType: 'option',
        render: (_: React.ReactNode, entity: any, index: number) => {
          return [<IconsDynamic onEvent={columnParams.onEvent} columnRender={{ reactNode: _, entity, index, type: 'detail' }} />];
        },
      },
    ] ?? staticColumns;
  return tableColumns;
};

// 生成初始数据
export const genData = (total: number) => {
  if (total < 1) {
    return [];
  }
  const tableDataList = [
    { key: 1, id: 1, name: '赵通1', age: 19, createTime: 1667746017623, phone: 18700871300 },
    { key: 2, id: 2, name: '赵通2', age: 19, createTime: 1667746017623, phone: 18700871300 },
    { key: 3, id: 3, name: '赵通3', age: 19, createTime: 1667746017623, phone: 18700871300 },
    { key: 4, id: 4, name: '赵通4', age: 19, createTime: 1667746017623, phone: 18700871300 },
    { key: 5, id: 5, name: '赵通5', age: 19, createTime: 1667746017623, phone: 18700871300 },
    { key: 6, id: 6, name: '赵通6', age: 19, createTime: 1667746017623, phone: 18700871300 },
    { key: 7, id: 7, name: '赵通7', age: 19, createTime: 1667746017623, phone: 18700871300 },
    { key: 8, id: 8, name: '赵通8', age: 19, createTime: 1667746017623, phone: 18700871300 },
    { key: 9, id: 9, name: '赵通9', age: 19, createTime: 1667746017623, phone: 18700871300 },
    { key: 10, id: 10, name: '赵通10', age: 19, createTime: 1667746017623, phone: 18700871300 },
  ];
  if (tableDataList.length < total) {
    message.error('数据量不足，请减小分页大小');
    return;
  }
  const data: any[] = [];
  for (let i = 0; i < total; i += 1) {
    data.push(tableDataList[i]);
  }
  return data;
};

// 初始化配置
export const initConfig = {
  event: { showEditModal: false, showDetailModal: false },
  bordered: true,
  size: 'small',
  loading: false,
  showHeader: true,
  footer: true,
  expandable: false,
  rowSelection: true,
  toolBarRender: true,
  headerTitle: '高级表格',
  tooltip: '高级表格 tooltip',
  options: { show: true, density: true, fullScreen: true, setting: true },
  showSearch: true,
  search: { collapseRender: true, span: 8, layout: 'horizontal', filterType: 'query' },
  showPagination: true,
  pagination: { size: 'small', current: 1, pageSize: 5, total: 10 },
  columns: genColumns({ onEvent: () => {} }),
};
