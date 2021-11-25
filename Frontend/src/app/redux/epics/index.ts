import { combineEpics } from 'redux-observable'
import { login } from './login'
import { signUp } from './signup'

export default combineEpics(signUp, login)
