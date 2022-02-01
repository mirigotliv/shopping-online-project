const OrderModel = require('../models/order-model')
const productsLogic = require('../business-logic-layer/products-logic')

// add order: 
async function addOrderAsync({
    city,
    street,
    shippingDate,
    creditCard,
    email
}) {
    const newOrder = new OrderModel()
    newOrder.city = city
    newOrder.street = street
    newOrder.shippingDate = shippingDate
    newOrder.creditCard = creditCard
    newOrder.email = email

    newOrder.order = await productsLogic.getUserCartAsync(email)

    newOrder.save(async err => {
        if (err) {
            console.log('err', err)
            console.log('There is an error in adding order in database')
        }
        else {
            await productsLogic.deleteProductCartAsync({ email, cart: {} })
        }
    })
    return newOrder.order
}

module.exports = {
    addOrderAsync
}