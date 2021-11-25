import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    REGISTRATION_FAILURE,
    REGISTRATION_SUCCESS
} from '../../constants/actions'


const initialState = {
    userExists: false,
    isUserRegistered: false,
    error: '',
    isUserLoggedIn: false,
    token: '',
    isAdmin: false,
}

export default (state: any = initialState, action: any) => {
    switch (action.type) {
        case REGISTRATION_FAILURE: return {
            ...state,
            userExists: true
        }
        case REGISTRATION_SUCCESS: return {
            ...state,
            isUserRegistered: true
        }
        case LOGIN_ERROR: return {
            ...state,
            error: action.payload.error
        }
        case LOGIN_SUCCESS: return {
            ...state,
            isUserLoggedIn: true,
            token: action.payload.userData.token,
            isAdmin: action.payload.userData.isAdmin
        }
        default: return state
    }


}