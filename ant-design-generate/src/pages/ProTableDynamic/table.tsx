import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { columns, genData, initConfig } from './config';
import ProFormDynamic from '../ProFormDynamic';
const DynamicProTable = (props: any) => {
  const ref = useRef<ProFormInstance>();

  const [config, setConfig] = useState<any>(props.config);
  React.useEffect(() => {
    console.debug('table的config发生变化:', config);
    setConfig(props.config);
  }, [props.config]);

  const generateData = genData(config.showPagination ? config.pagination?.total : 10);
  const [tableData, setTableData] = useState<any>(generateData);
  React.useEffect(() => {
    console.debug('table的tableData发生变化:', tableData);
    setTableData(props.tableData);
  }, [props.tableData]);

  const toggleModalStatus = () => {
    config.event.showDetailModal = !config.event.showDetailModal;
    console.log('更新Modal', config.event.showDetailModal);
    setConfig({ ...config });
  };

  // (config.columns || columns) 配置缓存
  const tableColumns = (config.columns || columns)?.map((item: any) => ({
    ...item,
    ellipsis: config.ellipsis,
  }));
  return (
    <>
      <ProTable
        {...config}
        formRef={ref}
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
};

export default DynamicProTable;
