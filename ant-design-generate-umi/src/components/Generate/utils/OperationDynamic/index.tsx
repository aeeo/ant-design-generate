import PropTypes from 'prop-types';
import { Button, Popconfirm, Space, Upload } from 'antd';
import AllOperation from './AllOperation';

export const OperationDynamic = (operationArr: Array<string>, onEvent: (_: React.ReactNode, entity: any, index: number, type: string) => void, columnRender: any) => {
  let returnComponent = <></>;
  if (!operationArr) {
    console.error('operationArr不能为空。');
    return returnComponent;
  }
  const myOnEvent = (type: any) => {
    onEvent(columnRender.reactNode, columnRender.entity, columnRender.index, type);
  };

  console.debug('OperationDynamic', operationArr, onEvent, columnRender);
  return (
    <>
      <Space>
        {operationArr?.map((operationItem: string, index: number) => {
          return <AllOperation operation={operationItem} onEvent={() => myOnEvent(operationItem)} key={index} />;
        })}
      </Space>
    </>
  );
};
