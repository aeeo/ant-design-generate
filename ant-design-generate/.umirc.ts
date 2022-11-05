import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/dynamicForm', component: '@/pages/ProTableDynamic/addForm.tsx' },
    { path: '/dynamicFormPreview', component: '@/components/ProTable/subComps/ProForm/index.tsx' },
    { path: '/generate', component: '@/components/ProTable/table.tsx' },
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
