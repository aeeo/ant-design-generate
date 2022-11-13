import * as Icons from '@ant-design/icons';
import PropTypes from 'prop-types';
import IconsDynamic from '../../subComps/IconsDynamic';

const AllOperation = (props: any) => {
  const operation = props.operation;
  const onEvent = props.onEvent;
  const columnRender = props.columnRender;

  let returnComponent = <></>;
  if (!operation) {
    console.error('operation不能为空。');
    return returnComponent;
  }
  // console.debug('AllOperation', props);
  switch (operation) {
    case 'detail':
      returnComponent = <IconsDynamic key="FileSearchOutlined" iconName="FileSearchOutlined" tooltip="详情" onEvent={onEvent} columnRender={columnRender} />;
      break;
  }
  return returnComponent;
};
AllOperation.propTypes = {
  operation: PropTypes.object,
  onEvent: PropTypes.func,
  columnRender: PropTypes.object,
};
export default AllOperation;
