import { ProForm } from '@ant-design/pro-components';
import { Switch } from 'antd';
import ProFormItemDynamic from '../ProFormItemDynamic';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ProFormDynamic = (props: any) => {
  // 处理数据
  const dealFormFields = (formFields: any[]) => {
    if (!formFields || Object.keys(formFields).length === 0) return [];
    formFields.forEach((formField: any) => {
      formField.formFieldType = formField.formFieldType ?? 'ProFormText'; // 默认赋formFieldType类型为ProFormText
      formField.placeholder = formField.placeholder ?? '请输入';
      formField.tooltip = formField.tooltip ?? '';
    });
    return formFields;
  };

  const formFields = dealFormFields(props.columns);

  const [readonly, setReadonly] = useState(false);
  const [formData, setFormData] = useState<any>({});
  console.debug('ProFormDynamic', formFields);
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
        layout="horizontal"
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
