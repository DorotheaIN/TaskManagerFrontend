import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

export function login(params) {
  return request({
    url: '/taskManager/Login',
    method: 'get',
    params
  })
}

export function getUserByMail(params) {
  return request({
    url: '/taskManager/GetUserByMail',
    method: 'get',
    params
  })
}

export function getInfo(params) {
  return request({
    url: '/taskManager/GetUserByMail',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
