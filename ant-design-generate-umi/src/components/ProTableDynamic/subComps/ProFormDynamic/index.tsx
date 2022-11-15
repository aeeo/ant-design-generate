import { ProForm } from '@ant-design/pro-components';
import { Switch } from 'antd';
import ProFormItemDynamic from '../ProFormItemDynamic';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import { ProFormText } from '@ant-design/pro-components';
import type { ProColumnType, ProFormInstance } from '@ant-design/pro-components';

const ProFormDynamic = (props: any) => {
  // 处理数据
  const dealFormFields = (formFields: any[]) => {
    if (!formFields || Object.keys(formFields).length === 0) return [];
    formFields.forEach((formField: any) => {
      formField.formFieldType = formField.formFieldType ?? 'ProFormText'; // 默认赋formFieldType类型为ProFormText
      formField.placeholder = formField.placeholder ?? '请输入';
      formField.tooltip = formField.tooltip ?? '';
      formField.value = formField.value ?? '';
    });
    return formFields;
  };
  const formFields = dealFormFields(props.config.columns);

  const baseFormRef = useRef<ProFormInstance>(); // 基础配置表单

  React.useEffect(() => {
    // 更新表单项
    // console.debug('ProFormDynamic 更新动态表单字段：', props.config);
    baseFormRef.current?.setFieldsValue(props.config.tableDataDetail);
  }, [props.config]);
  // console.debug('ProFormDynamic', props.config, formFields);
  return (
    <>
      <ProForm
        formRef={baseFormRef}
        layout="horizontal"
        readonly={props.config.readonly}
        initialValues={props.config.tableDataDetail}
        onValuesChange={(_, values) => {
          // console.debug(_, values);
        }}
      >
        {formFields?.map((formFieldInfo: any, index: number) => {
          return <ProFormItemDynamic formFieldInfo={formFieldInfo} key={index} />;
        })}
      </ProForm>
    </>
  );
};
ProFormDynamic.propTypes = {
  config: PropTypes.object,
  // type: PropTypes.oneOf(['formAdd', 'formEdit', 'formDetail']),
  // readonly: PropTypes.bool, // 表单是否只读
  // columns: PropTypes.array, // 表单列信息
  // apiList: PropTypes.array, // apiList信息
  ///开始删除
  dynamic: PropTypes.bool, // 是否动态组件
  ///结束删除
};
export default ProFormDynamic;
