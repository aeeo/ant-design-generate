import ProFormDynamicSettings from '../../components/ProFormDynamicSettings';

// 初始数据列
const myColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    hideInTable: false,
    hideInSearch: false,
    sorter: true,
    hideInDetailForm: false,
  },
  {
    title: '时间',
    dataIndex: 'time',
    valueType: 'date',
    hideInTable: false,
    hideInSearch: false,
    sorter: true,
    hideInDetailForm: false,
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
    hideInDetailForm: false,
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
    dataIndex: 'table-operation',
    valueType: 'option',
  },
];
const proFormDynamicSettingsPage = (props: any) => {
  return <ProFormDynamicSettings columns={myColumns} />;
};

export default proFormDynamicSettingsPage;
