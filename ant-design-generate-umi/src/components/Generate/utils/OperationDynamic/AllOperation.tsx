import * as Icons from '@ant-design/icons';
import PropTypes from 'prop-types';
import IconsDynamic from '../../subComps/IconsDynamic';

const AllOperation = (props: any) => {
  const operation = props.operation;
  const onEvent = props.onEvent;

  let returnComponent = <></>;
  if (!operation) {
    console.error('operation不能为空。');
    return returnComponent;
  }
  console.debug('AllOperation', props);
  switch (operation) {
    case 'detail':
      returnComponent = <IconsDynamic key="FileSearchOutlined" iconName="FileSearchOutlined" tooltip="详情" onEvent={onEvent} />;
      break;
    case 'edit':
      returnComponent = <IconsDynamic key="EditOutlined" iconName="EditOutlined" tooltip="编辑" onEvent={onEvent} />;
      break;
    case 'delete':
      returnComponent = <IconsDynamic key="DeleteOutlined" iconName="DeleteOutlined" tooltip="删除" onEvent={onEvent} />;
      break;
  }
  return returnComponent;
};
AllOperation.propTypes = {
  operation: PropTypes.string,
  onEvent: PropTypes.func,
};
export default AllOperation;
