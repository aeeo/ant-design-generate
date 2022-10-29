import type { ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import { columns, genData, initConfig } from './config';

export default () => {
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

  return (
    <>
      <ProTable
        {...config}
        formRef={ref}
        pagination={
          config.pagination?.show
            ? config.pagination
            : {
                pageSize: 5,
              }
        }
        rowKey={'key'}
        search={config.search?.show ? config.search : false}
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
    </>
  );
};
