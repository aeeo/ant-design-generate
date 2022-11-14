// 初始化配置
export const initConfig = {
  formType: 'formDetail', // 'formAdd' | 'formEdit' | 'formDetail'
  readonly: false, // 是否只读
  columns: [],
  // 数据源配置
  dataSource: {
    apiList: {
      apiSelectList: {
        url: '',
        method: '',
        afterScript: '',
        parameter: '',
        body: '',
      },
      apiSelectDetail: {
        url: '',
        method: '',
        afterScript: '',
        parameter: '',
        body: '',
      },
      apiAdd: {
        url: '',
        method: '',
        afterScript: '',
        parameter: '',
        body: '',
      },
      apiUpdate: {
        url: '',
        method: '',
        afterScript: '',
        parameter: '',
        body: '',
      },
      apiDelete: {
        url: '',
        method: '',
        afterScript: '',
        parameter: '',
        body: '',
      },
      apiDeleteBatch: {
        url: '',
        method: '',
        afterScript: '',
        parameter: '',
        body: '',
      },
    },
  },
};
