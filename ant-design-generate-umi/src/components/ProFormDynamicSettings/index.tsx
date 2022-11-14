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
import { valueTypeArray, formFieldArray, EventType, ApiType } from '../ProTableDynamic/entity/types';
import ProFormDynamic from '../ProTableDynamic/subComps/ProFormDynamic';
import { configSettingUI } from '../ProTableDynamicSettings/configSettingUI';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { initConfig } from '../ProTableDynamic/subComps/ProFormDynamic/config';
import dataSource from '../ProTableDynamic/utils/DataSource';

const ProFormDynamicSettings = (props: any) => {
  let formConfig = initConfig;
  formConfig.dataSource = props.config.dataSource;
  formConfig.columns = props.config.columns;

  const [config, setConfig] = useState<any>({ ...formConfig }); // 配置信息
  const [columns, setColumns] = useState<any>([...formConfig.columns]); // 表单列

  const updateConfig = useDebounceFn(async (state) => {
    setConfig({ ...config, ...state });
  }, 20);

  const actionRef = useRef<FormListActionType<any>>(); // 动态数据项表单
  const settingFormRef = useRef<ProFormInstance>(); // 配置全部表单
  const dataSourceFormRef = useRef<ProFormInstance>(); // 数据源表单
  React.useEffect(() => {
    // 更新表单项
    // console.debug('更新动态表单字段：props');
    settingFormRef.current?.resetFields();
    setConfig({ ...initConfig, ...config });
  }, [props]);
  React.useEffect(() => {
    // 更新表单项
    const newFormFields: any = [];
    if (config.columns) {
      config?.columns?.forEach((columnsItem: any) => {
        if (columnsItem.formFieldType && !columnsItem.hide) {
          newFormFields.push({ ...columnsItem });
        }
      });
    }
    // console.debug('更新动态表单字段：', config, newFormFields);
    setColumns(newFormFields);
  }, [config]);

  const exetTableDetailDataSource = async (apiSelectDetail: any) => {
    const { url, method, afterScript } = apiSelectDetail;
    const tableDataDetail: any = await dataSource('apiSelectDetail', url, method, afterScript);
    message.info('获取详情');
    console.debug(tableDataDetail);
  };
  const exetDataSource = (apiType: ApiType) => {
    // message.info('apiType:' + apiType);
    switch (apiType) {
      case 'apiSelectDetail':
        exetTableDetailDataSource(config.dataSource.apiList[apiType]);
        break;
      default:
        message.error('数据源类型错误' + apiType);
        return;
    }
  };
  const fillDataSource = () => {
    const newConfig = {
      ...config,
      dataSource: {
        apiList: {
          apiSelectList: {
            url: 'http://localhost:8081/selectList',
            method: 'GET',
            afterScript: 'returnData=response.data', // 后执行脚本
          },
          apiSelectDetail: {
            url: 'http://localhost:8081/selectDetail',
            method: 'GET',
            afterScript: 'returnData=response.data', // 后执行脚本
          },
          apiAdd: {
            url: 'http://localhost:8081/Success',
            method: 'GET',
            afterScript: 'returnData=response.data', // 后执行脚本
          },
          apiDelete: {
            url: 'http://localhost:8081/Success',
            method: 'GET',
            afterScript: 'returnData=response.data', // 后执行脚本
          },
          apiUpdate: {
            url: 'http://localhost:8081/Success',
            method: 'GET',
            afterScript: 'returnData=response.data', // 后执行脚本
          },
        },
      },
    };
    setConfig({ ...newConfig });
    dataSourceFormRef?.current?.setFieldsValue(newConfig);
  };
  console.debug('ProFormDynamicSettings', props.config);
  return (
    <ProCard split="vertical">
      <ProCard>
        <ProFormDynamic readonly={config.readonly} columns={columns} dynamic={true} />
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
              children: (
                <>
                  <ProForm layout="inline" size={configSettingUI.size} initialValues={config} onValuesChange={(_, values) => updateConfig.run(values)}>
                    {/* <ProForm.Group title="表单配置" collapsible direction="horizontal" labelLayout="twoLine"> */}
                    <ProFormSwitch label="只读" tooltip="showEditModal" name="readonly" />
                    {/* </ProForm.Group> */}
                  </ProForm>
                </>
              ),
            },
            {
              label: '数据源',
              key: 'dataSource',
              children: (
                <>
                  <ProForm
                    layout="horizontal"
                    size={configSettingUI.size}
                    initialValues={config}
                    onValuesChange={(_, values) => updateConfig.run(values)}
                    submitter={false}
                    formRef={dataSourceFormRef}
                  >
                    <Button htmlType="button" onClick={fillDataSource} key="edit">
                      一键填写
                    </Button>
                    <ProFormSelect
                      tooltip={`formType={{${config.formType}}}`}
                      options={[
                        {
                          label: '增',
                          value: 'formAdd',
                        },
                        {
                          label: '改',
                          value: 'formEdit',
                        },
                        {
                          label: '查',
                          value: 'formDetail',
                        },
                      ]}
                      label="表单类型"
                      name="formType"
                    />
                    {config.formType === 'formDetail' ? (
                      <>
                        <ProFormGroup title="查-详情" collapsible defaultCollapsed={false}>
                          <ProFormText
                            name={['dataSource', 'apiList', 'apiSelectDetail', 'url']}
                            label="URL地址"
                            tooltip="URL地址"
                            placeholder="请输入URL"
                            rules={[
                              {
                                required: true,
                                message: '请输入URL',
                              },
                            ]}
                          />
                          <ProFormSelect
                            name={['dataSource', 'apiList', 'apiSelectDetail', 'method']}
                            tooltip="请求方式"
                            label="请求方式"
                            valueEnum={{
                              GET: 'GET',
                              POST: 'POST',
                              PUT: 'PUT',
                              DELETE: 'DELETE',
                            }}
                            placeholder="请选择请求方式"
                            rules={[
                              {
                                required: true,
                                message: '请选择请求方式！',
                              },
                            ]}
                          />
                          <ProFormTextArea
                            name={['dataSource', 'apiList', 'apiSelectDetail', 'afterScript']}
                            label="后执行脚本"
                            tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                            placeholder="请输入后执行脚本"
                          />
                          <Button type="primary" onClick={() => exetDataSource('apiSelectDetail')}>
                            执行
                          </Button>
                        </ProFormGroup>
                      </>
                    ) : config.formType === 'formAdd' ? (
                      <>
                        <ProForm.Group title="增" collapsible defaultCollapsed={false}>
                          <ProFormText
                            name={['dataSource', 'apiList', 'apiAdd', 'url']}
                            label="URL地址"
                            tooltip="URL地址"
                            placeholder="请输入URL"
                            rules={[
                              {
                                required: true,
                                message: '请输入URL',
                              },
                            ]}
                          />
                          <ProFormSelect
                            name={['dataSource', 'apiList', 'apiAdd', 'method']}
                            tooltip="请求方式"
                            label="请求方式"
                            valueEnum={{
                              GET: 'GET',
                              POST: 'POST',
                              PUT: 'PUT',
                              DELETE: 'DELETE',
                            }}
                            placeholder="请选择请求方式"
                            rules={[
                              {
                                required: true,
                                message: '请选择请求方式！',
                              },
                            ]}
                          />
                          <ProFormTextArea
                            name={['dataSource', 'apiList', 'apiAdd', 'afterScript']}
                            label="后执行脚本"
                            tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                            placeholder="请输入后执行脚本"
                          />
                        </ProForm.Group>
                      </>
                    ) : config.formType === 'formEdit' ? (
                      <>
                        <ProFormGroup title="查-详情" collapsible defaultCollapsed={false}>
                          <ProFormText
                            name={['dataSource', 'apiList', 'apiSelectDetail', 'url']}
                            label="URL地址"
                            tooltip="URL地址"
                            placeholder="请输入URL"
                            rules={[
                              {
                                required: true,
                                message: '请输入URL',
                              },
                            ]}
                          />
                          <ProFormSelect
                            name={['dataSource', 'apiList', 'apiSelectDetail', 'method']}
                            tooltip="请求方式"
                            label="请求方式"
                            valueEnum={{
                              GET: 'GET',
                              POST: 'POST',
                              PUT: 'PUT',
                              DELETE: 'DELETE',
                            }}
                            placeholder="请选择请求方式"
                            rules={[
                              {
                                required: true,
                                message: '请选择请求方式！',
                              },
                            ]}
                          />
                          <ProFormTextArea
                            name={['dataSource', 'apiList', 'apiSelectDetail', 'afterScript']}
                            label="后执行脚本"
                            tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                            placeholder="请输入后执行脚本"
                          />
                          <Button type="primary" onClick={() => exetDataSource('apiSelectDetail')}>
                            执行
                          </Button>
                        </ProFormGroup>
                        <ProForm.Group title="改" collapsible defaultCollapsed={false}>
                          <ProFormText
                            name={['dataSource', 'apiList', 'apiUpdate', 'url']}
                            label="URL地址"
                            tooltip="URL地址"
                            placeholder="请输入URL"
                            rules={[
                              {
                                required: true,
                                message: '请输入URL',
                              },
                            ]}
                          />
                          <ProFormSelect
                            name={['dataSource', 'apiList', 'apiUpdate', 'method']}
                            tooltip="请求方式"
                            label="请求方式"
                            valueEnum={{
                              GET: 'GET',
                              POST: 'POST',
                              PUT: 'PUT',
                              DELETE: 'DELETE',
                            }}
                            placeholder="请选择请求方式"
                            rules={[
                              {
                                required: true,
                                message: '请选择请求方式！',
                              },
                            ]}
                          />
                          <ProFormTextArea
                            name={['dataSource', 'apiList', 'apiUpdate', 'afterScript']}
                            label="后执行脚本"
                            tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                            placeholder="请输入后执行脚本"
                          />
                        </ProForm.Group>
                      </>
                    ) : (
                      <></>
                    )}
                  </ProForm>
                </>
              ),
            },
          ],
        }}
      ></ProCard>
    </ProCard>
  );
};

ProFormDynamicSettings.propTypes = {
  type: PropTypes.oneOf(['formAdd', 'formEdit', 'formDetail']),
  config: PropTypes.object,
};
export default ProFormDynamicSettings;
