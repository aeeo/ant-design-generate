import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { genColumns, genData, initConfig } from './config';
import ProFormDynamic from './subComps/ProFormDynamic';
import type { ProColumns } from '@ant-design/pro-components';

const DynamicProTable = (props: any) => {
  let [config, setConfig] = new Array();
  let [tableData, setTableData] = new Array();

  if (props.dynamic) {
    [config, setConfig] = useState<any>(props.config);
    //#region 开发阶段Props相关
    React.useEffect(() => {
      console.debug('table的config发生变化:', config);
      setConfig(props.config);
    }, [props.config]);

    const generateData = genData(config.showPagination ? config.pagination?.total : 10);
    [tableData, setTableData] = useState<any>(generateData);
    React.useEffect(() => {
      console.debug('table的tableData发生变化:', tableData, props.tableData);
      setTableData(props.tableData);
    }, [props.tableData]);

    // 监听上级组件传来的event事件信息，用于更新表格弹框行为等动作
    const [eventInfo, setEventInfo] = useState<any>(props.eventInfo);
    React.useEffect(() => {
      console.debug('table的eventInfo发生变化:', eventInfo, props.eventInfo);
      // setEventInfo(props.eventInfo);
      if (!props.eventInfo) return;
      const { reactNode, entity, index, type } = props.eventInfo;
      onSubEvent(reactNode, entity, index, type);
    }, [props.eventInfo]);
    //#endregion
  } else {
    [config, setConfig] = useState<any>(initConfig);
    const generateData = genData(config.showPagination ? config.pagination?.total : 10);
    [tableData, setTableData] = useState<any>(generateData);
  }
  const proTableRef = useRef<ProFormInstance>();

  // 控制弹框显示隐藏
  const toggleModalStatus = () => {
    config.event.showDetailModal = !config.event.showDetailModal;
    console.log('更新Modal', config.event.showDetailModal);
    setConfig({ ...config });
  };

  // (config.columns || columns) 配置缓存
  const myColumns = genColumns({
    onEvent: (_, entity: any, index: number, type: string) => {
      onSubEvent(_, entity, index, type);
    },
    columns: config.columns,
  });
  const tableColumns = myColumns?.map((item: any) => ({
    ...item,
    ellipsis: config.ellipsis,
  }));

  // 子组件事件
  const onSubEvent = (_: React.ReactNode, entity: any, index: number, type: string) => {
    switch (type) {
      case 'detail':
        toggleModalStatus();
        break;
    }
  };

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
            expandedRowRender: (record: any) => <p>{record.description}</p>,
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
          <ProFormDynamic columns={config.columns} />
        </div>
      </Modal>
    </>
  );
};

DynamicProTable.propTypes = {
  config: PropTypes.object,
  tableData: PropTypes.array,
  eventInfo: PropTypes.object,
  dynamic: PropTypes.bool, // 是否动态组件（非生成好的）
};

export default DynamicProTable;
