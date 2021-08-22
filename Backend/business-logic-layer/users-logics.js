const Customer = require('../models/customer-model'),
const Admin = require('../models/admin-model');

//עדכון יוזר
function updateUser(user) {
    return new Promise((resolve, reject) => {
        user.admin ? updateAdmin(user.user) : updateCustomer(user.user);
        function updateAdmin(admin) {
            admin = new Admin(admin);
            admin.password = Admin.hashPassword(admin.password);
            Admin.findOneAndUpdate({ username: admin.username }, admin, (err, info) => {
                if (err) {
                    return reject(err)
                };
                resolve(info);
            })
        }

        //עדכון לקוח
        function updateCustomer(customer) {
            Customer.replaceOne({ _id: customer._id }, customer, (err, info) => {
                if (err) {
                    return reject(err)
                };
                resolve(info);
            })
        }
    });
}


module.exports = {
    updateUser
}