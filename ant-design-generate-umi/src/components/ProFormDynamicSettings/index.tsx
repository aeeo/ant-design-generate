/* eslint-disable no-param-reassign */
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
import { valueTypeArray, formFieldArray } from '../ProTableDynamic/entity/types';
import ProFormDynamic from '../ProTableDynamic/subComps/ProFormDynamic';
import { configSettingUI } from '../ProTableDynamicSettings/configSettingUI';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const ProFormDynamicSettings = (props: any) => {
  const myColumns: any[] = props.columns;

  const [config, setConfig] = useState<any>({ columns: myColumns });
  const [columns, setColumns] = useState<any>(props.columns);

  /** 去抖配置 */
  const updateConfig = useDebounceFn(async (state) => {
    setConfig(state);
  }, 20);

  const actionRef = useRef<FormListActionType<any>>(); // 动态数据项表单
  const settingFormRef = useRef<ProFormInstance>(); // 配置全部表单
  React.useEffect(() => {
    // 更新表单项
    // console.debug('更新动态表单字段：props');
    settingFormRef.current?.resetFields();
    setConfig({ columns: myColumns });
  }, [props]);
  React.useEffect(() => {
    // 更新表单项
    const newFormFields: any = [];
    if (!config?.columns) return;
    config?.columns?.forEach((columnsItem: any) => {
      if (columnsItem.formFieldType && !columnsItem.hide) {
        newFormFields.push({ ...columnsItem });
      }
    });
    console.debug('更新动态表单字段：', config, newFormFields);
    setColumns(newFormFields);
  }, [config]);
  console.debug('ProFormDynamicSettings', props.columns, config);
  return (
    <ProCard split="vertical">
      <ProCard>
        <ProFormDynamic columns={columns} />
      </ProCard>
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
                  <ProForm layout="inline" size={configSettingUI.size} formRef={settingFormRef} initialValues={config} onValuesChange={(_, values) => updateConfig.run(values)}>
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
                      <ProFormText name="title" label="标题" />
                      <ProFormSwitch label="隐藏" name="hide" />
                      <ProFormSelect
                        label="控件类型"
                        name="formFieldType"
                        options={formFieldArray.map((formField) => ({
                          label: formField.label,
                          value: formField.value,
                        }))}
                      />
                      <ProFormText label="输入提示" name="placeholder" />
                      <ProFormText label="列提示" name="tooltip" />
                      <ProFormDependency name={['valueType', 'valueEnum']}>
                        {({ valueType, valueEnum }) => {
                          if (valueType !== 'select') {
                            return null;
                          }
                          return (
                            <ProFormTextArea
                              formItemProps={{}}
                              fieldProps={{
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
                  </ProForm>
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
    </ProCard>
  );
};

ProFormDynamicSettings.propTypes = {
  columns: PropTypes.array,
};
export default ProFormDynamicSettings;
