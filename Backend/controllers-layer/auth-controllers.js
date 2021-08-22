// const Customer = require('../models/customer-model'),
// const Admin = require('../models/admin-model'),
const router = require('express').Router(),
const passport = require('passport')
// { verifyCookie } = require('../middleware/verify-logged-in');

// Registering
router.post('/register', (reqest, response, next) => {
    try {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                return response.status(501).json(err);
            }
            if (!user) {
                return response.status(401).json(info);
            }
            reqest.logIn(user.user, (err) => {
                if (err) {
                    return response.status(501).json(err);
                }
                reqest.session.loggedIn = true;
                reqest.session.save(err => {
                    if (err) {
                        return console.log(err);
                    }
                });
                user.user.password = "";
                return response.status(200).json(user);
            })
        })(reqest, response, next);
    }
    catch (err) {
        return response.status(500).send(err.message)
    };
});


// Logging In
router.post('/login', async (reqest, response, next) => {
    try {
        await passport.authenticate('login', (err, user, info) => {
            if (err) {
                return response.status(501).json(err);
            }
            if (info) {
                return response.status(401).json(info);
            }
            else {
                reqest.logIn(user.user, (err) => {
                    if (err) { return response.status(501).json(err); }
                    reqest.session.loggedIn = true;
                    reqest.session.save(err => {
                        if (err) {
                            return console.log(err);
                        }
                    });
                    user.user.password = "";
                    return response.status(200).json(user);
                })
            }
        })(reqest, response, next);
    }
    catch (err) {
        return response.status(500).send(err.message)
    };
});


// Logging Out
// router.post('/logout/:ent', (reqest, response, next) => {
//     const user = reqest.body;
//     const logOutUser = (user) => {
//         reqest.session.destroy();
//         reqest.logOut();
//         user.password = "";
//         response.status(200).json(user);
//     }
//     (reqest.params.ent === "customer") ?
//         Customer.findOne({ _id: user._id }, (err, info) => { err ? response.status(500).json(err) : logOutUser(info); }) :
//         Admin.findOne({ _id: user._id }, (err, info) => { err ? response.status(500).json(err) : logOutUser(info); });
// });


// // Logging In Using Cookie
// router.get('/cookie', verifyCookie, (reqest, response) => {
//     Customer.findById(reqest.user._id, (err, info) => {
//         reqest.user.password = '';
//         if (info) return response.status(200).json({ user: reqest.user, admin: false });
//         return response.status(200).json({ user: reqest.user, admin: true });
//     });
// });


module.exports = router;