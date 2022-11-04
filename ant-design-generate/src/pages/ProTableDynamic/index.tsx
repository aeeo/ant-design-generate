import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import { genData, initConfig } from './config';
import ProTableDynamicSettings from './setting';
import DynamicProTable from './table';
// import Form from '../FormClient';
import ProFormDynamic from '../ProFormDynamic';
const ProTableDynamic = () => {
  const ref = useRef<ProFormInstance>();

  const [config, setConfig] = useState<any>(initConfig);
  const generateData = genData(config.showPagination ? config.pagination?.total : 10);
  const [tableData, setTableData] = useState<any>(generateData);

  // (config.columns || columns) 配置缓存
  // const tableColumns = (config.columns || columns)?.map((item: any) => ({
  //   ...item,
  //   ellipsis: config.ellipsis,
  // }));

  // ({
  //   onEvent: (_, entity: any, index: number, type: string) => {
  //     onSettingEvent(_, entity, index, type);
  //   },
  // })

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
  // 配置的事件
  const [eventInfo, setEventInfo] = useState<any>({});
  const onSettingEvent = (_: React.ReactNode, entity: any, index: number, type: string) => {
    console.debug('操作事件监听', entity, index, type);
    setEventInfo({ reactNode: _, entity, index, type });
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
          <DynamicProTable dynamic={true} config={config} tableData={tableData} eventInfo={eventInfo} />
        </ProCard>
        <ProTableDynamicSettings onSettingEvent={onSettingEvent} dynamicSetConfig={dynamicSetConfig} dynamicSetDataSource={dynamicSetDataSource} />
      </ProCard>
    </>
  );
};

export default ProTableDynamic;
