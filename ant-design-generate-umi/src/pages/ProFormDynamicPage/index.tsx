import ProFormDynamicSettings from '../../components/ProFormDynamicSettings';
import { initConfig } from '../../components/ProTableDynamic/config';

// 初始数据列
const proFormDynamicSettingsPage = () => {
  // console.debug(
  //   'proFormDynamicSettingsPage',
  //   initConfig(() => {}),
  // );
  return <ProFormDynamicSettings type={'formDetail'} config={initConfig(() => {})} />;
};

export default proFormDynamicSettingsPage;
