import { axios } from '@/utils/request.js'

/**
 * @param {string}
 */
// 获取任务列表
export const getTaskList = (status, page = 1, pageSize = 10) => {
  return axios.get('/driver/tasks/list', { status, page, pageSize })
}
// 获取任务详情
/**
 * @param()
 */
export const TaskDetail = (id) => {
  return axios.get(`/driver/tasks/details/${id}`)
}

// 延迟收货

export const delayReasonModify = (data) => {
  return axios.put('/driver/tasks/delay', data)
}

// 提货

export const takeDelivery = (data) => {
  return axios.post('/driver/tasks/takeDelivery', data)
}

// 上报异常

export const reportException = (data) => {
  return axios.post('/driver/tasks/reportException', data)
}
// 交付
export const deliver = (data) => {
  return axios.post('/driver/tasks/deliver', data)
}
// 回车登记
export const truckRegistration = (data)=> axios.post('/driver/tasks/truckRegistration',data)