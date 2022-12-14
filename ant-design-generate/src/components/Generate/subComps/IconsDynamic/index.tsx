import { FileSearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const IconsDynamic = (props: any) => {
  const onMyEvent = () => {
    const { reactNode, entity, index, type } = props.columnRender;
    props.onEvent(reactNode, entity, index, type);
    console.log('IconsDynamic OnEvent');
  };
  console.debug('IconsDynamic');
  return (
    <>
      <FileSearchOutlined
        onClick={() => {
          onMyEvent();
        }}
      />
    </>
  );
};
IconsDynamic.propTypes = {
  onEvent: PropTypes.func,
  columnRender: PropTypes.object,
};
export default IconsDynamic;
