import PropTypes from 'prop-types';
import type { ColumnParams } from '../../../../entity/types';
import AllOperation from './AllOperation';

export const OperationDynamic = (operationArr: Array<string>, columnParams: ColumnParams) => {
  let returnComponent = <></>;
  if (!operationArr) {
    console.error('operationArr不能为空。');
    return returnComponent;
  }

  console.debug('OperationDynamic', operationArr);
  return (
    <>
      {operationArr?.map((operationItem: any, index: number) => {
        return <AllOperation operation={operationItem} columnParams={columnParams} key={index} />;
      })}
    </>
  );
};
