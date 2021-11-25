const Customer = require('../models/user-model')
const Admin = require('../models/admin-model')
const UserModel = require('../models/user-model')
// const User = require('../models/user-model')
const dal = require('../data-access-layer/dal')
const USER_NOT_FOUND = 401
const WRONG_PASSWORD = 402
const SUCCESS = 200



// Get all users: 
function getAllUsersAsync() {
    console.log('ddd')
    return UserModel.find().exec();
}

// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// const login = async (request, response) => {
//     const findUsername = UserModel.find({ email })
//     const findPassword = UserModel.find({ password }).exec()
//     const usernameResult = await dal.connectAsync(findUsername)

//     if (!usernameResult.length) {
//         response.status(USER_NOT_FOUND).json({ error: 'Username not exists' })
//     }
//     else {
//         const userPassword = await dal.connectAsync(findPassword)

//         if (userPassword[0].password === request.body.password) {
//             // const getUserId = User.findOne({ _id })
//             // const id = await dal.connectAsync(getUserId)

//             response.status(SUCCESS).json({ message: 'success login' })
//         }
//         else {
//             response.status(WRONG_PASSWORD).json({ error: 'wrong password' })
//         }
//     }

//login:
const login = async (email, password) => {
    let status = 500
    await UserModel.findOne({ email }, (error, user) => {
        console.log('user', user)
        if (!user) {
            status = USER_NOT_FOUND
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



// if (findUsername) {

//     console.log(`Found a listing in the collection with the name 'users':`);
//     // console.log(user);
// } else {
//     console.log(`No listings found with the name ''`);
//     // response.sendStatus(USERNAME_EXISTS).json({ error: 'user already exists' })
// }

// if (userPassword) {
//     console.log(`Found a listing in the collection with the name 'users':`);
//     // console.log(user);
// } else {
//     console.log(`No listings found with the name ''`);
// }

//     catch (error) {
//         console.error(error);
//     }
// }

const register = (request, response) => {
    console.log('register')
    console.log(request.body)
    // console.log('request', JSON.parse(request.body))
    // console.log('tostring: ', request.body.user.toString())
    // console.log('tojson ', Object.JSON(request.body.user))
    // console.log('tojson to string ', Object.JSON(request.body.user).toString())

    const id = request.body.id || -1
    const _id = request.body._id
    const email = request.body.email
    const password = request.body.password
    const passwordConfirm = request.body.passwordConfirm
    const city = request.body.city
    const street = request.body.street
    const lastName = request.body.lastName
    const firstName = request.body.firstName

    const user = new UserModel()
    user._id = _id
    user.id = id
    user.email = email
    user.password = password
    user.passwordConfirm = passwordConfirm

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
    getAllUsersAsync
}