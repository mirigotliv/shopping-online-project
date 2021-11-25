const Order = require('../models/order-model')


// Add order: 
function addOrderAsync(order) {
    return order.save();
}

module.exports = {
    addOrderAsync
}