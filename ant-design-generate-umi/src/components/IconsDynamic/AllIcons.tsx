import * as Icons from '@ant-design/icons';
import PropTypes from 'prop-types';
const AllIcons = (props: any) => {
  const onMyEvent = () => {
    props.onEvent();
    // console.debug('AllIcons OnEvent');
  };
  const iconName = props.iconName;
  let returnComponent = <></>;
  if (!iconName) {
    console.error('iconName不能为空。');
    return returnComponent;
  }
  console.debug('IconsDynamic', props);
  switch (iconName) {
    case 'FileSearchOutlined':
      returnComponent = (
        <Icons.FileSearchOutlined
          onClick={() => {
            onMyEvent();
          }}
        />
      );
      break;
    case 'DeleteOutlined':
      returnComponent = (
        <Icons.DeleteOutlined
          onClick={() => {
            onMyEvent();
          }}
        />
      );
      break;
    case 'EditOutlined':
      returnComponent = (
        <Icons.EditOutlined
          onClick={() => {
            onMyEvent();
          }}
        />
      );
      break;
  }
  return returnComponent;
};
AllIcons.propTypes = {
  onEvent: PropTypes.func,
  iconName: PropTypes.string,
};
export default AllIcons;
