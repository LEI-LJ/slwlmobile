import { createUniFetch } from 'uni-app-fetch'
import { useUserStore } from '@/store/user.js'
const userStore = useUserStore()
// console.log(token.value)
// 使用自定义选项创建实例
export const axios = createUniFetch({
  loading: { title: '正在加载中...' },
  baseURL: 'https://slwl-api.itheima.net',
  intercept: {
    // 请求拦截器
    request(options) {
      const defaultHeader = {}
      if (userStore.token) {
        defaultHeader.Authorization = userStore.token
      }

      options.header = { ...defaultHeader, ...options.header }
      return options
    },
    // 响应拦截器
    response(result) {
      const tabBarPagePaths = [
        'pages/task/index',
        'pages/message/index',
        'pages/my/index',
      ]

      const currentPage = getCurrentPages()[getCurrentPages().length - 1].route
      const type = tabBarPagePaths.includes(currentPage)
        ? 'switchTab'
        : 'navigateTo'

      if (result.data.code === 200) {
        uni.utils.toast('数据请求成功', 'success')
        return result.data
      } else if (result.statusCode === 401) {
        // 跳转到登录 页面 告知 从哪个界面来的
        uni.reLaunch({
          url: `/pages/login/index?redirectUrl=/${currentPage}&type=${type}`,
        })
      } else {
        uni.utils.toast()
        return result
      }
    },
  },
})
// 模块导出
