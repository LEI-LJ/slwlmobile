import { axios } from '@/utils/request.js'
// debugger
export const accountLogin = (data) => {
  // console.log(data.account,data.);
  if (!data.account || !data.password)
    return uni.utils.toast('账号密码没有参数')

  return axios.post('/driver/login/account', data)
}
// 获取验证码
export const getCaptcha = () => {
  return axios.get('/driver/register/captcha')
}
// 注册账号
export const registerAccount = (data) => {
  return axios.post('/driver/register/account', data)
}

// 获取个人信息

export const getUserInfo = () => {
  return axios.get('/driver/users')
}

// 车辆信息
export const UserTruckInfo = () => {
  return axios.get('/driver/users/truck')
}

// 任务数据
export const getTaskReport = (data) => {
  return axios.get('/driver/users/taskReport', data)
}
