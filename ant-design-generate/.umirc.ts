import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/dynamicForm', component: '@/pages/ProTableDynamic/addFormDynamic.tsx' },
    { path: '/dynamicFormPreview', component: '@/components/ProTableDynamic/subComps/ProFormDynamic/index.tsx' },
    { path: '/generate', component: '@/generate/generate/table.tsx' },
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
