import request from '@/utils/request'

export function getAllSets(params) {
  return request({
    url: '/taskManager/GetAllSet',
    method: 'get',
    params
  })
}

export function addTodo(params, data) {
  return request(({
    url: '/taskManager/AddTodo' + '?' + params,
    method: 'post',
    data
  }))
  // return request.post('/taskManager/AddTodo', data)
}

export function getSetsByCreater(params) {
  return request(({
    url: '/taskManager/GetSetByCreater',
    method: 'get',
    params
  }))
}

export function deleteTodo(params, data) {
  return request(({
    url: '/taskManager/DeleteTodo' + '?' + params,
    method: 'post',
    data
  }))
}

export function deleteSet(params, data) {
  return request(({
    url: '/taskManager/DeleteSet' + '?' + params,
    method: 'post',
    data
  }))
}

export function addSet(params, data) {
  return request(({
    url: '/taskManager/AddSet' + '?' + params,
    method: 'post',
    data
  }))
}
