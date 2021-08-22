const Cart = require('../models/cart-model');

//קבלת עגלה אחת
function getOneCart(_id) {
    return new Promise((resolve, reject) => {
        Cart.findOne({ customer: _id }).populate('cartProducts.product').exec((err, cart) => {
            if (err) {
                return reject(err)
            }
            resolve(cart);
        });
    });
}


//הוספת עגלה
function addCart(cart) {
    return new Promise((resolve, reject) => {
        Cart.findOne({ customer: cart.customer }).populate({
            path: 'cartProducts.product', populate: {
                path: 'product'
            }
        }).exec((err, foundCart) => {
            if (err) {
                return reject(err)
            }
            if (foundCart) {
                foundCart.active ? resolve({ cart: foundCart, msg: "active" }) : resolve({ cart: foundCart, msg: "latest" });
            }
            else {
                cart.active = true;
                new Cart(cart).save((err, info) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve({ cart: info, msg: "new" });
                });
            }
        })
    });
}

//עדכון עגלה
function updateCart(cart) {
    return new Promise((resolve, reject) => {
        Cart.updateOne({ _id: cart._id }, { ...cart }, (err, info) => {
            if (err) {
                return reject(err)
            }
            resolve(info);
        });
    });
}

//סגירת עגלה
function closeCart(_id) {
    return new Promise((resolve, reject) => {
        Cart.updateOne({ _id: _id }, { active: false }, err => err ? reject(err) : resolve());
    });
}


//מחיקת עגלה
function deleteCart(_id) {
    return new Promise((resolve, reject) => {
        Cart.deleteOne({ _id }, (err, info) => {
            if (err) {
                return reject(err)
            }
            resolve(info);
        });
    });
}

module.exports = {
    getOneCart,
    addCart,
    updateCart,
    closeCart,
    deleteCart
};