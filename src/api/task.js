import request from '@/utils/request'

export function getAllPublicSets(params) {
  return request({
    url: '/taskManager/GetAllPublicSet',
    method: 'get',
    params
  })
}

export function getSetsByCreater(params) {
  return request(({
    url: '/taskManager/GetSetByCreater',
    method: 'get',
    params
  }))
}

export function getActiveMap(params) {
  return request({
    url: '/taskManager/GetActiveMap',
    method: 'get',
    params
  })
}

export function getCollectState(params) {
  return request({
    url: '/taskManager/GetCollectState',
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

export function updateTodo(params, data) {
  return request(({
    url: '/taskManager/UpdateTodo' + '?' + params,
    method: 'post',
    data
  }))
}

export function updateSet(params, data) {
  return request(({
    url: '/taskManager/UpdateSet' + '?' + params,
    method: 'post',
    data
  }))
}

export function login(params, data) {
  return request({
    url: '/taskManager/Login' + '?' + params,
    method: 'post',
    data
  })
}



export function getCollectSet(params) {
  return request({
    url: '/taskManager/GetCollectSet',
    method: 'get',
    params
  })
}

export function collectSet(params, data) {
  return request({
    url: '/taskManager/CollectSet' + '?' + params,
    method: 'post',
    data
  })
}

export function uncollectSet(params, data) {
  return request({
    url: '/taskManager/UncollectSet' + '?' + params,
    method: 'post',
    data
  })
}
