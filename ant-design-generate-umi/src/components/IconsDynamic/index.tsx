import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import AllIcons from './AllIcons';

const IconsDynamic = (props: any) => {
  const onMyEvent = () => {
    const { reactNode, entity, index, type } = props.columnRender;
    props.onEvent(reactNode, entity, index, type);
    console.debug('IconsDynamic OnEvent');
  };
  console.debug('IconsDynamic', props);

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
  columnRender: PropTypes.object,
};
export default IconsDynamic;
