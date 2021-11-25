const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");

// Get all categories: 
function getAllCategoriesAsync() {
    return CategoryModel.find().exec();
}

// Get all products: 
function getAllProductsAsync() {
    return ProductModel.find().exec();
}

// Get products per category: 
function getProductsByCategoryAsync(categoryId) {
    return ProductModel.find({ categoryId }).populate("category").exec(); //category=virtuals field in "product-model.js"
}

// Add product: 
function addProductAsync(product) {
    return product.save();
}

// חיפוש מוצר
function getSearchResults(val) {
    return new Promise(async (resolve) => {
        const products = await getAllProducts()
        const foundProducts = await products.filter(p => {
            if (p.name.indexOf(val) >= 0) return p
        })
        resolve(foundProducts)
    })
}

module.exports = {
    getAllCategoriesAsync,
    getAllProductsAsync,
    getProductsByCategoryAsync,
    addProductAsync,
    getSearchResults,
}