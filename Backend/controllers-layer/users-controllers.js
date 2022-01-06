const router = require('express').Router()
const usersLogic = require('../business-logic-layer/users-logic')
const jwt = require('jsonwebtoken')
const SECRET_KEY = '$!Aefksn34'

//Login:
router.post("/login", async (request, response) => {
    console.log('ccc')
    console.log('req', request.body)
    try {
        const email = request.body.email
        const password = request.body.password
        const status = await usersLogic.login(email, password);
        console.log('xxx')
        if (status !== 200) {
            response.status(status).send('error login')
        } else {
            response.status(200).json({
                token: jwt.sign(
                    { email },
                    SECRET_KEY,
                    { expiresIn: '24h' }
                ),
            })
        }
    }
    catch (err) {
        console.log(err)
        response.status(500).send(err.message);
    }
});

// register:
router.post("/register", (request, response) => {
    usersLogic.register(request, response)
    console.log('request.body', request.body)
})

module.exports = router