import PropTypes from 'prop-types';
import type { ProColumnType, ProFormInstance } from '@ant-design/pro-components';
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
import { Button, message, Collapse } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import { request } from 'umi';
import { valueTypeArray } from '../../../entity/types';
import { genColumns as columnsConfig, initConfig } from '../../ProTableDynamic/config';
import { configSettingUI } from '../configSettingUI';
import dataSource from '../../../../server/dataSource';
import IconsDynamic from '../../ProTableDynamic/subComps/IconsDynamic';
import generateUtil from '../../../utils/generate';
import { OperationDynamic } from '../../ProTableDynamic/utils/OperationDynamic/index';
const ProTableDynamicSettings = (props: any) => {
  const baseFormRef = useRef<ProFormInstance>(); // 基础配置表单
  const columnFormRef = useRef<ProFormInstance>(); // 列配置表单
  const actionRef = useRef<FormListActionType<any>>(); // 动态数据项表单
  const dataSourceFormRef = useRef<ProFormInstance>(); // 数据源表单
  const generateFormRef = useRef<ProFormInstance>(); // 代码生成表单

  // 组件事件
  const onSettingEvent = (_: React.ReactNode, entity: any, index: number, type: string) => {
    console.debug(type, entity, index);
    switch (type) {
      case 'detail':
        props.onSettingEvent(_, entity, index, type);
        // config.event.showDetailModal = !config.event.showDetailModal;
        // console.debug('setting触发onSettingEvent');
        // setConfig({ ...config });
        break;
    }
  };
  const initConfigTemp = initConfig((_, entity: any, index: number, type: string) => {
    onSettingEvent(_, entity, index, type);
  });

  const [config, setConfig] = useState<any>(initConfigTemp);
  const [columnsStr, setColumnsStr] = useState<any>(JSON.stringify(columnsConfig)); // 存储无法被序列化的columns数据
  const [generateFormData, setGenerateFormData] = useState<any>({});
  // 去抖配置
  const updateConfig = useDebounceFn(async (state) => {
    // console.debug('setting更新表单', { ...config, ...state });
    setConfig({ ...config, ...state });
  }, 20);
  React.useEffect(() => {
    // console.debug('配置的config发生变化', config);
    props.dynamicSetConfig(config, dataSourceFormRef.current?.getFieldsValue(true));
  }, [config]);

  //#region 数据源表单配置

  const exetTableListDataSource = async (apiSelectList: any) => {
    const aa = apiSelectList.url;
    const { url, method, afterScript } = apiSelectList;
    const [tableDataList, tableDataListLength]: [Array<any>, number] = await dataSource('apiSelectList', url, method, afterScript);
    // 获取响应数据的第一条
    const responseDataFirst = tableDataList.length > 0 ? tableDataList[0] : undefined;

    let tableColumn: ProColumnType<any>[] = []; // 表格的列信息
    let columnsStr = ''; // 表格列中会有函数，无法序列化，用此字符串存储序列化后的值
    // 处理数据（给数据赋title、valueType）
    if (responseDataFirst) {
      Object.entries(responseDataFirst).forEach(([k, v]) => {
        if (typeof v === 'string') {
          tableColumn.push({ title: k, dataIndex: k, valueType: 'text' });
        }
        if (typeof v === 'number') {
          tableColumn.push({
            title: k,
            dataIndex: k,
            valueType: 'digit',
          });
        }
      });
    }
    // #region 操作栏
    const operationColumn: ProColumnType<any> = {
      title: '操作',
      dataIndex: 'table-operation', // 防止后端字段重名
      valueType: 'option',
      render: (_: React.ReactNode, entity: any, index: number) => {
        return OperationDynamic(['detail', 'edit', 'delete'], onSettingEvent, { reactNode: _, entity, index });
      },
    };
    const operationColumnString =
      '///去除引号{' +
      '  title: "操作",' +
      '  dataIndex: "table-operation",' +
      '  valueType: "option",' +
      '  render: (_: React.ReactNode, entity: any, index: number) => {' +
      '    return OperationDynamic(["detail", "edit", "delete"], onEvent, { reactNode: _, entity, index });' +
      '  },' +
      '}///去除引号';
    // const operationColumnString =
    //   '///去除引号{' +
    //   '  title: "操作",' +
    //   '  dataIndex: "table-operation",' +
    //   '  valueType: "option",' +
    //   '  render: (_: React.ReactNode, entity: any, index: number) => {' +
    //   '    return [' +
    //   '      <IconsDynamic onEvent={columnParams.onEvent} ' +
    //   '        key={"table-operation_" + index} ' +
    //   '        columnRender={{' +
    //   '          reactNode: _,' +
    //   '          entity,' +
    //   '          index,' +
    //   '          type: "detail",' +
    //   '        }}' +
    //   '      />,' +
    //   '    ];' +
    //   '  },' +
    //   '}///去除引号';

    tableColumn.push(operationColumn);
    columnsStr = operationColumnString;
    //#endregion

    // setting
    // setColumns(() => [...tableColumn]);
    setColumnsStr(() => columnsStr);
    config.columns = tableColumn;
    // console.debug('setting的config更新', config);
    setConfig(() => ({ ...config }));
    baseFormRef.current?.resetFields(); // 更新所有表单表单
    columnFormRef.current?.resetFields(); // 更新所有表单表单

    // index
    props.dynamicSetDataSource(tableDataList);

    // 反填代码生成表单值
    const generateFormData = {
      columns: JSON.stringify(tableColumn),
      tableDataList: JSON.stringify(tableDataList),
    };
    setGenerateFormData(generateFormData);
    generateFormRef?.current?.resetFields();
  };
  const exetTableDetailDataSource = async (apiSelectDetail: any) => {
    const { url, method, afterScript } = apiSelectDetail;
    const tableDataDetail: any = await dataSource('apiSelectDetail', url, method, afterScript);
  };

  const exetDataSource = (type: any) => {
    const data = dataSourceFormRef.current?.getFieldsValue(true);
    if (!data || Object.keys(data).length === 0 || !data.apiList || data.apiList.length === 0) {
      return;
    }
    switch (type) {
      case 'apiSelectList':
        exetTableListDataSource(data.apiList[type]);
        break;
      case 'apiSelectDetail':
        exetTableDetailDataSource(data.apiList[type]);
        break;
      case 'apiAdd':
        break;
      case 'apiDelete':
        break;
      case 'apiUpdate':
        break;
      default:
        message.error('数据源类型错误' + type);
        return;
    }
  };
  // 一键填写
  const fillDataSource = () => {
    dataSourceFormRef?.current?.setFieldsValue({
      apiList: {
        apiSelectList: {
          url: '/api/selectList',
          method: 'GET',
          afterScript: 'console.debug("执行后执行脚本")', // 后执行脚本
        },
        apiSelectDetail: {
          url: '/api/selectDetail',
          method: 'GET',
          afterScript: 'console.debug("执行后执行脚本")', // 后执行脚本
        },
        apiAdd: {
          url: '/api/Success',
          method: 'GET',
          afterScript: 'console.debug("执行后执行脚本")', // 后执行脚本
        },
        apiDelete: {
          url: '/api/Success',
          method: 'GET',
          afterScript: 'console.debug("执行后执行脚本")', // 后执行脚本
        },
        apiUpdate: {
          url: '/api/Success',
          method: 'GET',
          afterScript: 'console.debug("执行后执行脚本")', // 后执行脚本
        },
      },
    });
  };
  //#endregion

  //#region 代码生成表单配置
  const fillGenerate = () => {
    // 一键填写
    generateFormRef?.current?.setFieldsValue({
      name: 'ComponentName',
      // type: 'CommonTable',
      templatePath: 'F:\\zhaotong\\Git\\ant-design-generate\\ant-design-generate-umi\\src\\components\\ProTableDynamic',
      generatePath: 'F:\\zhaotong\\Git\\ant-design-generate\\ant-design-generate-umi\\src\\components\\Generate',
      // templatePath: 'C:\\custom\\GitRepositories\\ant-design-generate\\ant-design-generate\\src\\components\\ProTableDynamic',
      // generatePath: 'C:\\custom\\GitRepositories\\ant-design-generate\\ant-design-generate\\src\\components\\Generate',
      previewUrl: 'http://localhost:8000/generate',
      initData: JSON.stringify({ ...config }),
    });
  };
  // 生成
  const generate = async (values: any) => {
    const url = '/api/generate';
    let initData = { ...config };
    const [newInitData, tempColumnsStr] = generateUtil(initData, columnsStr);
    await request(url, {
      method: 'post',
      data: {
        ...values,
        initData: JSON.stringify(newInitData),
        columns: tempColumnsStr,
      }, // initData用最新的
    })
      .then(function (response) {
        if (response && response.successed) {
          message.success('请求成功');
        } else {
          message.error('出错了');
        }
      })
      .catch(function (error) {
        message.error('出错了', error);
      });
  };

  //#endregion

  return (
    <>
      <ProCard
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
        size="small"
        bordered
        bodyStyle={{ height: '100%', overflow: 'hidden' }}
        tabs={{
          size: 'small',
          items: [
            {
              label: '基本配置',
              key: 'tab1',
              children: (
                <>
                  <ProForm
                    layout="horizontal"
                    size={configSettingUI.size}
                    labelAlign="left"
                    formRef={baseFormRef}
                    initialValues={config}
                    submitter={false}
                    colon={false}
                    onValuesChange={(_, values) => updateConfig.run(values)}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                  >
                    <ProForm.Group title="事件配置" collapsible direction="horizontal" labelLayout="twoLine">
                      <ProFormSwitch label="显示编辑弹框" tooltip="showEditModal" name={['event', 'showEditModal']} />
                      <ProFormSwitch label="显示详情弹框" tooltip="showDetailModal" name={['event', 'showDetailModal']} />
                    </ProForm.Group>
                    <ProForm.Group title="表格配置" collapsible direction="horizontal" labelLayout="twoLine">
                      <ProFormSwitch label="边框" tooltip="bordered" name="bordered" />
                      <ProFormRadio.Group
                        tooltip={`size="middle"`}
                        radioType="button"
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
                      <ProFormSwitch label="加载中" tooltip="loading" name="loading" />
                      <ProFormSwitch label="显示标题" tooltip="showHeader" name="showHeader" />
                      <ProFormSwitch label="页脚" tooltip="showFooter" name="showFooter" />
                      <ProFormSwitch label="支持展开" tooltip="expandable" name="expandable" />
                      <ProFormSwitch label="行选择" tooltip="rowSelection" name="rowSelection" />
                      {/* <ProFormSwitch label="横向滚动" tooltip="openXScroll" name="openXScroll" />
                      <ProFormDependency name={['openXScroll']}>
                        {({ openXScroll }) => {
                          if (!openXScroll) {
                            return null;
                          }
                          return (
                            <>
                              <ProFormDigit label="表格宽度" tooltip={`scroll="${config.scroll.x}"`} name={['scroll', 'x']} />
                            </>
                          );
                        }}
                      </ProFormDependency>
                      <ProFormSwitch label="纵向滚动" tooltip="openYScroll" name="openYScroll" />
                      <ProFormDependency name={['openYScroll']}>
                        {({ openYScroll }) => {
                          if (!openYScroll) {
                            return null;
                          }
                          return (
                            <>
                              <ProFormDigit label="表格高度" tooltip={`scroll="${config.scroll.y}"`} name={['scroll', 'y']} />
                            </>
                          );
                        }}
                      
                      </ProFormDependency> */}
                      <ProFormSwitch label="开启滚动" tooltip="openScroll" name="openScroll" />
                      <ProFormDependency name={['openScroll']}>
                        {({ openScroll }) => {
                          if (!openScroll) {
                            return null;
                          }
                          return (
                            <>
                              <ProFormDigit label="表格宽度" tooltip={`scroll.x:"${config.scroll.x}"`} name={['scroll', 'x']} />
                              <ProFormDigit label="表格高度" tooltip={`scroll.y:"${config.scroll.y}"`} name={['scroll', 'y']} />
                            </>
                          );
                        }}
                      </ProFormDependency>

                      <ProFormRadio.Group
                        radioType="button"
                        name="tableLayout"
                        tooltip={`tableLayout:"${config.tableLayout}"`}
                        options={[
                          {
                            label: 'auto',
                            value: 'auto',
                          },
                          {
                            label: 'fixed',
                            value: 'fixed',
                          },
                        ]}
                        label="表格布局"
                      />
                    </ProForm.Group>
                    <ProForm.Group
                      collapsible
                      direction="horizontal"
                      labelLayout="twoLine"
                      tooltip="toolBarRender={false}"
                      title="工具栏"
                      extra={<ProFormSwitch noStyle name="toolBarRender" />}
                    >
                      <ProFormText label="表格头部标题" name="headerTitle" tooltip="headerTitle={false}" />
                      <ProFormText label="表格头部标题tooltip" name="headerTooltip" tooltip="headerTooltip={false}" />
                      <ProFormText label="表格Footer" name="footerTitle" tooltip="footerTitle={false}" />

                      <ProFormSwitch label="Icon 显示" name={['options', 'show']} tooltip="options={false}" />
                      <ProFormSwitch label="密度 Icon" name={['options', 'density']} tooltip="options={{ density:false }}" />
                      <ProFormSwitch label="keyWords" name={['options', 'search']} tooltip="options={{ search:'keyWords' }}" />
                      <ProFormSwitch label="全屏 Icon" name={['options', 'fullScreen']} tooltip="options={{ fullScreen:false }}" />
                      <ProFormSwitch label="列设置 Icon" tooltip="options={{ setting:false }}" name={['options', 'setting']} />
                    </ProForm.Group>
                    <ProForm.Group
                      title="查询表单"
                      collapsible
                      tooltip="search={false}"
                      direction="horizontal"
                      labelLayout="twoLine"
                      extra={<ProFormSwitch noStyle name={['showSearch']} />}
                    >
                      <ProFormText label="查询按钮文案" tooltip={`search={{searchText:"查询"}}`} name={['search', 'searchText']} />
                      <ProFormText label="重置按钮文案" tooltip={`search={{resetText:"重置"}}`} name={['search', 'resetText']} />
                      <ProFormSwitch label="收起按钮" tooltip={`search={{collapseRender:false}}`} name={['search', 'collapseRender']} />
                      <ProFormSwitch label="表单收起" name={['search', 'collapsed']} tooltip={`search={{collapsed:false}}`} />
                      <ProFormSelect
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
                      collapsible
                      tooltip="pagination={}"
                      direction="horizontal"
                      labelLayout="twoLine"
                      extra={<ProFormSwitch noStyle name={['showPagination']} />}
                    >
                      <ProFormRadio.Group
                        tooltip={`pagination={size:"middle"}`}
                        radioType="button"
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
                        label="位置"
                        options={[]}
                        name={['pagination', 'position']}
                      /> */}
                      <ProFormDigit label="页码" tooltip={`pagination={{ current:10 }}`} name={['pagination', 'current']} />
                      <ProFormDigit label="每页数量" tooltip={`pagination={{ pageSize:10 }}`} name={['pagination', 'pageSize']} />
                      <ProFormDigit label="数据总数" tooltip={`pagination={{ total:100 }}`} name={['pagination', 'total']} />
                    </ProForm.Group>
                  </ProForm>
                </>
              ),
            },
            {
              label: '列配置',
              key: 'tab4',
              children: (
                <>
                  <ProForm
                    layout="inline"
                    size={configSettingUI.size}
                    labelAlign="left"
                    formRef={columnFormRef}
                    initialValues={config.columns}
                    submitter={false}
                    colon={false}
                    onValuesChange={(_, values) => updateConfig.run(values)}
                  >
                    {/* <Button
                      type="dashed"
                      onClick={() => {
                        const row = actionRef.current?.getList();
                        console.debug(row);
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
                    </Button> */}
                    <ProFormList
                      actionRef={actionRef}
                      name="columns"
                      initialValue={config.columns}
                      style={{ width: '100%' }}
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
                              width: '100%',
                              padding: 8,
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
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        name="title"
                        label="标题"
                      />
                      <ProFormSelect
                        label="值类型"
                        name="valueType"
                        options={valueTypeArray.map((valueType) => ({
                          label: valueType.label,
                          value: valueType.value,
                        }))}
                      />
                      <ProFormText label="列提示" name="tooltip" />
                      <ProFormGroup>
                        <ProFormSwitch label="过长省略" name="ellipsis" />
                        <ProFormSwitch label="复制按钮" name="copyable" />
                        <ProFormSwitch label="表格中隐藏" name="hideInTable" />
                        <ProFormSwitch label="筛选中隐藏" name="hideInSearch" />
                        <ProFormSwitch label="是否Key" name="key" />
                        <ProFormSwitch tooltip="排序实现需要手写sorter: (a, b) => a.age - b.age," label="开启排序" name="sorter" />
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
              label: '数据源',
              key: 'tab5',
              children: (
                <>
                  <ProForm
                    layout="horizontal"
                    size={configSettingUI.size}
                    formRef={dataSourceFormRef}
                    submitter={false}
                    initialValues={config.dataSource}
                    onFinish={async (values) => {
                      // console.debug(values);
                      return true;
                    }}
                  >
                    <Button htmlType="button" onClick={fillDataSource} key="edit">
                      一键填写
                    </Button>
                    <ProFormGroup title="查-列表" collapsible defaultCollapsed={true}>
                      <ProFormText
                        name={['apiList', 'apiSelectList', 'url']}
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
                        name={['apiList', 'apiSelectList', 'method']}
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
                        name={['apiList', 'apiSelectList', 'afterScript']}
                        label="后执行脚本"
                        tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                        placeholder="请输入后执行脚本"
                      />
                      <Button type="primary" onClick={() => exetDataSource('apiSelectList')}>
                        执行
                      </Button>
                    </ProFormGroup>
                    <ProFormGroup title="查-详情" collapsible defaultCollapsed={true}>
                      <ProFormText
                        name={['apiList', 'apiSelectDetail', 'url']}
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
                        name={['apiList', 'apiSelectDetail', 'method']}
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
                        name={['apiList', 'apiSelectDetail', 'afterScript']}
                        label="后执行脚本"
                        tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                        placeholder="请输入后执行脚本"
                      />
                      <Button type="primary" onClick={() => exetDataSource('apiSelectDetail')}>
                        执行
                      </Button>
                    </ProFormGroup>
                    <ProForm.Group title="增" collapsible defaultCollapsed={true}>
                      <ProFormText
                        name={['apiList', 'apiAdd', 'url']}
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
                        name={['apiList', 'apiAdd', 'method']}
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
                        name={['apiList', 'apiAdd', 'afterScript']}
                        label="后执行脚本"
                        tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                        placeholder="请输入后执行脚本"
                      />
                    </ProForm.Group>
                    <ProForm.Group title="改" collapsible defaultCollapsed={true}>
                      <ProFormText
                        name={['apiList', 'apiUpdate', 'url']}
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
                        name={['apiList', 'apiUpdate', 'method']}
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
                        name={['apiList', 'apiUpdate', 'afterScript']}
                        label="后执行脚本"
                        tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                        placeholder="请输入后执行脚本"
                      />
                    </ProForm.Group>
                    <ProForm.Group title="删" collapsible defaultCollapsed={true}>
                      <ProFormText
                        name={['apiList', 'apiDelete', 'url']}
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
                        name={['apiList', 'apiDelete', 'method']}
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
                        name={['apiList', 'apiDelete', 'afterScript']}
                        label="后执行脚本"
                        tooltip="解析返回的数据,response为响应数据,data代表解析到的数据,total代表总条数"
                        placeholder="请输入后执行脚本"
                      />
                    </ProForm.Group>
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
                    size={configSettingUI.size}
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
                      // console.debug(values);
                      generate(values);
                      // message.success('提交成功');
                      return true;
                    }}
                  >
                    <ProFormText
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
    </>
  );
};
ProTableDynamicSettings.propTypes = {
  dynamicSetConfig: PropTypes.func,
  dynamicSetDataSource: PropTypes.func,
  onSettingEvent: PropTypes.func,
};

export default ProTableDynamicSettings;
