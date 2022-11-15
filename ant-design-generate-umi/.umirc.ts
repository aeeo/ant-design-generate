import { defineConfig } from '@umijs/max';
import { RunTimeLayoutConfig } from '@umijs/max';
import { CaretDownFilled, DoubleRightOutlined, GithubFilled, InfoCircleFilled, PlusCircleFilled, QuestionCircleFilled, SearchOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import type { ProSettings } from '@ant-design/pro-layout';
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-layout';
import { Button, Divider, Dropdown, Input } from 'antd';
import React, { useState } from 'react';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  // layout: {
  //   title: 'Antd 可视化生成器',
  //   logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
  // },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      name: '基础ProTable', // 兼容此写法
    },
    { path: '/dynamicForm', component: '@/pages/ProFormDynamicPage' },
    // { path: '/dynamicFormPreview', component: '@/components/ProFormDynamic' },
    { path: '/generate', component: '@/components/Generate' },
  ],
  fastRefresh: true,
  npmClient: 'yarn',
  proxy: {
    '/api': {
      target: 'http://localhost:8081/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  dva: {}, // redux
});
