import dbApi from './dbApi'


export const getAllUsers = async () => {
  try {
    const { data } = await dbApi.get('/user')
    return { status: true, data }
  } catch (error: any) {
    return { status: false }
  }
}