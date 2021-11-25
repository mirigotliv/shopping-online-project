import { ajax } from 'rxjs/ajax'
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const call = (path: string, params?: any, method?: Method) => {
    return ajax({
        url: `http://localhost:3001/${path}`,
        body: params || null,
        method: method || (params ? 'POST' : 'GET'),
        headers: {
            Accept: 'application/json'
        },
        responseType: 'json',
        crossDomain: true
    })
}
