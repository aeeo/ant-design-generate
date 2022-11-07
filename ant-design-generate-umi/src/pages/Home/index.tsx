import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

import type { ProCardTabsProps } from '@ant-design/pro-components';
import { ProCard } from '@ant-design/pro-components';
import { Select, Space } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [tab, setTab] = useState('tab2');
  const [tabPosition, setTabPosition] =
    useState<ProCardTabsProps['tabPosition']>('top');

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {/* <Guide name={trim(name)} /> */}
        <div>
          <Space style={{ marginBlockEnd: 16 }}>
            Tab position：
            <Select
              value={tabPosition}
              onChange={(value) => setTabPosition(value)}
              dropdownMatchSelectWidth={false}
            >
              <Option value="top">top</Option>
              <Option value="bottom">bottom</Option>
              <Option value="left">left</Option>
              <Option value="right">right</Option>
            </Select>
          </Space>
          <ProCard
            tabs={{
              tabPosition,
              activeKey: tab,
              items: [
                {
                  label: `产品一`,
                  key: 'tab1',
                  children: `内容一`,
                },
                {
                  label: `产品二`,
                  key: 'tab2',
                  children: `内容二`,
                },
                {
                  label: `产品三`,
                  key: 'tab3',
                  children: `内容三`,
                },
              ],
              onChange: (key) => {
                setTab(key);
              },
            }}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default HomePage;
