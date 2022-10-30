import { ProForm } from '@ant-design/pro-components';
import { Switch } from 'antd';
import MyFormItem from './MyFormField';
// import Mock from 'mockjs';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const ProFormItemDynamic = (props: any) => {
  const [readonly, setReadonly] = useState(false);
  const [formFields] = useState(props.formFields);
  console.log('---');

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
        initialValues={{
          name: 'qixian',
          password: '1ixian',
          select: 'china',
          select2: '520000201604258831',
          useMode: { label: '未解决', value: 'open', key: 'open' },
          'select-multiple': ['green', 'blue'],
          radio: 'a',
          'radio-vertical': 'b',
          'radio-button': 'b',
          'checkbox-group': ['A', 'B', 'C'],
          'input-number-range': [2, 4],
          'input-number': 3,
          switch: true,
          slider: 66,
          rate: 3.5,
          segmented: 'open',
          segmented2: 'open',
        }}
        onValuesChange={(_, values) => {
          console.log(values);
        }}
        onFinish={async (value) => console.log(value)}
      >
        {formFields.map((formFieldInfo: any, index: number) => {
          return <MyFormItem formFieldInfo={formFieldInfo} key={index} />;
        })}
      </ProForm>
    </>
  );
};
ProFormItemDynamic.propTypes = {
  formFields: PropTypes.array,
};
export default ProFormItemDynamic;
