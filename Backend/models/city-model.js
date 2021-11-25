const mongoose = require("mongoose");

const CitiesSchema = mongoose.Schema({
    cityName: {
        type: String,
        required: [true, "Missing city"],
        minlength: [5, "city must be minimum 5 chars"],
        maxlength: [100, "city can't exceed 100 chars"]
    },
}, { versionKey: false });

const CityModel = mongoose.model("CityModel", CitiesSchema, "cities");

module.exports = CityModel;
