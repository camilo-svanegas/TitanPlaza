/*
 * action types
 */

export const USER_LOGIN = 'USER_LOGIN'
export const GPS_DATA = 'GPS_DATA'
export const GOTO_SCREEN = 'GOTO_SCREEN'

/*
 * action creators
 */

export function startSession(id,pass,token,fullname,avatar,email) {
  return { type: USER_LOGIN, id,token,pass,fullname,avatar,email}
}

export function gpsData(latitude, longitude) {
  return { type: GPS_DATA, latitude, longitude}
}

export function gotoScreen(screen,id_post) {
  return { type: GOTO_SCREEN, screen, id_post}
}
