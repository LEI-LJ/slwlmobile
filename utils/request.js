import { createUniFetch } from 'uni-app-fetch'

// 使用自定义选项创建实例
export const axios = createUniFetch({
  loading: { title: '正在加载中...' },
  baseURL: 'https://slwl-api.itheima.net',
  intercept: {
    // 请求拦截器
    request(options) {
      return options
    },
    // 响应拦截器
    response(result) {
      if (result.data.code === 200) {
        uni.utils.toast('数据请求成功', 'success')
        return result.data
      } else {
        uni.utils.toast()
        return result
      }
    },
  },
})
// 模块导出
