export const saveLocalToken = (token: string) => localStorage.setItem('tkn', token)
export const removeLocalToken = () => localStorage.removeItem('tkn')

export const saveSessionToken = (token: string) => sessionStorage.setItem('tkn', token)
export const removeSessionToken = () => sessionStorage.removeItem('tkn')

export const saveSessionUser = (user: string) => sessionStorage.setItem('sssn', user)
export const getSessionUser = () => sessionStorage.getItem('sssn')
export const removeSessionUser = () => sessionStorage.removeItem('sssn')