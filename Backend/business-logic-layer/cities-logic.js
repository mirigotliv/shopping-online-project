const CityModel = require('../models/city-model')

// Get all cities: 
function getAllCitiesAsync() {
    return CityModel.find().exec();
}

module.exports = {
    getAllCitiesAsync
}