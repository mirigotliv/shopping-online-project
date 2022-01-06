const Order = require('../models/order-model')

// add order: 
function addOrderAsync(order) {
    return order.save();
}

module.exports = {
    addOrderAsync
}