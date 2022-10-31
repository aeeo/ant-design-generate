import {
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormDigitRange,
  ProFormGroup,
  ProFormTextArea,
  ProFormRadio,
  ProFormRate,
  ProFormSegmented,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { Switch } from 'antd';
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

const MyFormItem = (props: any) => {
  const formFieldInfo = props.formFieldInfo;
  console.log('表单项：', formFieldInfo);
  const name = formFieldInfo.dataIndex;
  let returnComponent = <></>;
  if (!name) {
    console.error('name不能为空。');
    return returnComponent;
  }
  const formFieldProp = { ...formFieldInfo, name, label: formFieldInfo.title, placeholder: formFieldInfo.placeholder };
  if (!formFieldInfo?.formFieldType) return returnComponent;
  switch (formFieldInfo.formFieldType) {
    case 'ProFormText':
      returnComponent = <ProFormText width="md" {...formFieldProp} />;
      break;
    case 'ProFormTextArea':
      returnComponent = <ProFormTextArea width="md" {...formFieldProp} />;
      break;
    case 'ProFormTextPassword':
      returnComponent = <ProFormText.Password width="md" {...formFieldProp} />;
      break;
    case 'ProFormSelect':
      returnComponent = (
        <ProFormSelect
          {...formFieldProp}
          valueEnum={{
            china: 'China',
            usa: 'U.S.A',
          }}
          placeholder="Please select a country"
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
      );
      break;
    case 'ProFormSelectAsync':
      returnComponent = (
        <ProFormSelect
          width="md"
          fieldProps={{
            labelInValue: true,
          }}
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
          {...formFieldProp}
        />
      );
      break;
    case 'ProFormSelectMultiple':
      returnComponent = (
        <ProFormSelect
          {...formFieldProp}
          valueEnum={{
            red: 'Red',
            green: 'Green',
            blue: 'Blue',
          }}
          fieldProps={{
            mode: 'multiple',
          }}
          placeholder="Please select favorite colors"
          rules={[{ required: true, message: 'Please select your favorite colors!', type: 'array' }]}
        />
      );
      break;
    case 'ProFormRadioGroup':
      returnComponent = (
        <ProFormRadio.Group
          {...formFieldProp}
          options={[
            {
              label: 'item 1',
              value: 'a',
            },
            {
              label: 'item 2',
              value: 'b',
            },
            {
              label: 'item 3',
              value: 'c',
            },
          ]}
        />
      );
      break;
    case 'ProFormRadioGroupVertical':
      returnComponent = (
        <ProFormRadio.Group
          {...formFieldProp}
          layout="vertical"
          options={[
            {
              label: 'item 1',
              value: 'a',
            },
            {
              label: 'item 2',
              value: 'b',
            },
            {
              label: 'item 3',
              value: 'c',
            },
          ]}
        />
      );
      break;
    case 'ProFormRadioGroupButton':
      returnComponent = (
        <ProFormRadio.Group
          {...formFieldProp}
          radioType="button"
          options={[
            {
              label: 'item 1',
              value: 'a',
            },
            {
              label: 'item 2',
              value: 'b',
            },
            {
              label: 'item 3',
              value: 'c',
            },
          ]}
        />
      );
      break;
    case 'ProFormCheckboxGroup':
      returnComponent = <ProFormCheckbox.Group {...formFieldProp} options={['A', 'B', 'C', 'D', 'E', 'F']} />;
      break;
    case 'ProFormDigitRange':
      returnComponent = <ProFormDigitRange {...formFieldProp} separator="-" separatorWidth={60} />;
      break;
    case 'ProFormDigit':
      returnComponent = <ProFormDigit {...formFieldProp} width="sm" min={1} max={10} />;
      break;
    case 'ProFormSwitch':
      returnComponent = <ProFormSwitch {...formFieldProp} />;
      break;
    case 'ProFormSlider':
      returnComponent = (
        <ProFormSlider
          {...formFieldProp}
          width="lg"
          marks={{
            0: 'A',
            20: 'B',
            40: 'C',
            60: 'D',
            80: 'E',
            100: 'F',
          }}
        />
      );
      break;
    case 'ProFormRate':
      returnComponent = <ProFormRate {...formFieldProp} />;
      break;
    case 'ProFormUploadButton':
      returnComponent = <ProFormUploadButton {...formFieldProp} />;
      break;
    case 'ProFormUploadDragger':
      returnComponent = <ProFormUploadDragger {...formFieldProp} />;
      break;
    case 'ProFormSegmented':
      returnComponent = (
        <ProFormSegmented
          {...formFieldProp}
          valueEnum={{
            open: '未解决',
            closed: '已解决',
          }}
        />
      );
      break;
    case 'ProFormSegmentedAsync':
      returnComponent = (
        <ProFormSegmented
          {...formFieldProp}
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
        />
      );
      break;
  }
  return returnComponent;
};
MyFormItem.propTypes = {
  formFieldInfo: PropTypes.object,
};
export default MyFormItem;
