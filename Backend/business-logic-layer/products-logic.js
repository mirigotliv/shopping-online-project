const ProductModel = require('../models/product-model');
const CategoryModel = require('../models/category-model');
const UserModel = require('../models/user-model')

const MAX_PRODUCTS_SEARCH = 20

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
    return ProductModel.find({ categoryId }).populate('category').exec(); //category=virtual field in "product-model.js"
}

// add product to cart by userId: 
async function addProductToCartAsync({
    email,
    price,
    productId,
    productName,
    quantity = 1,
    oldCart = {}
}) {
    // add new product to old cart of user by $set:
    await UserModel.updateOne(
        {
            email
        },
        {
            $set: {
                cart: {
                    ...oldCart,
                    [productId]: {
                        productName,
                        price,
                        quantity
                    }
                }
            }
        })
}

// get cart by email of user:
async function getUserCartAsync(email) {
    let cart = {}
    await UserModel.findOne({ email }, (error, user) => {
        if (user) {
            cart = user.cart
        }
    })
    return cart
}

// delete product from cart (by 'update' the data in user cart): 
async function deleteProductCartAsync({ email, cart }) {
    await UserModel.updateOne(
        {
            email
        },
        {
            $set: {
                cart
            }
        })
}

async function searchProducts(value) {
    return await ProductModel.find(
        { "productName": { $regex: new RegExp('^' + value) } }
    ).limit(MAX_PRODUCTS_SEARCH)
}

module.exports = {
    getAllCategoriesAsync,
    getAllProductsAsync,
    getProductsByCategoryAsync,
    addProductToCartAsync,
    getUserCartAsync,
    deleteProductCartAsync,
    searchProducts
}