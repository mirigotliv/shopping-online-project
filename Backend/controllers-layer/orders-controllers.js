const orderLogic = require('../business-logic-layer/orders-logic');
const router = require('express').Router();

//הוספת הזמנה
router.post('/', async (reqest, response) => {
    try {
        response.status(201).json(await orderLogic.addOrder(reqest.body));
    }
    catch (err) { 
        return response.status(500).send(err.message) }
});


module.exports = router;