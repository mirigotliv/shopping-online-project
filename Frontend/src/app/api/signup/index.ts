import { call } from "../_call"

export const signUp = (
    id: number,
    email: string,
    password: string,
    passwordConfirm: string,
    city: string,
    street: string,
    name: string,
    lastName: string
) =>
    // @ts-ignore
    call('register', {
        id: id,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        city: city,
        street: street,
        name: name,
        lastName: lastName
    }, 'POST')