const express = require('express');
const router = express.Router();
const citiesLogic = require('../business-logic-layer/cities-logic');

router.get('/cities', async (request, response) => {
    try {
        const cities = await citiesLogic.getAllCitiesAsync();
        response.json(cities);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router