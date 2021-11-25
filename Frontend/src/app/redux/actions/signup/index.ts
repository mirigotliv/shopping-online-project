import {
    REGISTRATION_FAILURE, REGISTRATION_SUCCESS, SIGN_UP
} from "../../../constants/actions"


export const signUp = (id: number, email: string, password: string, passwordConfirm: string,
    city: string, street: string, name: string, lastName: string ) =>
({
    type: SIGN_UP,
    payload: { id, email, password, passwordConfirm, city, street, name, lastName }
})

export const registrationFailure = () => ({
    type: REGISTRATION_FAILURE,
    payload: {}
})

export const registrationSuccess = () =>
// @ts-ignore
({
    type: REGISTRATION_SUCCESS
})


