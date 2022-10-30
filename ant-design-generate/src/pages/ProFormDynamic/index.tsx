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
import { valueTypeArray } from '../../components/types';
import ProFormItemDynamic from '../../components/ProFormItemDynamic';
import { configSettingUI } from '../../components/configSettingUI';
import { useRef, useState } from 'react';

const initFormFields = [{ type: 'ProFormText' }, { type: 'ProFormSelect' }];
const Demo = () => {
  const [stateValue, setStateValue] = useState({});
  const [formFields, setFormFields] = useState(initFormFields);

  const actionRef = useRef<FormListActionType<any>>(); // 动态数据项表单

  return (
    <ProCard split="vertical">
      <ProCard>
        <ProFormItemDynamic formFields={formFields} />
      </ProCard>
      {/* <ProForm layout="inline" submitter={false} colon={false} onValuesChange={(_, values) => updateConfig.run(values)}> */}

      <ProCard
        colSpan="400px"
        // title="配置菜单"
        style={{
          height: '100vh',
          overflow: 'auto',
          boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
          top: 0,
          right: 0,
          width: 400,
        }}
        tabs={{
          items: [
            {
              label: '基本配置',
              key: 'tab1',
              children: <></>,
            },
            {
              label: '表单项',
              key: 'tab2',
              children: (
                <>
                  <Button
                    type="dashed"
                    onClick={() => {
                      const row = actionRef.current?.getList();
                      console.log(row);
                    }}
                  >
                    打印所有数据
                  </Button>
                  <Button
                    danger
                    onClick={() => {
                      actionRef.current?.remove(0);
                    }}
                  >
                    删除一行
                  </Button>
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
                    <ProFormGroup style={{}}>
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="过长省略"
                        name="ellipsis"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="复制按钮"
                        name="copyable"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="表格中隐藏"
                        name="hideInTable"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="筛选中隐藏"
                        name="hideInSearch"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="是否Key"
                        name="key"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        tooltip="排序实现需要手写sorter: (a, b) => a.age - b.age,"
                        label="开启排序"
                        name="sorter"
                      />
                    </ProFormGroup>
                    <ProFormGroup size={8}>
                      <ProFormSelect
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        label="dataIndex"
                        width="xs"
                        name="dataIndex"
                        valueEnum={{
                          age: 'age',
                          address: 'address',
                          name: 'name',
                          time: 'time',
                          description: 'string',
                        }}
                      />
                      <ProFormSelect
                        width="sm"
                        label="值类型"
                        name="valueType"
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        options={valueTypeArray.map((valueType) => ({
                          label: valueType.label,
                          value: valueType.value,
                        }))}
                      />
                    </ProFormGroup>
                    <ProFormGroup size={8}>
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
          ],
        }}
      ></ProCard>

      {/* </ProForm> */}
    </ProCard>
  );
};

export default Demo;
