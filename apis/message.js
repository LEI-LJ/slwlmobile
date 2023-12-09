import { axios } from '@/utils/request.js'
// 消息列表
export const getMessageList = (contentType, page = 1, pageSize = 10) => {
  return axios.get('/driver/messages/page', { contentType, page, pageSize })
}

// 未读消息数量
export const noReadQuantity = (contentType) => {
  return axios.get('/driver/messages/countType/' + contentType)
}
// 标记已读消息

export const modifyMessage = (id) => {
  return axios.put(`/driver/messages/${id}`)
}
// 全部已读

export const allIsRead = (id) => {
  return axios.put(`/driver/messages/${id}`)
}

