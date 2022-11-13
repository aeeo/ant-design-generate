import IconsDynamic from './subComps/IconsDynamic';
import { OperationDynamic } from './utils/OperationDynamic';
import type { ProColumns } from '@ant-design/pro-components';

import { message } from 'antd';

const staticColumns = (onEvent: (dom: React.ReactNode, entity: any, index: number, type: string) => void): any[] => {
  return [
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
      title: '住址',
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
      dataIndex: 'table-operation', // 防止后端字段重名
      valueType: 'option',
      render: (_: React.ReactNode, entity: any, index: number) => {
        return OperationDynamic(['detail', 'edit', 'delete'], onEvent, { reactNode: _, entity, index });
      },
    },
  ];
};

// 生成初始数据
export const genData = (total: number) => {
  if (total < 1) {
    return [];
  }
  const tableDataList = [
    { key: 1, id: 1, name: '赵通1', age: 19, createTime: 1668313772840, phone: 18700871300 },
    { key: 2, id: 2, name: '赵通2', age: 19, createTime: 1668313772840, phone: 18700871300 },
    { key: 3, id: 3, name: '赵通3', age: 19, createTime: 1668313772840, phone: 18700871300 },
    { key: 4, id: 4, name: '赵通4', age: 19, createTime: 1668313772840, phone: 18700871300 },
    { key: 5, id: 5, name: '赵通5', age: 19, createTime: 1668313772840, phone: 18700871300 },
    { key: 6, id: 6, name: '赵通6', age: 19, createTime: 1668313772840, phone: 18700871300 },
    { key: 7, id: 7, name: '赵通7', age: 19, createTime: 1668313772840, phone: 18700871300 },
    { key: 8, id: 8, name: '赵通8', age: 19, createTime: 1668313772840, phone: 18700871300 },
    { key: 9, id: 9, name: '赵通9', age: 19, createTime: 1668313772840, phone: 18700871300 },
    { key: 10, id: 10, name: '赵通10', age: 19, createTime: 1668313772840, phone: 18700871300 },
  ];
  if (tableDataList.length < total) {
    message.error('数据量不足，请减小分页大小。');
    return;
  }
  const data: any[] = [];
  for (let i = 0; i < total; i += 1) {
    data.push(tableDataList[i]);
  }
  return data;
};
// 初始数据列配置
export const genColumns = (onEvent: (dom: React.ReactNode, entity: any, index: number, type: string) => void, columns?: ProColumns<any, 'text'>[]): any[] => {
  // if (!columnParams) return staticColumns(columnParams);
  const tableColumns =
    [
      { title: 'key', dataIndex: 'key', valueType: 'digit', formFieldType: 'ProFormText', placeholder: '请输入', tooltip: '' },
      { title: 'id', dataIndex: 'id', valueType: 'digit', formFieldType: 'ProFormText', placeholder: '请输入', tooltip: '' },
      { title: 'name', dataIndex: 'name', valueType: 'text', formFieldType: 'ProFormText', placeholder: '请输入', tooltip: '' },
      { title: 'age', dataIndex: 'age', valueType: 'digit', formFieldType: 'ProFormText', placeholder: '请输入', tooltip: '' },
      { title: 'createTime', dataIndex: 'createTime', valueType: 'digit', formFieldType: 'ProFormText', placeholder: '请输入', tooltip: '' },
      { title: 'phone', dataIndex: 'phone', valueType: 'digit', formFieldType: 'ProFormText', placeholder: '请输入', tooltip: '' },
      {
        title: '操作',
        dataIndex: 'table-operation',
        valueType: 'option',
        render: (_: React.ReactNode, entity: any, index: number) => {
          return OperationDynamic(['detail', 'edit', 'delete'], onEvent, { reactNode: _, entity, index });
        },
      },
    ] ?? staticColumns;
  return tableColumns;
};

// 初始化配置
export const initConfig = (onEvent: (dom: React.ReactNode, entity: any, index: number, type: string) => void): object => {
  return {
    event: { showEditModal: false, showDetailModal: false },
    bordered: true,
    loading: false,
    columns: genColumns(onEvent),
    size: 'small',
    expandable: true,
    headerTitle: '表格头部标题',
    headerTooltip: '表格头部标题 tooltip',
    showFooter: true,
    footerTitle: '表格Footer',
    showHeader: true,
    footer: true,
    rowSelection: true,
    openScroll: false,
    scroll: { x: 1200, y: 200 },
    hasData: true,
    tableLayout: 'auto',
    toolBarRender: true,
    showSearch: true,
    search: { span: 8, collapseRender: true, labelWidth: 80, filterType: 'query', layout: 'horizontal' },
    options: { search: true, show: true, density: true, fullScreen: true, setting: true },
    showPagination: true,
    pagination: { position: 'bottomLeft', size: 'small', pageSize: 8, current: 1, total: 10 },
    dataSource: {
      apiList: {
        apiSelectList: { url: '', method: '', afterScript: '' },
        apiSelectDetail: { url: '', method: '', afterScript: '' },
        apiAdd: { url: '', method: '', afterScript: '' },
        apiUpdate: { url: '', method: '', afterScript: '' },
        apiDelete: { url: '', method: '', afterScript: '' },
        apiDeleteBatch: { url: '', method: '', afterScript: '' },
      },
    },
  };
};
