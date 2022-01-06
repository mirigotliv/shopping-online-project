const express = require("express");
const router = express.Router();
const citiesLogic = require('../business-logic-layer/cities-logic');

// get all cities: http://localhost:3001/api/cities
router.get('/cities', async (request, response) => {
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

// router.get("/cities", async (request, response) => {
//     try {
//         console.log('cities')
//         const cities = await citiesLogic.getAllCitiesAsync();
//         response.json(cities);
//     }
//     catch (err) {
//         console.log(err)
//         response.status(500).send(err.message);
//     }
// });

module.exports = router