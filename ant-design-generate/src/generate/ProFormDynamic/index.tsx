/* eslint-disable no-param-reassign */
import { CopyOutlined, DeleteOutlined, HeartOutlined, HomeOutlined, PlusOutlined, SettingFilled, SmileOutlined, SyncOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormField,
  ProFormDigit,
  ProFormGroup,
  ProFormRadio,
  ProFormTextArea,
  useDebounceFn,
  FormListActionType,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React from 'react';
import type { ProColumnType, ProFormInstance } from '@ant-design/pro-components';
import { valueTypeArray, formFieldArray } from '../../entity/types';
import ProFormItemDynamic from '../../pages/ProTableDynamic/subComps/ProFormItemDynamic';
import { configSettingUI } from '../../components/Settings/configSettingUI';
import { useRef, useState } from 'react';
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
    key: 'table-operation',
    valueType: 'option',
  },
];
const ProFormDynamic = (props: any) => {
  /** 去抖配置 */
  const updateConfig = useDebounceFn(async (state) => {
    setConfig(state);
  }, 20);

  // 处理数据
  const dealFormFields = (formFields: any) => {
    debugger;
    formFields.forEach((formField: any) => {
      // 默认赋formFieldType类型为ProFormText
      formField.formFieldType = 'ProFormText';
      formField.placeholder = '请输入';
      formField.tooltip = '';
    });
    return formFields;
  };

  const newformFields = dealFormFields(props.columns ? props.columns : myColumns);
  const [formFields, setFormFields] = useState<any>(newformFields);

  const actionRef = useRef<FormListActionType<any>>(); // 动态数据项表单
  const settingFormRef = useRef<ProFormInstance>(); // 配置全部表单
  const [config, setConfig] = useState<any>({ columns: newformFields });
  React.useEffect(() => {
    // 更新表单项
    // console.log('更新动态表单字段：props');
    const dealFormFields1 = dealFormFields(props.columns ? props.columns : myColumns);
    setFormFields(dealFormFields1);
    setConfig({ columns: dealFormFields1 });
  }, [props]);
  React.useEffect(() => {
    // 更新表单项
    const newFormFields: any = [];
    config?.columns?.forEach((columnsItem: any) => {
      if (columnsItem.formFieldType && !columnsItem.hide) {
        newFormFields.push({ ...columnsItem });
      }
    });
    console.log('更新动态表单字段：', config, newformFields, newFormFields);
    setFormFields(newFormFields);
  }, [config]);
  console.log('ProFormDynamic', props.columns, formFields, config);

  return (
    <ProCard split="vertical">
      <ProCard>
        <ProFormItemDynamic formFields={formFields} />
      </ProCard>
      <ProForm layout="inline" formRef={settingFormRef} initialValues={config} submitter={false} colon={false} onValuesChange={(_, values) => updateConfig.run(values)}>
        <ProCard
          colSpan="420px"
          // title="配置菜单"
          style={{
            height: '700px',
            overflow: 'auto',
            top: 0,
            right: 0,
            width: 420,
          }}
          tabs={{
            items: [
              {
                label: '表单项',
                key: 'tab2',
                children: (
                  <>
                    <ProFormList
                      actionRef={actionRef}
                      name="columns"
                      itemRender={({ listDom, action }) => {
                        return (
                          <ProCard
                            bordered
                            style={{
                              marginBlockEnd: 8,
                              position: 'relative',
                              padding: '10px 0px',
                            }}
                            bodyStyle={{
                              padding: 8,
                              paddingInlineEnd: 32,
                              paddingBlockStart: 16,
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: -4,
                                right: 2,
                              }}
                            >
                              {action}
                            </div>
                            {listDom}
                          </ProCard>
                        );
                      }}
                    >
                      <ProFormText
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        name="title"
                        label="标题"
                      />
                      <ProFormGroup>
                        <ProFormSwitch
                          fieldProps={{
                            size: configSettingUI.switchSize,
                          }}
                          label="隐藏"
                          name="hide"
                        />
                        {/* <ProFormSwitch
                          fieldProps={{
                            size: configSettingUI.switchSize,
                          }}
                          label="是否Key"
                          name="key"
                        /> */}
                      </ProFormGroup>
                      <ProFormGroup size={8}>
                        <ProFormSelect
                          label="控件类型"
                          name="formFieldType"
                          fieldProps={{
                            size: configSettingUI.textSize,
                          }}
                          options={formFieldArray.map((formField) => ({
                            label: formField.label,
                            value: formField.value,
                          }))}
                        />
                      </ProFormGroup>
                      <ProFormGroup size={8}>
                        <ProFormText
                          fieldProps={{
                            size: configSettingUI.textSize,
                          }}
                          width="xs"
                          label="输入提示"
                          name="placeholder"
                        />
                        <ProFormText
                          fieldProps={{
                            size: configSettingUI.textSize,
                          }}
                          width="xs"
                          label="列提示"
                          name="tooltip"
                        />
                      </ProFormGroup>
                      <ProFormDependency name={['valueType', 'valueEnum']}>
                        {({ valueType, valueEnum }) => {
                          if (valueType !== 'select') {
                            return null;
                          }
                          return (
                            <ProFormTextArea
                              formItemProps={{}}
                              fieldProps={{
                                size: configSettingUI.textAreaSize,
                                value: JSON.stringify(valueEnum),
                              }}
                              normalize={(value) => {
                                return JSON.parse(value);
                              }}
                              label="数据枚举"
                              name="valueEnum"
                            />
                          );
                        }}
                      </ProFormDependency>
                    </ProFormList>
                  </>
                ),
              },
              {
                label: '基本配置',
                key: 'tab1',
                children: <></>,
              },
            ],
          }}
        ></ProCard>
      </ProForm>
    </ProCard>
  );
};

ProFormDynamic.propTypes = {
  columns: PropTypes.array,
};
export default ProFormDynamic;
