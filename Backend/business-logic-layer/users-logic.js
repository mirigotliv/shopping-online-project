const UserModel = require('../models/user-model')
const dal = require('../data-access-layer/dal')

const USER_NOT_FOUND = 401
const WRONG_PASSWORD = 402
const SUCCESS = 200

// get all users: 
async function getUserIdAsync(email) {
    let userId = -1
    await UserModel.findOne({ email }, (error, user) => {
        if (user) {
            userId = user.id
        }
    })
    return userId
}

//login:
const login = async (email, password) => {
    let status = 500
    console.log('1')
    await UserModel.findOne({ email }, (error, user) => {
        console.log('2')
        if (!user) {
            console.log('3')
            status = USER_NOT_FOUND
            return
        }
        else if (password !== user.password) {
            console.log('4')
            status = WRONG_PASSWORD
        }
        else {
            console.log('5')
            status = SUCCESS
        }
    })
    console.log('status', status)
    return status
}

// register:
const register = (request, response) => {
    console.log('register')
    console.log(request.body)

    const id = request.body.id || -1
    const email = request.body.email
    const password = request.body.password
    const passwordConfirm = request.body.passwordConfirm
    const city = request.body.city
    const street = request.body.street
    const lastName = request.body.lastName
    const firstName = request.body.firstName
    console.log('id', request.body.id)

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
            console.log("There is an error in adding user in database")
            response.send({ success: "Failed to add user", status: 500 })
        }
        response.send({ success: "Successfully added new user", status: 200 })
    })
}

// עידכון יוזר
// function updateUser(user) {
//     return new Promise((resolve, reject) => {
//         user.admin ? updateAdmin(user.user) : updateCustomer(user.user)
//         function updateAdmin(admin) {
//             admin = new Admin(admin)
//             admin.password = Admin.hashPassword(admin.password)
//             Admin.findOneAndUpdate({ username: admin.username }, admin, (error, info) => {
//                 if (error) { return reject(error) }
//                 resolve(info)
//             })
//         }

//עדכון לקוח
//     function updateCustomer(customer) {
//         Customer.replaceOne({ _id: customer._id }, customer, (error, info) => {
//             if (error) { return reject(error) }
//             resolve(info)
//         })
//     }
// })


module.exports = {
    login,
    register,
    // updateUser,
    getUserIdAsync
}