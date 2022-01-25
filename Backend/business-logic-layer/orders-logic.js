const UserModel = require('../models/user-model')

// add order: 
async function addOrderAsync({
    cityName,
    street,
    shippingDate,
    creditCard
}) {
    return { cityName, street, shippingDate, creditCard }.save();
}

module.exports = {
    addOrderAsync
}