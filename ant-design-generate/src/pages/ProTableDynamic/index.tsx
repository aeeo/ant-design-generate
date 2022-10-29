import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import type { DataType } from './config';
import { columns, genData, initConfig } from './config';
import './index.css';
import ProTableDynamicSettings from './setting';
const ProTableDynamic = () => {
  const ref = useRef<ProFormInstance>();

  const [config, setConfig] = useState<any>(initConfig);
  const generateData = genData(config.pagination?.total || 10);
  const [tableData, setTableData] = useState<any>(generateData);

  React.useEffect(() => {
    console.log('表格的config发生变化:', config);
  }, [config]);

  // (config.columns || columns) 配置缓存
  const tableColumns = (config.columns || columns)?.map((item: any) => ({
    ...item,
    ellipsis: config.ellipsis,
  }));

  //#region 数据源
  // 获取数据
  const exetDataSource = (
    newConfig: any,
    tableColumn: any,
    tableDataList: any,
  ) => {
    if (!tableColumn || !tableDataList) return;
    setTableData(() => [...tableDataList]);
    newConfig.columns = tableColumn;
    setConfig(() => ({ ...newConfig }));
  };
  //#endregion

  // 更新配置
  const dynamicSetConfig = (newConfig: any) => {
    setConfig(() => ({ ...newConfig }));
  };
  // 更新数据源
  const dynamicSetDataSource = (
    newConfig: any,
    tableColumn: any,
    tableDataList: any,
  ) => {
    exetDataSource(newConfig, tableColumn, tableDataList);
  };
  return (
    <>
      <ProCard
        split="vertical"
        bordered
        headerBordered
        style={{
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <ProCard
          style={{
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <ProTable
            {...config}
            formRef={ref}
            pagination={config.pagination?.show ? config.pagination : false}
            rowKey={'key'}
            search={config.showSearch ? config.search : config.showSearch}
            expandable={
              config.expandable && {
                expandedRowRender: (record: DataType) => (
                  <p>{record.description}</p>
                ),
              }
            }
            options={config.options?.show ? config.options : false}
            toolBarRender={
              config?.toolBarRender
                ? () => [
                    <Button key="refresh" type="primary">
                      刷新
                    </Button>,
                  ]
                : false
            }
            footer={config.footer ? () => 'Here is footer' : false}
            headerTitle={config.headerTitle}
            columns={tableColumns}
            dataSource={tableData}
            scroll={config.scroll}
          />
        </ProCard>
        <ProTableDynamicSettings
          dynamicSetConfig={dynamicSetConfig}
          dynamicSetDataSource={dynamicSetDataSource}
        />
      </ProCard>
    </>
  );
};

export default ProTableDynamic;
