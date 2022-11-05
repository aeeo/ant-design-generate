import { ProForm } from '@ant-design/pro-components';
import { Switch } from 'antd';
import MyFormItem from '../ProFormItem';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ProFormDynamic = (props: any) => {
  const [readonly, setReadonly] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const formFields = props.formFields;
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
          console.log(values);
        }}
        onFinish={async (value) => console.log(value)}
      >
        {formFields?.map((formFieldInfo: any, index: number) => {
          return <MyFormItem formFieldInfo={formFieldInfo} key={index} />;
        })}
      </ProForm>
    </>
  );
};
ProFormDynamic.propTypes = {
  formFields: PropTypes.array,
};
export default ProFormDynamic;
