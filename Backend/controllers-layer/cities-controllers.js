const express = require("express");
const router = express.Router();
const citiesLogic = require('../business-logic-layer/cities-logic');

// GET all cities: http://localhost:3001/api/cities
router.get("/api/cities", async (request, response) => {
    try {
        console.log('cities')
        const cities = await citiesLogic.getAllCitiesAsync();
        response.json(cities);
    }
    catch (err) {
        console.log(err)
        response.status(500).send(err.message);
    }
});

module.exports = router