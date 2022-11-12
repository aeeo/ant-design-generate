import { ProForm } from '@ant-design/pro-components';
import { Switch } from 'antd';
import ProFormItemDynamic from '../ProFormItemDynamic';
import { useState } from 'react';
import PropTypes from 'prop-types';

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
    title: '住址',
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
    key: 'table-operation',
    valueType: 'option',
  },
];

const ProFormDynamic = (props: any) => {
  // 处理数据
  const dealFormFields = (formFields: any) => {
    formFields.forEach((formField: any) => {
      // 默认赋formFieldType类型为ProFormText
      formField.formFieldType = 'ProFormText';
      formField.placeholder = '请输入';
      formField.tooltip = '';
    });
    return formFields;
  };

  const formFields = dealFormFields(props.columns ? props.columns : myColumns);

  const [readonly, setReadonly] = useState(false);
  const [formData, setFormData] = useState<any>({});
  console.debug('ProFormItemDynamic', formFields);

  return (
    <>
      <Switch
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="编辑"
        unCheckedChildren="只读"
        onChange={setReadonly}
      />
      <ProForm
        readonly={readonly}
        name="validate_other"
        initialValues={formData}
        onValuesChange={(_, values) => {
          console.debug(values);
        }}
        onFinish={async (value) => console.debug(value)}
      >
        {formFields?.map((formFieldInfo: any, index: number) => {
          return <ProFormItemDynamic formFieldInfo={formFieldInfo} key={index} />;
        })}
      </ProForm>
    </>
  );
};
ProFormDynamic.propTypes = {
  columns: PropTypes.array,
};
export default ProFormDynamic;
