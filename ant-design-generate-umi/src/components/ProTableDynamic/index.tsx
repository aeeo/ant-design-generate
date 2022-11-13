import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { genColumns, genData, initConfig } from './config';
import ProFormDynamicSettings from '../ProFormDynamicSettings'; // 带配置的ProForm
import ProFormDynamic from './subComps/ProFormDynamic'; // 不带配置的ProForm
import type { ProColumns } from '@ant-design/pro-components';
import dataSource from '../ProTableDynamic/utils/DataSource';
import { ApiType, EventInfo } from '../ProTableDynamic/entity/types';

const ProTableDynamic = (props: any) => {
  let [config, setConfig] = new Array();
  let [tableData, setTableData] = new Array();

  // 控制弹框显示隐藏
  const toggleModalStatus = () => {
    config.event.showDetailModal = !config.event.showDetailModal;
    console.debug('更新Modal', config.event.showDetailModal);
    setConfig({ ...config });
  };
  // 子组件事件
  const onSubEvent = async (eventInfo: EventInfo) => {
    // console.warn(tableRecord);
    switch (eventInfo.type) {
      case 'eventDetail': {
        const { url, method, afterScript } = config.apiList['apiSelectDetail'];
        const tableDataDetail: any = await dataSource('apiSelectDetail', url, method, afterScript);
        toggleModalStatus();
        break;
      }
    }
  };
  ///开始删除
  if (props.dynamic) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [config, setConfig] = useState<any>(props.config);
    //#region 开发阶段Props相关
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      console.debug('ProTableDynamic的config发生变化:', config);
      setConfig(props.config);
    }, [props.config]);

    const generateData = genData(config.showPagination ? config.pagination?.total : 10);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [tableData, setTableData] = useState<any>(generateData);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      console.debug('ProTableDynamic的tableData发生变化:', tableData, props.tableData);
      setTableData(props.tableData);
    }, [props.tableData]);

    // 监听上级组件传来的event事件信息，用于更新表格弹框行为等动作
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [eventInfo, setEventInfo] = useState<EventInfo>(props.eventInfo);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      console.debug('ProTableDynamic的eventInfo发生变化:', eventInfo, props.eventInfo);
      // setEventInfo(props.eventInfo);
      if (!props.eventInfo) return;
      onSubEvent(props.eventInfo);
    }, [props.eventInfo]);
    //#endregion
  } else {
    ///结束删除
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [config, setConfig] = useState<any>(initConfig(onSubEvent));
    const generateData = genData(config.showPagination ? config.pagination?.total : 10);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    [tableData, setTableData] = useState<any>(generateData);
    ///开始删除
  }
  ///结束删除
  const proTableRef = useRef<ProFormInstance>();

  // const myColumns: any[] = genColumns({
  //   onEvent: (_, entity: any, index: number, type: string) => {
  //     message.warn('哈哈哈index');
  //     onSubEvent(_, entity, index, type);
  //   },
  //   columns: config.columns,
  // });
  // const tableColumns = myColumns?.map((item: any) => ({
  //   ...item,
  //   ellipsis: config.ellipsis,
  // }));
  // const tableColumns = config.columns;
  console.debug('ProTableDynamic 初始化', props);

  return (
    <>
      <ProTable
        {...config}
        formRef={proTableRef}
        pagination={config.showPagination ? config.pagination : config.showPagination}
        rowKey={'key'}
        search={config.showSearch ? config.search : config.showSearch}
        expandable={
          config.expandable && {
            expandedRowRender: (record: any) => <>{record.description}</>,
          }
        }
        options={config.options?.show ? config.options : false}
        toolBarRender={
          config?.toolBarRender
            ? (action) => [
                <Button key="refresh" type="primary">
                  刷新
                </Button>,
              ]
            : false
        }
        headerTitle={config.headerTitle}
        tooltip={config.headerTooltip}
        columns={config.columns}
        dataSource={tableData}
        scroll={config.openScroll ? config.scroll : null}
        footer={config.showFooter ? () => config.footerTitle : false}
      />
      <Modal
        title="详情"
        open={config.event.showDetailModal}
        onOk={toggleModalStatus}
        onCancel={toggleModalStatus}
        style={{ top: 20 }}
        width={1300}
        footer={[
          <Button key="back" onClick={toggleModalStatus}>
            取消
          </Button>,
        ]}
      >
        <div style={{ height: '700px', overflow: 'auto' }}>
          {
            ///开始删除
            props.dynamic ? (
              <ProFormDynamicSettings columns={config.columns} />
            ) : (
              ///结束删除
              <ProFormDynamic columns={config.columns} />
              ///开始删除
            )
            ///结束删除
          }
        </div>
      </Modal>
    </>
  );
};

ProTableDynamic.propTypes = {
  config: PropTypes.object,
  tableData: PropTypes.array,
  eventInfo: PropTypes.object,
  dynamic: PropTypes.bool, // 是否动态组件（非生成好的）
};

export default ProTableDynamic;
