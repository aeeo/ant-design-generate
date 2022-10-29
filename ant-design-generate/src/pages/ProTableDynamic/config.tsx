import { DownOutlined } from '@ant-design/icons';
import type { ProColumnType } from '@ant-design/pro-components';
import { message } from 'antd';
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
  ];
///结束1
// 生成初始数据
export const genData = (total: number) => {
  if (total < 1) {
    return [];
  }
  ///开始3
  const tableDataList = [
    {
      key: 1,
      name: 'John Brown',
      age: 11,
      time: 1661136794649,
      address: 'New York',
      description:
        'My name is John Brown, I am 12 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'John Brown',
      age: 12,
      time: 1661136795649,
      address: 'london',
      description:
        'My name is John Brown, I am 22 years old, living in New York No. 2 Lake Park.',
    },
    {
      key: 3,
      name: 'John Brown',
      age: 13,
      time: 1661136796649,
      address: 'New York',
      description:
        'My name is John Brown, I am 32 years old, living in New York No. 3 Lake Park.',
    },
    {
      key: 4,
      name: 'John Brown',
      age: 14,
      time: 1661136797649,
      address: 'london',
      description:
        'My name is John Brown, I am 42 years old, living in New York No. 4 Lake Park.',
    },
    {
      key: 5,
      name: 'John Brown',
      age: 15,
      time: 1661136798649,
      address: 'New York',
      description:
        'My name is John Brown, I am 52 years old, living in New York No. 5 Lake Park.',
    },
    {
      key: 6,
      name: 'John Brown',
      age: 16,
      time: 1661136799649,
      address: 'london',
      description:
        'My name is John Brown, I am 62 years old, living in New York No. 6 Lake Park.',
    },
    {
      key: 7,
      name: 'John Brown',
      age: 17,
      time: 1661136800649,
      address: 'New York',
      description:
        'My name is John Brown, I am 72 years old, living in New York No. 7 Lake Park.',
    },
    {
      key: 8,
      name: 'John Brown',
      age: 18,
      time: 1661136801649,
      address: 'london',
      description:
        'My name is John Brown, I am 82 years old, living in New York No. 8 Lake Park.',
    },
    {
      key: 9,
      name: 'John Brown',
      age: 19,
      time: 1661136802649,
      address: 'New York',
      description:
        'My name is John Brown, I am 92 years old, living in New York No. 9 Lake Park.',
    },
    {
      key: 10,
      name: 'John Brown',
      age: 20,
      time: 1661136803649,
      address: 'london',
      description:
        'My name is John Brown, I am 102 years old, living in New York No. 10 Lake Park.',
    },
  ];
  ///结束3
  if (tableDataList.length < total) {
    console.error('数据量不足，请减小分页大小');
    message.error('数据量不足，请减小分页大小');
  }
  const data: any[] = [];
  for (let i = 1; i <= total; i += 1) {
    data.push(tableDataList[i]);
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
      size: 'small', // 显示 default small
      pageSize: 5, // 分页大小
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
