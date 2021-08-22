const cartsLogic = require('../business-logic-layer/carts-logic'),
const router = require('express').Router();

//קבלת עגלה אחת
router.get('/:_id', async (reqest, response) => {
    try {
        const cart = await cartsLogic.getOneCart(reqest.params._id);
        return response.status(200).json(cart);
    }
    catch (err) { response.status(500).send(err.message) }
});


//הוספת עגלה אחת
router.post('/', async (reqest, response) => {
    try {
        const addedCart = await cartsLogic.addCart(reqest.body);
        return response.status(200).json(addedCart);
    }
    catch (err) { res.status(500).send(err.message) }
});


//עדכון עגלה
router.put('/', async (reqest, response) => {
    try {
        const updatedCart = await cartsLogic.updateCart(reqest.body);
        return response.status(200).json(updatedCart);
    }
    catch (err) { response.status(500).send(err.message) }
});


//סגירת עגלה
router.get('/close/:_id', async (reqest, response) => {
    try {
        await cartsLogic.closeCart(reqest.params._id);
        return response.status(200).send("");
    }
    catch (err) { response.status(500).send(err.message) }
});
router.delete('/:_id', async (reqest, response) => {
    try {
        return response.status(200).json(await cartsLogic.deleteCart(reqest.params._id));
    }
    catch (err) { response.status(500).send(err.message) }
});


module.exports = router;