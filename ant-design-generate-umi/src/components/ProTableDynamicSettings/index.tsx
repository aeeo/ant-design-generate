import type { ProFormInstance } from '@ant-design/pro-components';
import React from 'react';
import { useRef, useState } from 'react';
import { genData, initConfig } from '../ProTableDynamic/config';
import ProTableDynamicSettings from './Settings/setting';
import ProTableDynamic from '../ProTableDynamic';
import { ApiType, EventInfo } from '../ProTableDynamic/entity/types';

const ProTableDynamicShow = () => {
  const ref = useRef<ProFormInstance>();

  // 配置的事件
  const [eventInfo, setEventInfo] = useState<any>({});
  const onSettingEvent = (newEventInfo: EventInfo) => {
    console.debug('操作事件监听', newEventInfo);
    setEventInfo(newEventInfo);
  };

  const [config, setConfig] = useState<any>(initConfig(() => onSettingEvent));
  const generateData = genData(config.showPagination ? config.pagination?.total : 10);
  const [tableData, setTableData] = useState<any>(generateData);

  //#region 数据源
  // 获取数据
  const exetTableListDataSource = (tableDataList: any) => {
    if (!tableDataList) return;
    setTableData(() => [...tableDataList]);
  };
  //#endregion

  //#region props方法
  // 更新配置
  const dynamicSetConfig = (newConfig: any) => {
    // console.log('setting更新config', newConfig);
    setConfig(() => ({ ...newConfig }));
  };
  // 更新数据源
  const dynamicSetDataSource = (tableDataList: any) => {
    exetTableListDataSource(tableDataList);
  };
  //#region props方法
  return (
    <>
      <div style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
        <div style={{ width: '70%', height: '100%', overflow: 'auto' }}>
          <ProTableDynamic dynamic={true} config={config} tableData={tableData} eventInfo={eventInfo} />
        </div>
        <div style={{ width: '30%', height: '100vh', overflow: 'auto' }}>
          <ProTableDynamicSettings onSettingEvent={onSettingEvent} dynamicSetConfig={dynamicSetConfig} dynamicSetDataSource={dynamicSetDataSource} />
        </div>
      </div>
    </>
  );
};

export default ProTableDynamicShow;
