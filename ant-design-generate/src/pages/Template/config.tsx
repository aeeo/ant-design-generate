import { DownOutlined } from '@ant-design/icons';
import type { ProColumnType } from '@ant-design/pro-components';
// 数据类型
export const valueTypeArray = [
  'password',
  'money',
  'textarea',
  'option',
  'date',
  'dateWeek',
  'dateMonth',
  'dateQuarter',
  'dateYear',
  'dateRange',
  'dateTimeRange',
  'dateTime',
  'time',
  'timeRange',
  'text',
  'select',
  'checkbox',
  'rate',
  'radio',
  'radioButton',
  'index',
  'indexBorder',
  'progress',
  'percent',
  'digit',
  'second',
  'avatar',
  'code',
  'switch',
  'fromNow',
  'image',
  'jsonCode',
];

// 初始数据列配置
export const columns: ProColumnType<any>[] =
  ///开始1
  [
    {
      title: 'Name',
      dataIndex: 'name',
      hideInTable: false,
      hideInSearch: false,
    },
    {
      title: 'time',
      dataIndex: 'time',
      valueType: 'date',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      valueType: 'select',
      filters: true,
      onFilter: true,
      valueEnum: {
        london: {
          text: '伦敦',
        },
        'New York': {
          text: '纽约',
        },
      },
    },
    {
      title: 'Action',
      key: 'action',
      sorter: true,
      valueType: 'option',
      render: () => [
        <a key="delete">Delete</a>,
        <a key="link" className="ant-dropdown-link">
          More actions <DownOutlined />
        </a>,
      ],
    },
  ]; ///结束1
// 生成初始数据
export const genData = (total: number) => {
  if (total < 1) {
    return [];
  }
  const data: any[] = [];
  for (let i = 1; i <= total; i += 1) {
    data.push({
      key: i,
      name: 'John Brown',
      age: i + 10,
      time: 1661136793649 + i * 1000,
      address: i % 2 === 0 ? 'london' : 'New York',
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }
  return data;
};

// 初始化配置
export const initConfig =
  ///开始2
  {
    bordered: true, // 显示表格边框
    loading: false, // 加载中
    columns, // 表格的列
    // 分页
    pagination: {
      show: true, // 显示
      pageSize: 10, // 分页大小
      current: 1, // 当前页
      total: 10, // 总条数
    },
    size: 'small', // 尺寸 default | middle | small
    expandable: false, // 显示扩展列表
    headerTitle: '高级表格', // 头部标题
    tooltip: '高级表格 tooltip', // 提示框
    showHeader: true, // 显示表头
    footer: true, // 显示底脚
    rowSelection: true, // 多选框
    scroll: false, // 滚动
    hasData: true, //
    tableLayout: undefined, // 表格布局 - | auto | fixed	无 固定表头/列或使用了 column.ellipsis 时，默认值为 fixed
    toolBarRender: true, // 显示工具栏
    // 筛选表单 {} OR false:隐藏
    showSearch: true,
    search: {
      span: 8, // 栅格
      collapseRender: true, // 显示展开表单
      labelWidth: 80, // label宽度
      filterType: 'query', // 表单类型 query:默认 light:轻量
      layout: 'horizontal', // 布局 horizontal:水品 vertical:垂直
    },
    // 工具栏
    options: {
      show: true, // 显示
      density: true, // 显示紧凑按钮
      fullScreen: true, // 显示全屏按钮
      setting: true, // 显示设置按钮
    },
  };
///结束2
