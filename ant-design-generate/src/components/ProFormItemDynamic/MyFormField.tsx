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
  let returnComponent = <></>;
  if (!formFieldInfo?.formFieldType) return returnComponent;
  switch (formFieldInfo.formFieldType) {
    case 'ProFormText':
      returnComponent = <ProFormText width="md" name="name" label={formFieldInfo.title} />;
      break;
    case 'ProFormTextArea':
      returnComponent = <ProFormTextArea width="md" name="text" label={formFieldInfo.title} placeholder="请输入名称" />;
      break;
    case 'ProFormTextPassword':
      returnComponent = <ProFormText.Password width="md" name="password" label={formFieldInfo.title} />;
      break;
    case 'ProFormSelect':
      returnComponent = (
        <ProFormSelect
          name="select"
          label={formFieldInfo.title}
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
          name="useMode"
          label={formFieldInfo.title}
        />
      );
      break;
    case 'ProFormSelectMultiple':
      returnComponent = (
        <ProFormSelect
          name="select-multiple"
          label={formFieldInfo.title}
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
          name="radio"
          label={formFieldInfo.title}
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
          name="radio-vertical"
          layout="vertical"
          label={formFieldInfo.title}
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
          name="radio-button"
          label={formFieldInfo.title}
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
      returnComponent = <ProFormCheckbox.Group name="checkbox-group" label={formFieldInfo.title} options={['A', 'B', 'C', 'D', 'E', 'F']} />;
      break;
    case 'ProFormDigitRange':
      returnComponent = <ProFormDigitRange label={formFieldInfo.title} name="input-number-range" separator="-" separatorWidth={60} />;
      break;
    case 'ProFormDigit':
      returnComponent = <ProFormDigit label={formFieldInfo.title} name="input-number" width="sm" min={1} max={10} />;
      break;
    case 'ProFormSwitch':
      returnComponent = <ProFormSwitch name="switch" label={formFieldInfo.title} />;
      break;
    case 'ProFormSlider':
      returnComponent = (
        <ProFormSlider
          name="slider"
          label={formFieldInfo.title}
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
      returnComponent = <ProFormRate name="rate" label={formFieldInfo.title} />;
      break;
    case 'ProFormUploadButton':
      returnComponent = <ProFormUploadButton name="pic" label={formFieldInfo.title} />;
      break;
    case 'ProFormUploadDragger':
      returnComponent = <ProFormUploadDragger name="drag-pic" label={formFieldInfo.title} />;
      break;
    case 'ProFormSegmented':
      returnComponent = (
        <ProFormSegmented
          name="segmented"
          label={formFieldInfo.title}
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
          name="segmented2"
          label={formFieldInfo.title}
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
