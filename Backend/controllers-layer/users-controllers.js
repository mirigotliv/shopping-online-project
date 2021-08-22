const router = require('express').Router(),
const passport = require('passport'),
const usersLogic = require('../business-logic-layer/users-logics');


router.put("/", async (reqest, response, next) => {
    try {
        const updatedUser = await usersLogic.updateUser(reqest.body);
        if (reqest.body.admin) {
            reqest.body = { username: updatedUser.username, password: reqest.body.user.password };
            await passport.authenticate('login', (err, user, info) => {
                if (err) return response.status(501).json(err);
                if (info) return response.json(info);
                else {
                    reqest.logIn(user.user, async (err) => {
                        // console.log(err)
                        if (err) return response.status(501).json(err);
                        reqest.session.loggedIn = true;
                        await reqest.session.save(err => { if (err) return console.log(err); });
                        return response.status(200).json(user);
                    })
                }
            })(reqest, response, next)
        }
        else {
            return response.status(200).json(updatedUser);
        }
    }
    catch (err) {
        return response.status(500).send(err.message)
    };
});
module.exports = router;