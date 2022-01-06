const ProductModel = require("../models/product-model");
const CategoryModel = require("../models/category-model");
const UserModel = require('../models/user-model')

// get all categories: 
function getAllCategoriesAsync() {
    return CategoryModel.find().exec();
}

// get all products: 
function getAllProductsAsync() {
    return ProductModel.find().exec();
}

// get products per category: 
function getProductsByCategoryAsync(categoryId) {
    return ProductModel.find({ categoryId }).populate("category").exec(); //category=virtuals field in "product-model.js"
}

// add product to cart by userId: 
async function addProductToCartAsync(productId, email) {
    const a = await UserModel.updateOne(
        {
            email
        },
        {
            $set: {
                cart: {
                    [productId]: 1
                }
            }
        })
}

async function getUserCartAsync(email) {
    let cart = {}
    await UserModel.findOne({ email }, (error, user) => {
        if (user) {
            cart = user.cart
        }
    })
    return cart
}

// Add product: 
// function addProductsByUserIdAsync(_id) {
//     return ProductModel.find({ _id }).populate("user").exec(); //user=virtuals field in "product-model.js"
// }

// חיפוש מוצר
// function getSearchResults(val) {
//     return new Promise(async (resolve) => {
//         const products = await getAllProducts()
//         const foundProducts = await products.filter(p => {
//             if (p.name.indexOf(val) >= 0) return p
//         })
//         resolve(foundProducts)
//     })


module.exports = {
    getAllCategoriesAsync,
    getAllProductsAsync,
    getProductsByCategoryAsync,
    addProductToCartAsync,
    // getSearchResults,
    getUserCartAsync
}