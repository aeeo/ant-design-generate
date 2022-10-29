//#region import
import type {
  ProColumnType,
  ProFormInstance,
} from '@ant-design/pro-components';
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
  ProTable,
  useDebounceFn,
  FormListActionType,
} from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import React from 'react';
import { useRef, useState } from 'react';
import request from 'umi-request';
//#endregion

export default () => {
  const actionRef = useRef<
    FormListActionType<{
      name: string;
    }>
  >();
  const actionGuard = {
    beforeAddRow: async (defaultValue: any, insertIndex: any, count: any) => {
      return new Promise((resolve) => {
        console.log(defaultValue?.name, insertIndex, count);
        setTimeout(() => resolve(true), 1000);
      });
    },
    beforeRemoveRow: async (index: any, count: any) => {
      const row = actionRef.current?.get(index as number);
      console.log('--->', index, count, row);
      return new Promise((resolve) => {
        if (index === 0) {
          resolve(false);
          return;
        }
        setTimeout(() => resolve(true), 1000);
      });
    },
  };

  return (
    /**
     * @name 获取到 list 操作实例
     * @description 可用删除，新增，移动等操作
     *
     * @example  actionRef?.current.add?.({},1);
     * @example  actionRef?.current.remove?.(1);
     * @example  actionRef?.current.move?.(1,2);
     * @example  actionRef?.current.get?.(1);
     */
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const list = actionRef.current?.getList();
            actionRef.current?.add({
              name: '新增' + list?.length,
            });
          }}
        >
          增加一行
        </Button>
        <Button
          danger
          onClick={() => {
            actionRef.current?.remove(1);
          }}
        >
          删除一行
        </Button>
        <Button
          onClick={() => {
            actionRef.current?.move(1, 0);
          }}
        >
          移动到第一行
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            const row = actionRef.current?.get(1);
            console.log(row);
          }}
        >
          获取一行数据
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            const row = actionRef.current?.getList();
            console.log(row);
          }}
        >
          获取所有数据
        </Button>
      </Space>
      {/* <ProFormList actionGuard={actionGuard} actionRef={actionRef}>
        <ProFormText key="useMode" name="name" label="姓名" />
      </ProFormList> */}
    </>
  );
};
