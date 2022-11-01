import PropTypes from 'prop-types';
import type { ProColumnType, ProFormInstance } from '@ant-design/pro-components';
import { FileSearchOutlined } from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  useDebounceFn,
  FormListActionType,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import request from 'umi-request';
import { valueTypeArray } from '../../components/types';
import { columns as columnsConfig, initConfig } from './config';
import { configSettingUI } from '../../components/configSettingUI';
import dataSource from '../../../server/dataSource';
const ProTableDynamicSettings = (props: any) => {
  /** 去抖配置 */
  const updateConfig = useDebounceFn(async (state) => {
    setConfig(state);
  }, 20);

  const settingFormRef = useRef<ProFormInstance>(); // 配置全部表单
  const actionRef = useRef<FormListActionType<any>>(); // 动态数据项表单
  const dataSourceFormRef = useRef<ProFormInstance>(); // 数据源表单
  const generateFormRef = useRef<ProFormInstance>(); // 代码生成表单

  const [config, setConfig] = useState<any>(initConfig);
  const [columns, setColumns] = useState<any>(columnsConfig);
  const [generateFormData, setGenerateFormData] = useState<any>({});

  React.useEffect(() => {
    console.log('配置的config发生变化', config);
    props.dynamicSetConfig(config, dataSourceFormRef.current?.getFieldsValue());
  }, [config]);

  //#region 数据源表单配置
  // 获取数据
  const exetDataSource = async () => {
    const { url, method, afterScript } = dataSourceFormRef.current?.getFieldsValue();
    const a = await dataSource('tableList', url, method, afterScript);
    console.log(a);
    // 模拟响应的数据
    const tableDataList = [
      {
        key: 1,
        id: 1,
        name: '赵通1',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
      {
        key: 2,
        id: 2,
        name: '赵通2',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
      {
        key: 3,
        id: 3,
        name: '赵通3',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
      {
        key: 4,
        id: 4,
        name: '赵通4',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
      {
        key: 5,
        id: 5,
        name: '赵通5',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
      {
        key: 6,
        id: 6,
        name: '赵通6',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
      {
        key: 7,
        id: 7,
        name: '赵通7',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
      {
        key: 8,
        id: 8,
        name: '赵通8',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
      {
        key: 9,
        id: 9,
        name: '赵通9',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
      {
        key: 10,
        id: 10,
        name: '赵通10',
        age: 19,
        createTime: Date.now(),
        phone: 18700871300,
      },
    ];
    // 获取响应数据的第一条
    const responseDataFirst = tableDataList.length > 0 ? tableDataList[0] : undefined;

    let tableColumn: ProColumnType<any>[] = [];
    // 处理数据（给数据赋title、valueType）
    if (responseDataFirst) {
      Object.entries(responseDataFirst).forEach(([k, v]) => {
        if (typeof v == 'string') {
          tableColumn.push({ title: k, dataIndex: k, valueType: 'text' });
        }
        if (typeof v == 'number') {
          tableColumn.push({
            title: k,
            dataIndex: k,
            valueType: 'digit',
          });
        }
      });
    }
    // 操作栏
    tableColumn.push({
      title: '操作',
      dataIndex: 'table-operation', // 防止后端字段重名
      valueType: 'option',
      render: (_: React.ReactNode, entity: any, index: number) => {
        return [
          <a
            key="detail"
            onClick={() => {
              props.onEvent(_, 'detail', entity, index);
            }}
          >
            <FileSearchOutlined />
          </a>,
        ];
      },
    });

    // setting
    setColumns(() => [...tableColumn]);
    config.columns = tableColumn;
    setConfig(() => ({ ...config }));
    settingFormRef.current?.resetFields(); // 更新所有表单表单

    // index
    props.dynamicSetDataSource(config, tableColumn, tableDataList);

    // 反填代码生成表单值
    const generateFormData = {
      columns: JSON.stringify(tableColumn),
      tableDataList: JSON.stringify(tableDataList),
    };
    setGenerateFormData(generateFormData);
    generateFormRef?.current?.resetFields();
  };
  // 一键填写
  const fillDataSource = () => {
    dataSourceFormRef?.current?.setFieldsValue({
      url: '/api/Success',
      method: 'GET',
      afterScript: 'data=response', // 后执行脚本
    });
  };
  //#endregion

  //#region 代码生成表单配置
  // 一键填写
  const fillGenerate = () => {
    generateFormRef?.current?.setFieldsValue({
      name: 'ComponentName',
      // type: 'CommonTable',
      templatePath: 'F:\\zhaotong\\Git\\ant-design-generate\\ant-design-generate\\src\\pages\\Template',
      generatePath: 'F:\\zhaotong\\Git\\ant-design-generate\\ant-design-generate\\src\\pages\\Generate',
      previewUrl: 'http://localhost:8000/generate',
      initData: JSON.stringify({ ...config }),
    });
  };
  // 生成
  const generate = async (values: any) => {
    const url = '/api/generate';
    await request(url, {
      method: 'post',
      data: { ...values, initData: JSON.stringify({ ...config }) }, // initData用最新的
    });
  };
  //#endregion
  return (
    <>
      <ProForm layout="inline" formRef={settingFormRef} initialValues={config} submitter={false} colon={false} onValuesChange={(_, values) => updateConfig.run(values)}>
        <ProCard
          colSpan="420px"
          style={{
            height: '100vh',
            overflow: 'auto',
            boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
            top: 0,
            right: 0,
            width: 420,
          }}
          tabs={{
            // tabPosition: 'right',
            cardProps: {
              bodyStyle: {
                padding: 12,
              },
            },
            items: [
              {
                label: '基本配置',
                key: 'tab1',
                children: (
                  <>
                    <ProForm.Group title="表格配置" size={0} collapsible direction="horizontal" labelLayout="twoLine">
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="边框"
                        tooltip="bordered"
                        name="bordered"
                      />
                      <ProFormRadio.Group
                        tooltip={`size="middle"`}
                        radioType="button"
                        fieldProps={{
                          size: configSettingUI.radioGroupSize,
                        }}
                        label="尺寸"
                        options={[
                          {
                            label: '大',
                            value: 'default',
                          },
                          {
                            label: '中',
                            value: 'middle',
                          },
                          {
                            label: '小',
                            value: 'small',
                          },
                        ]}
                        name="size"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="加载中"
                        tooltip="loading"
                        name="loading"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="显示标题"
                        tooltip="showHeader"
                        name="showHeader"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="页脚"
                        tooltip="footer"
                        name="footer"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="支持展开"
                        tooltip="expandable"
                        name="expandable"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="行选择"
                        tooltip="rowSelection"
                        name="rowSelection"
                      />
                    </ProForm.Group>
                    <ProForm.Group
                      size={0}
                      collapsible
                      direction="horizontal"
                      labelLayout="twoLine"
                      tooltip="toolBarRender={false}"
                      title="工具栏"
                      extra={
                        <ProFormSwitch
                          fieldProps={{
                            size: configSettingUI.switchSize,
                          }}
                          noStyle
                          name="toolBarRender"
                        />
                      }
                    >
                      <ProFormText
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        label="表格标题"
                        name="headerTitle"
                        tooltip="headerTitle={false}"
                      />
                      <ProFormText
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        label="表格的tooltip"
                        name="tooltip"
                        tooltip="tooltip={false}"
                      />

                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="Icon 显示"
                        name={['options', 'show']}
                        tooltip="options={false}"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="密度 Icon"
                        name={['options', 'density']}
                        tooltip="options={{ density:false }}"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="keyWords"
                        name={['options', 'search']}
                        tooltip="options={{ search:'keyWords' }}"
                      />
                      <ProFormSwitch
                        label="全屏 Icon"
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        name={['options', 'fullScreen']}
                        tooltip="options={{ fullScreen:false }}"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="列设置 Icon"
                        tooltip="options={{ setting:false }}"
                        name={['options', 'setting']}
                      />
                    </ProForm.Group>
                    <ProForm.Group
                      title="查询表单"
                      size={0}
                      collapsible
                      tooltip="search={false}"
                      direction="horizontal"
                      labelLayout="twoLine"
                      extra={
                        <ProFormSwitch
                          fieldProps={{
                            size: configSettingUI.switchSize,
                          }}
                          noStyle
                          name={['showSearch']}
                        />
                      }
                    >
                      <ProFormText
                        label="查询按钮文案"
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        tooltip={`search={{searchText:"查询"}}`}
                        name={['search', 'searchText']}
                      />
                      <ProFormText
                        label="重置按钮文案"
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        tooltip={`search={{resetText:"重置"}}`}
                        name={['search', 'resetText']}
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="收起按钮"
                        tooltip={`search={{collapseRender:false}}`}
                        name={['search', 'collapseRender']}
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: configSettingUI.switchSize,
                        }}
                        label="表单收起"
                        name={['search', 'collapsed']}
                        tooltip={`search={{collapsed:false}}`}
                      />
                      <ProFormSelect
                        fieldProps={{
                          size: configSettingUI.selectSize,
                        }}
                        tooltip={`search={{span:8}}`}
                        options={[
                          {
                            label: '24',
                            value: 24,
                          },
                          {
                            label: '12',
                            value: 12,
                          },
                          {
                            label: '8',
                            value: 8,
                          },
                          {
                            label: '6',
                            value: 6,
                          },
                        ]}
                        label="表单栅格"
                        name={['search', 'span']}
                      />
                      <ProFormRadio.Group
                        radioType="button"
                        fieldProps={{
                          size: configSettingUI.radioGroupSize,
                        }}
                        name={['search', 'layout']}
                        tooltip={`search={{layout:"${config.search?.layout}"}}`}
                        options={[
                          {
                            label: '垂直',
                            value: 'vertical',
                          },
                          {
                            label: '水平',
                            value: 'horizontal',
                          },
                        ]}
                        label="表单布局"
                      />
                      <ProFormRadio.Group
                        radioType="button"
                        fieldProps={{
                          size: configSettingUI.radioGroupSize,
                        }}
                        name={['search', 'filterType']}
                        tooltip={`search={{filterType:"light"}}`}
                        options={[
                          {
                            label: '默认',
                            value: 'query',
                          },
                          {
                            label: '轻量',
                            value: 'light',
                          },
                        ]}
                        label="表单类型"
                      />
                    </ProForm.Group>
                    <ProForm.Group
                      title="分页器"
                      size={0}
                      collapsible
                      tooltip="pagination={}"
                      direction="horizontal"
                      labelLayout="twoLine"
                      extra={
                        <ProFormSwitch
                          fieldProps={{
                            size: configSettingUI.switchSize,
                          }}
                          noStyle
                          name={['showPagination']}
                        />
                      }
                    >
                      <ProFormRadio.Group
                        tooltip={`pagination={size:"middle"}`}
                        radioType="button"
                        fieldProps={{
                          size: configSettingUI.radioGroupSize,
                        }}
                        label="尺寸"
                        options={[
                          {
                            label: '默认',
                            value: 'default',
                          },
                          {
                            label: '小',
                            value: 'small',
                          },
                        ]}
                        name={['pagination', 'size']}
                      />
                      {/* <ProFormRadio.Group
                        tooltip={`pagination={size:"middle"}`}
                        radioType="button"
                        fieldProps={{
                          size: configSettingUI.radioGroupSize,
                        }}
                        label="位置"
                        options={[]}
                        name={['pagination', 'position']}
                      /> */}
                      <ProFormDigit
                        fieldProps={{
                          size: configSettingUI.digitSize,
                        }}
                        label="页码"
                        tooltip={`pagination={{ current:10 }}`}
                        name={['pagination', 'current']}
                      />
                      <ProFormDigit
                        fieldProps={{
                          size: configSettingUI.digitSize,
                        }}
                        label="每页数量"
                        tooltip={`pagination={{ pageSize:10 }}`}
                        name={['pagination', 'pageSize']}
                      />
                      <ProFormDigit
                        fieldProps={{
                          size: configSettingUI.digitSize,
                        }}
                        label="数据总数"
                        tooltip={`pagination={{ total:100 }}`}
                        name={['pagination', 'total']}
                      />
                    </ProForm.Group>
                  </>
                ),
              },
              {
                label: '列配置',
                key: 'tab4',
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
                        {/* <ProFormSelect
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
                        /> */}
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

                  // </ProForm>
                ),
              },
              {
                label: '数据源',
                key: 'tab5',
                children: (
                  <>
                    <ProForm
                      layout="horizontal"
                      formRef={dataSourceFormRef}
                      submitter={{
                        render: (props, doms) => {
                          return [
                            ...doms,
                            <Button htmlType="button" onClick={fillDataSource} key="edit">
                              一键填写
                            </Button>,
                          ];
                        },
                      }}
                      onFinish={async (values) => {
                        // console.log(values);
                        exetDataSource();
                        message.success('提交成功');
                        return true;
                      }}
                    >
                      <ProFormText
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        name="url"
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
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        name="method"
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
                        fieldProps={{
                          size: configSettingUI.textAreaSize,
                        }}
                        name="afterScript"
                        label="后执行脚本"
                        tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                        placeholder="请输入后执行脚本"
                      />
                    </ProForm>
                  </>
                ),
              },
              {
                label: '代码生成',
                key: 'tab6',
                children: (
                  <>
                    <ProForm
                      layout="horizontal"
                      formRef={generateFormRef}
                      initialValues={generateFormData}
                      submitter={{
                        render: (props, doms) => {
                          return [
                            ...doms,
                            <Button htmlType="button" onClick={fillGenerate} key="edit">
                              一键填写
                            </Button>,
                          ];
                        },
                      }}
                      onFinish={async (values) => {
                        // console.log(values);
                        generate(values);
                        message.success('提交成功');
                        return true;
                      }}
                    >
                      <ProFormText
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        name="previewUrl"
                        label="预览地址"
                        tooltip="预览地址"
                        placeholder="请输入预览地址"
                        rules={[
                          {
                            required: true,
                            message: '请输入预览地址',
                          },
                        ]}
                      />
                      <ProFormText
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        name="name"
                        label="组件名"
                        tooltip="组件名"
                        placeholder="请输入组件名"
                        rules={[
                          {
                            required: true,
                            message: '请输入组件名',
                          },
                        ]}
                      />
                      {/* <ProFormSelect
                        fieldProps={{
                          size: config.selectSize,
                        }}
                        name="type"
                        tooltip="类型"
                        label="类型"
                        valueEnum={{
                          CommonTable: '普通表格',
                        }}
                        placeholder="请选择类型"
                        rules={[
                          {
                            required: true,
                            message: '请选择类型！',
                          },
                        ]}
                      /> */}
                      <ProFormText
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        name="templatePath"
                        label="模板路径"
                        tooltip="模板路径"
                        placeholder="请输入模板路径"
                        rules={[
                          {
                            required: true,
                            message: '请输入模板路径',
                          },
                        ]}
                      />
                      <ProFormText
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        name="generatePath"
                        label="生成路径"
                        tooltip="生成路径"
                        placeholder="请输入生成路径"
                        rules={[
                          {
                            required: true,
                            message: '请输入生成路径',
                          },
                        ]}
                      />
                      <ProFormTextArea
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        name="initData"
                        label="初始配置"
                        tooltip="初始配置"
                        placeholder="请输入初始配置"
                        rules={[
                          {
                            required: true,
                            message: '请输入初始配置',
                          },
                        ]}
                      />
                      <ProFormTextArea
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        name="columns"
                        label="列配置"
                        tooltip="初始列配置"
                        placeholder="请输入列配置"
                        rules={[
                          {
                            required: true,
                            message: '请输入列配置',
                          },
                        ]}
                      />
                      <ProFormTextArea
                        fieldProps={{
                          size: configSettingUI.textSize,
                        }}
                        name="tableDataList"
                        label="表格数据"
                        tooltip="表格数据"
                        placeholder="请输入表格数据"
                        rules={[
                          {
                            required: true,
                            message: '请输入表格数据',
                          },
                        ]}
                      />
                    </ProForm>
                  </>
                ),
              },
            ],
          }}
        />
      </ProForm>
    </>
  );
};
ProTableDynamicSettings.propTypes = {
  dynamicSetConfig: PropTypes.func,
  dynamicSetDataSource: PropTypes.func,
  onEvent: PropTypes.func,
};

export default ProTableDynamicSettings;
