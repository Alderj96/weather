const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const regexFullName = /^([\w]{3,})+\s+([\w\s]{3,})+\s+([\w\s]{3,})+$/i
const regexPassword = /^[0-9a-zA-Z]{8,}$/

export const required = (value?: string) => {
  if (!value) return 'El campo es requerido'
  return
}

export const validEmail = (value: string) => {
  if (!regexEmail.test(value)) return 'No es un email valido'
  return
}

export const sameValue = (value1: string, value2: string) => {
  if (value1 !== value2) return 'No coinciden los campos'
  return
}

export const validFullName = (value: string) => {
  if (!regexFullName.test(value)) return 'No es un nombre real'
  return
}

export const validPassword = (value: string) => {
  if (!regexPassword.test(value)) return 'La contraseña debe tener al menos 8 caracteres'
  return
}