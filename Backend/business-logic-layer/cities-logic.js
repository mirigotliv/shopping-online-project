const CityModel = require('../models/city-model')

// get all cities: 
function getAllCitiesAsync() {
    return CityModel.find().exec();
}

module.exports = {
    getAllCitiesAsync
}