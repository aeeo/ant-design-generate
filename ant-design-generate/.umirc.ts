import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/dynamicForm', component: '@/pages/ProTableDynamicPage' },
    { path: '/dynamicFormPreview', component: '@/components/ProFormDynamic' },
    { path: '/generate', component: '@/components/Generate' },
    // { path: '/temporary', component: '@/generate/Temporary/table.tsx' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:8081/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  dva: {}, // redux
});
