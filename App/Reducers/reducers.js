
import { combineReducers } from 'redux'
import {USER_LOGIN, GPS_DATA, GOTO_SCREEN} from './action'

function todos(state = [], action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
          id: action.id,
          token: action.token,
          pass:action.pass,
          fullname:action.fullname,
          avatar:action.avatar,
          email:action.email
      }
    case GPS_DATA:
      return {
        ...state,
          latitude: action.latitude,
          longitude: action.longitude
      }
    case GOTO_SCREEN:
      return {
        ...state,
          screen: action.screen,
          id_post: action.id_post
      }
    default:
      return state
  }
}

const reducers = combineReducers({
  todos,
  id: (state = {}) => state,
  token: (state = {}) => state,
  pass: (state = {}) => state,
  fullname: (state = {}) => state,
  avatar: (state = {}) => state,
  email: (state = {}) => state,
  screen: (state = {}) => state,
  id_post: (state = {}) => state
})

export default reducers