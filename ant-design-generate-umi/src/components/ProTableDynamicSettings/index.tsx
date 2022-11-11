import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import { genData, initConfig } from '../ProTableDynamic/config';
import ProTableDynamicSettings from './Settings/setting';
import DynamicProTable from '../ProTableDynamic';

const ProTableDynamic = () => {
  const ref = useRef<ProFormInstance>();

  const [config, setConfig] = useState<any>(initConfig);
  const generateData = genData(config.showPagination ? config.pagination?.total : 10);
  const [tableData, setTableData] = useState<any>(generateData);

  //#region 数据源
  // 获取数据
  const exetDataSource = (tableDataList: any) => {
    if (!tableDataList) return;
    setTableData(() => [...tableDataList]);
  };
  //#endregion

  //#region props方法
  // 更新配置
  const dynamicSetConfig = (newConfig: any) => {
    console.log('setting更新config', newConfig);
    setConfig(() => ({ ...newConfig }));
  };
  // 更新数据源
  const dynamicSetDataSource = (tableDataList: any) => {
    exetDataSource(tableDataList);
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
      <div style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
        <div style={{ width: '70%', height: '100%', overflow: 'auto' }}>
          <DynamicProTable dynamic={true} config={config} tableData={tableData} eventInfo={eventInfo} />
        </div>
        <div style={{ width: '30%', height: '100vh', overflow: 'auto' }}>
          <ProTableDynamicSettings onSettingEvent={onSettingEvent} dynamicSetConfig={dynamicSetConfig} dynamicSetDataSource={dynamicSetDataSource} />
        </div>
      </div>
    </>
  );
};

export default ProTableDynamic;
