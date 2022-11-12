import * as Icons from '@ant-design/icons';
import PropTypes from 'prop-types';
import IconsDynamic from '../IconsDynamic';
import type { ColumnParams } from '../../../../entity/types';

const AllOperation = (props: any) => {
  const operation = props.operation;
  const columnParams = props.columnParams;

  let returnComponent = <></>;
  if (!operation) {
    console.error('operation不能为空。');
    return returnComponent;
  }
  // console.debug('AllOperation', props);
  switch (operation) {
    case 'detail':
      returnComponent = (
        <IconsDynamic key="FileSearchOutlined" iconName="FileSearchOutlined" tooltip="详情" onEvent={columnParams.onEvent} columnRender={columnParams.columnRender} />
      );
      break;
  }
  return returnComponent;
};
AllOperation.propTypes = {
  operation: PropTypes.object,
  columnParams: PropTypes.object,
};
export default AllOperation;
