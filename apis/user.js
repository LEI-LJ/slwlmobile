import { axios } from '@/utils/request.js'
// debugger
export const accountLogin = (data) => {
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
