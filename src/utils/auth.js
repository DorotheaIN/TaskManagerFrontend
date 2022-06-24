import Cookies from 'js-cookie'

const TokenKey = 'token'
const Mail = 'mail'

export function getMail() {
  return Cookies.get(Mail)
}

export function setMail(mail) {
  return Cookies.set(Mail, mail)
}

export function removeMail() {
  return Cookies.remove(Mail)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
