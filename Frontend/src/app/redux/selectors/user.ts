// @ts-nocheck
import { createSelector } from 'reselect'
import { prop } from 'ramda'

const getUser = prop('user')

export const getUserExists = createSelector(
    // @ts-ignore
    getUser,
    prop('userExists')
)

export const getIsUserRegistered = createSelector(
    getUser,
    prop('isUserRegistered')
)

export const getError = createSelector(
    getUser,
    prop('error')
)

export const getIsUserLoggedIn = createSelector(
    getUser,
    prop('isUserLoggedIn')
)

export const getToken = createSelector(
    getUser,
    prop('token')
)

export const getIsAdmin = createSelector(
    getUser,
    prop('isAdmin')
)


