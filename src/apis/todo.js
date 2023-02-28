import request from '@/utils/request'

export function getTodoList(params) {
  return request({
    url: '/select',
    method: 'get',
    params: params
  })
}

export function getTodoStatusList(params) {
  return request({
    url: '/selectStatus',
    method: 'get',
    params: params
  })
}

export function addTodoItem(params) {
  return request({
    url: '/add',
    method: 'post',
    params: params
  })
}

export function updateTodoItem(params) {
  return request({
    url: '/update',
    method: 'put',
    params: params
  })
}

export function updateTodoStatus(params) {
  return request({
    url: '/updateStatus',
    method: 'put',
    params: params
  })
}

export function deleteTodoItem(params) {
  return request({
    url: '/delete',
    method: 'delete',
    params: params
  })
}