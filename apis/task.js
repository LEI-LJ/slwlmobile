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
