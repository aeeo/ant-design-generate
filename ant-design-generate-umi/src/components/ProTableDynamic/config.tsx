import { OperationDynamic } from './utils/OperationDynamic';
import type { ProColumns } from '@ant-design/pro-components';
import { ApiType, EventInfo } from '../ProTableDynamic/entity/types';
import { message } from 'antd';

const staticColumns = (onEvent: (eventInfo: EventInfo) => void): any[] => {
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
      render: (_: React.ReactNode, record: any, index: number) => {
        return OperationDynamic(['eventDetail', 'eventEdit', 'eventDelete'], onEvent, { reactNode: _, record, index });
      },
    },
  ];
};

// 生成初始数据
export const genData = (total: number) => {
  if (total < 1) {
    return [];
  }
  ///开始3
  const tableDataList = [];
  for (let i = 1; i <= total; i += 1) {
    tableDataList.push({
      key: i,
      name: '佩奇',
      age: i + 10,
      time: 1661136793649 + i * 1000,
      address: i % 2 === 0 ? '广东' : '陕西',
      description: `我的名字是佩奇，我今年 ${i} 岁了，我生活在${i % 2 === 0 ? '广东' : '陕西'}。`,
    });
  }
  ///结束3
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
export const genColumns = (onEvent: (eventInfo: EventInfo) => void, columns?: ProColumns<any, 'text'>[]): any[] => {
  ///开始1
  // console.debug('genColumns', onEvent);
  const tableColumns = columns ?? staticColumns(onEvent);
  ///结束1
  return tableColumns;
};

// 初始化配置
export const initConfig = (onEvent: (eventInfo: EventInfo) => void): object => {
  ///开始2
  return {
    event: {
      showEditModal: false, // 显示编辑Modal
      showDetailModal: false, // 显示详情Modal
    },
    bordered: true, // 显示表格边框
    loading: false, // 加载中
    columns: genColumns(onEvent), // 表格的列
    size: 'small', // 尺寸 default | middle | small
    expandable: true, // 显示表格展开扩展列表

    showFooter: true, // 显示footer
    footerTitle: '表格Footer', // 表格Footer
    showHeader: true, // 显示表头
    rowSelection: true, // 多选框

    openScroll: false, // 开启滚动
    scroll: { x: 1200, y: 200 }, // 横向滚动 纵向滚动高度

    hasData: true, //
    tableLayout: 'auto', // 表格布局 - | auto | fixed	无 固定表头/列或使用了 column.ellipsis 时，默认值为 fixed
    showSearch: true, // 筛选表单 true:显示 false:隐藏
    search: {
      span: 8, // 栅格
      collapseRender: true, // 显示展开表单
      labelWidth: 80, // label宽度
      filterType: 'query', // 表单类型 query:默认 light:轻量
      layout: 'horizontal', // 布局 horizontal:水品 vertical:垂直
    },
    // 工具栏
    toolBarRender: true, // 显示工具栏
    options: {
      search: true,
      show: true, // 显示
      density: true, // 显示紧凑按钮
      fullScreen: true, // 显示全屏按钮
      setting: true, // 显示设置按钮
    },
    headerTitle: '标题', // 表格头部标题
    headerTooltip: '标题 tooltip', // 表格头部标题 tooltip

    showPagination: true, // 显示分页
    pagination: {
      position: 'bottomLeft', // 位置 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
      size: 'small', // 显示 default small
      pageSize: 8, // 分页大小
      current: 1, // 当前页
      total: 10, // 总条数
    },

    // 数据源配置
    dataSource: {
      apiList: {
        apiSelectList: {
          url: '',
          method: '',
          afterScript: '',
          parameter: '',
          body: '',
        },
        apiSelectDetail: {
          url: '',
          method: '',
          afterScript: '',
          parameter: '',
          body: '',
        },
        apiAdd: {
          url: '',
          method: '',
          afterScript: '',
          parameter: '',
          body: '',
        },
        apiUpdate: {
          url: '',
          method: '',
          afterScript: '',
          parameter: '',
          body: '',
        },
        apiDelete: {
          url: '',
          method: '',
          afterScript: '',
          parameter: '',
          body: '',
        },
        apiDeleteBatch: {
          url: '',
          method: '',
          afterScript: '',
          parameter: '',
          body: '',
        },
      },
    },
  };
  ///结束2
};
