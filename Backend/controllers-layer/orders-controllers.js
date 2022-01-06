router = require('express').Router()
const orderLogic = require('../business-logic-layer/orders-logic')

// add order:
router.post('/orders', async (request, response) => {
    try {
        response.status(201).json(await orderLogic.addOrderAsync(request.body))
    }
    catch (error) {
        response.status(500).send(error.message)
    }
})

module.exports = router