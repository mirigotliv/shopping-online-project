const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    email: String,
    password: String,
    
}, { versionKey: false })

const Admin = mongoose.model('Admin', adminSchema, 'admins')

module.exports = Admin