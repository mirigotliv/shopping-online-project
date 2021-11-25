const orderLogic = require('.././business-logic-layer/orders-logic'),
    router = require('express').Router()

// Add order:
router.post('/api/orders', async (request, response) => {
    try {
        response.status(201).json(await orderLogic.addOrderAsync(request.body))
    }
    catch (error) {
        response.status(500).send(error.message)
    }
})

module.exports = router