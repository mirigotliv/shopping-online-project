const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    _id: {
        type: Number,
    },
    // לבדוק
    id: {
        type: Number,
        required: [true, "Missing id"],
        minlength: [9, "id must be minimum 9 chars"],
        maxlength: [100, "Name can't exceed 100 chars"]
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        minlength: [11, "email must be minimum 11 chars"],
        maxlength: [100, "email can't exceed 100 chars"]
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [5, "password must be minimum 5 chars"],
        maxlength: [100, "Name can't exceed 100 chars"]
    },
    city: {
        type: String,
        required: [true, "Missing city"],
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minlength: [5, "street must be minimum 5 chars"],
        maxlength: [100, "street can't exceed 100 chars"]
    },
    firstName: {
        type: String,
        required: [true, "Missing first name"],
        minlength: [5, "first name must be minimum 5 chars"],
        maxlength: [100, "Name can't exceed 100 chars"]
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [5, "last name must be minimum 5 chars"],
        maxlength: [100, "Name can't exceed 100 chars"]
    },
    // username: {
    //     type: String,
    //     required: [true, "Missing username"],
    //     minlength: [11, "username must be minimum 11 chars"],
    //     maxlength: [100, "username can't exceed 100 chars"]
    // },



}, { versionKey: false })

// UserSchema.statics.hashPassword = function hashPassword(password) {
//     return bcrypt.hashSync(password, 10)
// }

// UserSchema.methods.isValid = (password, hashedPassword) => {
//     return bcrypt.compareSync(password, hashedPassword)
// }

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel