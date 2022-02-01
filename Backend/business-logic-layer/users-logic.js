const UserModel = require('../models/user-model')
const dal = require('../data-access-layer/dal')
const USER_NOT_FOUND = 401
const WRONG_PASSWORD = 402
const SUCCESS = 200
const USER_EXISTS = 403

// get all users by their email from DB:
async function getUserIdAsync(email) {
    let userId = -1
    await UserModel.findOne({ email }, (error, user) => {
        if (user) {
            userId = user.id
        }
    })
    return userId
}

const login = async (email, password) => {
    let status = 500
    await UserModel.findOne({ email }, (error, user) => {
        if (!user) {
            // if email not exist, the status will be 401:
            status = USER_NOT_FOUND
            return
        }
        else if (password !== user.password) {
            status = WRONG_PASSWORD
        }
        else {
            status = SUCCESS
        }
    })
    return status
}

const register = async (request, response) => {
    const id = request.body.id || -1
    const email = request.body.email
    const password = request.body.password
    const passwordConfirm = request.body.passwordConfirm
    const city = request.body.city
    const street = request.body.street
    const lastName = request.body.lastName
    const firstName = request.body.firstName

    await UserModel.findOne({ $or: [{ id }, { email }] }, (error, user) => {
        if (user) {
            response.sendStatus(USER_EXISTS)
        }
        else {
            // userModel to new user in the site:
            const user = new UserModel()
            user.id = id
            user.email = email
            user.password = password
            user.passwordConfirm = passwordConfirm
            user.cart = []
            user.city = city
            user.street = street
            user.lastName = lastName
            user.username = email
            user.firstName = firstName

            user.save((err, result) => {
                if (err) {
                    console.log('err', err)
                    console.log('There is an error in adding user in database')
                    response.send({ success: 'Failed to add user', status: 500 })
                }
                response.send({ success: 'Successfully added new user', status: 200 })
            })
        }
    })
}

module.exports = {
    getUserIdAsync,
    login,
    register,
}