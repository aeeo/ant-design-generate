import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import AllIcons from './AllIcons';

const IconsDynamic = (props: any) => {
  const onMyEvent = () => {
    props.onEvent();
  };
  // console.debug('IconsDynamic初始化', props);
  return (
    <>
      <Tooltip placement="top" title={props.tooltip}>
        <span>
          <AllIcons onEvent={onMyEvent} iconName={props.iconName} />
        </span>
      </Tooltip>
    </>
  );
};
IconsDynamic.propTypes = {
  onEvent: PropTypes.func,
  iconName: PropTypes.string,
  tooltip: PropTypes.string,
};
export default IconsDynamic;
