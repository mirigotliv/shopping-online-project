const express = require("express");
const router = express.Router();
const cartsLogic = require('../business-logic-layer/carts-logic')
const CartModel = require("../models/cart-model");

// get all carts: http://localhost:3001/api/carts
router.get('/carts', async (request, response) => {
    try {
        const carts = await cartsLogic.getOneCartAsync();
        response.json(carts);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// add cart: http://localhost:3001/api/carts
router.post('/carts', async (request, response) => {
    try {
        const cart = new CartModel(request.body);
        const addedCart = await cartsLogic.addCartAsync(cart);
        response.status(201).json(addedCart);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router