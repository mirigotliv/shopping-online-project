const Order = require('../models/order-model');

//הוספת הזמנה
function addOrder(order) {
    return new Promise((resolve, rej) => {
        new Order(order).save((err, info) => {
            if (err) {
                return reject(err)
            };
            resolve(info);
        });
    });
}

module.exports = {
    addOrder
}