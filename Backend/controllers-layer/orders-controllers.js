const express = require('express');
const router = express.Router();
const ordersLogic = require('../business-logic-layer/orders-logic');

router.post("/orders", async (request, response) => {
    try {
        const order = new OrderModel(request.body);
        const addedOrder = await ordersLogic.addOrderAsync(order);
        response.status(201).json(addedOrder);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router