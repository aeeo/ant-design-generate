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
  [{"title":"key","dataIndex":"key","valueType":"digit"},{"title":"id","dataIndex":"id","valueType":"digit"},{"title":"name","dataIndex":"name","valueType":"text"},{"title":"age","dataIndex":"age","valueType":"digit"},{"title":"createTime","dataIndex":"createTime","valueType":"digit"},{"title":"phone","dataIndex":"phone","valueType":"digit"}]
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
  {"bordered":true,"loading":false,"columns":[{"title":"key","dataIndex":"key","valueType":"digit"},{"title":"id","dataIndex":"id","valueType":"digit"},{"title":"name","dataIndex":"name","valueType":"text"},{"title":"age","dataIndex":"age","valueType":"digit"},{"title":"createTime","dataIndex":"createTime","valueType":"digit"},{"title":"phone","dataIndex":"phone","valueType":"digit"}],"pagination":{"show":true,"size":"small","pageSize":10,"current":1,"total":10},"size":"small","expandable":false,"headerTitle":"高级表格","tooltip":"高级表格 tooltip","showHeader":true,"footer":true,"rowSelection":true,"scroll":false,"hasData":true,"toolBarRender":true,"showSearch":true,"search":{"span":8,"collapseRender":true,"labelWidth":80,"filterType":"query","layout":"horizontal"},"options":{"show":true,"density":true,"fullScreen":true,"setting":true}}
