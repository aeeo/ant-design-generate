import PropTypes from 'prop-types';
import { Button, Popconfirm, Space, Upload } from 'antd';
import AllOperation from './AllOperation';
import { EventInfo, EventType, TableRecord } from '../../entity/types';

export const OperationDynamic = (operationArr: Array<string>, onEvent: (eventInfo: EventInfo) => void, tableRecord: TableRecord) => {
  let returnComponent = <></>;
  if (!operationArr) {
    console.error('operationArr不能为空。');
    return returnComponent;
  }
  const myOnEvent = (type: EventType) => {
    onEvent({ type, tableRecord });
  };
  // console.debug('OperationDynamic', operationArr, onEvent, tableRecord);
  return (
    <>
      <Space>
        {operationArr?.map((operationItem: any, index: number) => {
          return <AllOperation operation={operationItem} onEvent={() => myOnEvent(operationItem)} key={index} />;
        })}
      </Space>
    </>
  );
};
