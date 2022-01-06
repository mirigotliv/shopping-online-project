const CartModel = require('../models/cart-model')

// Get one cart: 
function getOneCartAsync() {
    return CartModel.find().exec();
}

// add cart: 
function addCartAsync(cart) {
    return cart.save();
}

function updateCartAsync(cart) {
    const info = CartModel.updateOne({ _id: site._id }, cart).exec();
    return info.n ? cart : null; // n = the number of documents updated.
}

// delete cart: 
function deleteCartAsync(_id) {
    return CartModel.deleteOne({ _id }).exec();
}

module.exports = {
    getOneCartAsync,
    addCartAsync,
    deleteCartAsync,
    updateCartAsync
}