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
  console.log(formFieldInfo);
  let returnComponent = <></>;
  switch (formFieldInfo.type) {
    case 'ProFormText':
      returnComponent = <ProFormText width="md" name="name" label="name" />;
      break;
    case 'ProFormTextArea':
      returnComponent = <ProFormTextArea width="md" name="text" label="名称" placeholder="请输入名称" />;
      break;

    case 'ProFormTextPassword':
      returnComponent = <ProFormText.Password width="md" name="password" label="password" />;
      break;
    case 'ProFormSelect':
      returnComponent = (
        <ProFormSelect
          name="select"
          label="Select"
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
          label="合同约定生效方式"
        />
      );
      break;
    case 'ProFormSelectMultiple':
      returnComponent = (
        <ProFormSelect
          name="select-multiple"
          label="Select[multiple]"
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
          label="Radio.Group"
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
          label="Radio.Group"
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
          label="Radio.Button"
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
      returnComponent = <ProFormCheckbox.Group name="checkbox-group" label="Checkbox.Group" options={['A', 'B', 'C', 'D', 'E', 'F']} />;
      break;
    case 'ProFormDigitRange':
      returnComponent = <ProFormDigitRange label="InputNumberRange" name="input-number-range" separator="-" separatorWidth={60} />;
      break;
    case 'ProFormDigit':
      returnComponent = <ProFormDigit label="InputNumber" name="input-number" width="sm" min={1} max={10} />;
      break;
    case 'ProFormSwitch':
      returnComponent = <ProFormSwitch name="switch" label="Switch" />;
      break;
    case 'ProFormSlider':
      returnComponent = (
        <ProFormSlider
          name="slider"
          label="Slider"
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
      returnComponent = <ProFormRate name="rate" label="Rate" />;
      break;
    case 'ProFormUploadButton':
      returnComponent = <ProFormUploadButton name="pic" label="上传" />;
      break;
    case 'ProFormUploadDragger':
      returnComponent = <ProFormUploadDragger name="drag-pic" label="拖拽上传" />;
      break;
    case 'ProFormSegmented':
      returnComponent = (
        <ProFormSegmented
          name="segmented"
          label="分段控制器"
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
          label="分段控制器-远程数据"
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
