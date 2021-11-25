const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "missing city"],
    },
}, { versionKey: false });

const CategoryModel = mongoose.model("CategoryModel", CategorySchema, "categories");

module.exports = CategoryModel;
