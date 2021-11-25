import { LOGIN_ERROR, LOGIN_SUCCESS, ON_LOGIN, GET_PRODUCTS }
    from '../../../constants/actions'

export const onLogin = (email: string, password: string) =>
({
    type: ON_LOGIN,
    payload: { email, password }
})


export const getProducts = (productName: string, price: number, fileImage: string, categoryId: boolean) =>
({
    type: GET_PRODUCTS,
    payload: { productName, price, fileImage, categoryId}
})

export const loginError = (error: string) =>
({
    type: LOGIN_ERROR,
    payload: { error }
})

type UserData = {
    token: string,
    isAdmin: boolean
}

export const loginSuccess = (userData: UserData) =>
({
    type: LOGIN_SUCCESS,
    payload: { userData }
})
