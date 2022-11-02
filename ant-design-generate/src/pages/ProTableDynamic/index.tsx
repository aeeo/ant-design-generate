import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import { columns, genData, initConfig } from './config';
import ProTableDynamicSettings from './setting';
import DynamicProTable from './table';
// import Form from '../FormClient';
import ProFormDynamic from '../ProFormDynamic';
const ProTableDynamic = () => {
  const ref = useRef<ProFormInstance>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [config, setConfig] = useState<any>(initConfig);
  const generateData = genData(config.showPagination ? config.pagination?.total : 10);
  const [tableData, setTableData] = useState<any>(generateData);

  // (config.columns || columns) 配置缓存
  const tableColumns = (config.columns || columns)?.map((item: any) => ({
    ...item,
    ellipsis: config.ellipsis,
  }));

  //#region 数据源
  // 获取数据
  const exetDataSource = (newConfig: any, tableColumn: any, tableDataList: any) => {
    if (!tableColumn || !tableDataList) return;
    setTableData(() => [...tableDataList]);
    // newConfig.columns = tableColumn;
    // setConfig(() => ({ ...newConfig }));
  };
  //#endregion

  //#region props方法
  // 更新配置
  const dynamicSetConfig = (newConfig: any) => {
    setConfig(() => ({ ...newConfig }));
  };
  // 更新数据源
  const dynamicSetDataSource = (newConfig: any, tableColumn: any, tableDataList: any) => {
    exetDataSource(newConfig, tableColumn, tableDataList);
  };
  //#region props方法
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
          <DynamicProTable config={config} tableData={tableData} />
        </ProCard>
        <ProTableDynamicSettings dynamicSetConfig={dynamicSetConfig} dynamicSetDataSource={dynamicSetDataSource} />
      </ProCard>
    </>
  );
};

export default ProTableDynamic;
