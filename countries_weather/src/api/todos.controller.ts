import dbApi from './dbApi'


export const getAllTodos = async () => {
  try {
    const { data } = await dbApi.get('/todo')
    return { status: true, data }
  } catch (error: any) {
    return { status: false }
  }
}

export const createTodo = async (description: string) => {
  try {
    const { data } = await dbApi.post('/todo', {
      description
    })
    return { status: true, data }
  } catch (error: any) {
    return { status: false }
  }
}

export const finishTodo = async (idTodo: string) => {
  try {
    const { data } = await dbApi.put('/todo', {
      _id: idTodo
    })
    return { status: true, data }
  } catch (error: any) {
    return { status: false }
  }
}