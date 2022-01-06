const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    // _id: {
    //     type: String,
    // },
    cart: {
        type: Array
    },
    id: {
        type: Number,
        required: [true, "Missing id"],
        minlength: [9, "id must be minimum 9 chars"],
        maxlength: [100, "id can't exceed 100 chars"]
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
}, { versionKey: false })

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel