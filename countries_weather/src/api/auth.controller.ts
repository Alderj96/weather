import type { AxiosError } from 'axios'
import dbApi from './dbApi'
import { saveLocalToken, saveSessionUser, saveSessionToken, removeSessionUser, removeSessionToken, removeLocalToken } from '../helpers/loggin';

export const setToken = (token: string) => {
  dbApi.defaults.headers.common['Authorization']  = `Bearer ${token}`
}

export const removeToken = () => {
  dbApi.defaults.headers.common['Authorization']  = ''
}

export const signUp = async (username: string, mail: string, password: string, fullname: string) => {
  try {
    const { data } = await dbApi.post('/user', {
      fullname,
      mail,
      password,
      username
    })

    setToken(data.token)
    saveSessionToken(data.token)
    saveSessionUser(JSON.stringify(data.user))
    return { status: true, data }
  } catch (error: any | AxiosError) {
    return { status: false, code: error?.response?.status, data: error?.response?.data }
  }
}

export const signIn = async (username: string, password:string, remindme: boolean) => {
  try {
    const { data } = await dbApi.post('/auth', {
      password,
      username
    })
    if (remindme) saveLocalToken(data.token)
    setToken(data.token)
    saveSessionToken(data.token)
    saveSessionUser(JSON.stringify(data.user))
    return { status: true }
  } catch (error: any | AxiosError) {
    return { status: false, code: error?.response?.status, data: error?.response?.data }
  }
}

export const signInByToken = async () => {
  try {
    const token = localStorage.getItem('tkn')
    if (!token) throw Error('No token')
    setToken(token)

    const { data } = await dbApi.get('/auth')

    saveSessionToken(data.token)
    saveSessionUser(JSON.stringify(data.user))
    return { status: true }
  } catch (error: any | AxiosError) {
    logout()
    return { status: false, code: error?.response?.status, data: error?.response?.data }
  }
}

export const verifyToken =  async () => {
  try {
    const token = sessionStorage.getItem('tkn')
    if (!token) throw Error('No token')

    setToken(token)
    const { data } = await dbApi.get('/auth')

    saveSessionUser(JSON.stringify(data.user))
    return { status: true }
  } catch (error: any | AxiosError) {
    logout()
    return { status: false, code: error?.response?.status, data: error?.response?.data }
  }
}

export const logout = () => {
  removeToken()
  removeLocalToken()
  removeSessionToken()
  removeSessionUser()
}