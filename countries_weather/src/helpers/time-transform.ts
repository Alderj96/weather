import moment from "moment-timezone"

export const getTimeByOffset = (timeZone: string) => {
  if (!timeZone) return
  return moment().tz(timeZone).format('hh:mm:ss a')
}

export const stringDate = (fecha: string) => {
  return moment(fecha).format('L')
}

export const stringDateTime = (fecha: string) => {
  return moment(fecha).format('L LTS')
}