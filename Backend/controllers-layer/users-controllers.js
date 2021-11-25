const router = require('express').Router()
const usersLogic = require('../business-logic-layer/users-logic')

//Login:
router.post("/login", async (request, response) => {
    console.log('ccc')
    console.log('req', request.body)
    try {
        const email = request.body.email
        const password = request.body.password

        const status = await usersLogic.login(email, password);
        console.log('status', status)
        response.status(status).send('ssss')
    }
    catch (err) {
        console.log(err)
        response.status(500).send(err.message);
    }
});

router.post("/register", (request, response) => {

    usersLogic.register(request, response)
    // usersLogic.register(identity, email, password, passwordConfirm, city, lastName, firstName, street)

    // async (request, response) => {
    //     try {
    //         // const identify = request.body.id
    //         // const email = request.body.email
    //         // const password = request.body.password
    //         // const passwordConfirm = request.body.passwordConfirm
    //         // const city = request.body.city
    //         // const street = request.body.id
    //         // const firstName = request.body.firstName
    //         // const lastName = request.body.lastName
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
})

module.exports = router