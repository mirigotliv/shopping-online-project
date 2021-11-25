// @ts-nocheck
import { ON_LOGIN } from '../../../constants/actions'
import { api } from '../../../api'
import { catchError, switchMap } from 'rxjs/operators'
import { loginError, loginSuccess } from './../../actions'
import { of } from 'rxjs'
import { ofType } from 'redux-observable'

export const login = (actions$: any) => {
    const loginEpic$ = actions$.pipe(
        ofType(ON_LOGIN),
        switchMap(({ payload: { email, password } }) =>
            api.login(email, password)
                .pipe(
                    switchMap(({ response }) => {
                        return of(loginSuccess(response))
                    }),
                    catchError(err =>
                        err && err.response
                            ? of(loginError(err.response.error))
                            : of(loginError('an Error occurred')))
                )
        )
    )
    return loginEpic$
}