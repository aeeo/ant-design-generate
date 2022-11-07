import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  // layout: {
  //   title: '@umijs/max',
  // },
  routes: [
    {
      path: '/',
      // redirect: './index.tsx',
      component: '@/pages/index',
    },
    { path: '/dynamicForm', component: '@/pages/ProTableDynamicPage' },
    { path: '/dynamicFormPreview', component: '@/components/ProFormDynamic' },
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
