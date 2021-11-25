import { call } from "../_call"

export const login = (email: string, password: string) =>
    call(
        'login',
        {
            email: email,
            password: password
        },
        'POST'
    )