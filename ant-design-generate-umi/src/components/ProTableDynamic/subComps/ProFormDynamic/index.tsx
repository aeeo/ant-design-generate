import { ProForm } from '@ant-design/pro-components';
import { Switch } from 'antd';
import ProFormItemDynamic from '../ProFormItemDynamic';
import { useState } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

const ProFormDynamic = (props: any) => {
  // 处理数据
  const dealFormFields = (formFields: any[]) => {
    if (!formFields || Object.keys(formFields).length === 0) return [];
    formFields.forEach((formField: any) => {
      formField.formFieldType = formField.formFieldType ?? 'ProFormText'; // 默认赋formFieldType类型为ProFormText
      formField.placeholder = formField.placeholder ?? '请输入';
      formField.tooltip = formField.tooltip ?? '';
    });
    return formFields;
  };

  const formFields = dealFormFields(props.columns);

  const [readonly, setReadonly] = useState(props.readonly);
  ///开始删除
  if (props.dynamic) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      // console.debug('ProFormDynamic readonly 改变', props.readonly);
      setReadonly(props.readonly);
    }, [props.readonly]);
  }
  ///结束删除

  const [formData, setFormData] = useState<any>({});
  console.debug('ProFormDynamic', props.type, readonly, formFields, props.apiList);
  return (
    <>
      <ProForm
        layout="horizontal"
        readonly={readonly}
        initialValues={formData}
        onValuesChange={(_, values) => {
          console.debug(values);
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
  type: PropTypes.oneOf(['formAdd', 'formEdit', 'formDetail']),
  readonly: PropTypes.bool, // 表单是否只读
  columns: PropTypes.array, // 表单列信息
  apiList: PropTypes.array, // apiList信息
  ///开始删除
  dynamic: PropTypes.bool, // 是否动态组件
};
export default ProFormDynamic;
