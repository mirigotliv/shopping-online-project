const express = require('express');
const router = express.Router();
const ordersLogic = require('../business-logic-layer/orders-logic');
const OrderModel = require('../models/order-model')
const jwt = require('jsonwebtoken');
const SECRET_KEY = '$!Aefksn34'
const isTokenValid = tokenExp => new Date() - tokenExp

router.post("/orderCart", async (request, response) => {
    const token = request.body.token
    jwt.verify(token, SECRET_KEY, async function (err, decodedToken) {
        if (isTokenValid(decodedToken.exp)) {
            const cartId = request.body.productId;
            const city = request.body.city;
            const street = request.body.street;
            const shippingDate = request.body.shippingDate;
            const creditCard = request.body.creditCard;
            const email = decodedToken.email;
            const cart = await ordersLogic.addOrderAsync({
                email,
                city,
                street,
                shippingDate,
                creditCard,
                cartId
            }) || {}
            response.status(200).json(cart)
        }
    });
});

module.exports = router