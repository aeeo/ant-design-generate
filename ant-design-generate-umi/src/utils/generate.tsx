import { replaceStringByRegExp } from './regexp';
const operationTag = 'operationTag';

const generate = (initData: any, columnsStr: string) => {
  let columns = [];
  columns = initData.columns?.map((item: any) => {
    // columns中无法被序列化的数据
    if (item.dataIndex === 'table-operation') {
      return operationTag;
    }
    return item;
  });

  let tempColumnsStr = JSON.stringify(columns);
  tempColumnsStr = replaceStringByRegExp(operationTag, tempColumnsStr, columnsStr);
  initData.columns = '///去除引号genColumns({ onEvent: () => {} })///去除引号';
  return [initData, tempColumnsStr];
};
export default generate;
