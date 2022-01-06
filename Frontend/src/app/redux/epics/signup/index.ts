import { registrationFailure, registrationSuccess }
    from '../../actions/signup/index'
import { SIGN_UP } from '../../../constants/actions'
import { api } from '../../../api'
import { identity, of } from 'rxjs'
import { ofType } from 'redux-observable'
import { switchMap } from 'rxjs/operators'

const USER_EXIST = 209;

export const signUp = (actions$: any) => {
    const signUpEpic$ = actions$.pipe(
        ofType(SIGN_UP),
        switchMap(({ payload: { id, email, password, passwordConfirm, city, street, name, lastName } }) =>
            api.signUp(id, email, password, passwordConfirm, city, street, name, lastName)

                .pipe(
                    switchMap((response) => {
                        if (response.status === USER_EXIST) {
                            return of(registrationFailure())
                        }
                        return of(
                            registrationSuccess()
                        )
                    }
                    ))
        )
    )
    return signUpEpic$
}