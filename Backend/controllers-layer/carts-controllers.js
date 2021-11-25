const cartsLogic = require('../business-logic-layer/carts-logic')
const express = require("express");
const router = express.Router();
const CartModel = require("../models/cart-model");


// Get all carts: http://localhost:3001/api/carts
router.get("/carts", async (request, response) => {
    try {
        const carts = await cartsLogic.getOneCartAsync();
        response.json(carts);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// Add cart: http://localhost:3001/api/carts
router.post("/carts", async (request, response) => {
    try {
        const cart = new CartModel(request.body);
        const addedCart = await cartsLogic.addCartAsync(cart);
        response.status(201).json(addedCart);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// Update cart: http://localhost:3001/api/carts/:_id
router.put("/carts/:_id", async (request, response) => {
    try {
        // Model: 
        const _id = request.params._id;
        request.body._id = _id;
        const cart = new CartModel(request.body);
        // Validation: 
        const errors = cart.validateSync();
        if (errors) {
            response.status(400).send(errors);
            return;
        }
        // Logic: 
        const updatedCart = await cartsLogic.updateCartAsync(cart)
        if (!updatedCart) {
            response.status(404).send(`id ${_id} not found`);
            return;
        }
        // Success: 
        response.json(updatedCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

// DELETE delete cart: http://localhost:3001/api/products
router.delete("/carts/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await logic.deleteCartAsync(_id);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router