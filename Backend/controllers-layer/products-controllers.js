const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const categoriesLogic = require('../business-logic-layer/products-logic');
const productsLogic = require('../business-logic-layer/products-logic');
const citiesLogic = require('../business-logic-layer/cities-logic')
const jwt = require('jsonwebtoken');
const SECRET_KEY = '$!Aefksn34'
const isTokenValid = tokenExp => new Date() - tokenExp

// get all categories: http://localhost:3001/api/categories
router.get("/categories", async (request, response) => {
    try {
        const categories = await categoriesLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        console.log(err)
        response.status(500).send(err.message);
    }
});

// get all cities: http://localhost:3001/api/cities
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

// get all products: http://localhost:3001/api/products
router.get("/getProducts", async (request, response) => {
    console.log('bbb')
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        console.log(err)
        response.status(500).send(err.message);
    }
});

// // get all product per category: http://localhost:3001/api/products/by-category/:categoryId
router.get("/products/by-category/:categoryId", async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const products = await productsLogic.getProductsByCategoryAsync(categoryId);
        response.json(products);
    }
    catch (err) {
        console.log(err)
        response.status(500).send(err.message);
    }
});

// add product to cart
router.post("/addProductCart", async (request, response) => {
    const token = request.body.token
    console.log('request.body.token', request.body.token)
    console.log('request.body.productId', request.body.productId)
    jwt.verify(token, SECRET_KEY, async function (err, decodedToken) {
        console.log(decodedToken) // bar
        if (isTokenValid(decodedToken.exp)) {
            const email = decodedToken.email
            const productId = request.body.productId;
            console.log('email', email)
            await productsLogic.addProductToCartAsync(productId, email);
            console.log('done')
            const cart = await productsLogic.getUserCartAsync(email)
            console.log('cart', cart)
            response.status(201).json(cart?.[0]);
        }
        console.log('isValid:', new Date() - decodedToken.exp)
    });
    // try {

    //     const userId = request.params.userId;
    //     const products = await productsLogic.addProductsByUserIdAsync(userId);
    //     response.json(products);
    // }
    // catch (err) {
    //     console.log(err)
    //     response.status(500).send(err.message);
    // }
});


router.get("/images/:name", (request, response) => {
    try {
        const name = request.params.name;
        let absolutePath = path.join(__dirname, "..", "images", "products", name)
        if (!fs.existSync(absolutePath)) {
            absolutePath = path.join(__dirname, "..", "images", "images not found.jpg");
        }
        response.sendFile(absolutePath);
    }
    catch (err) {
        console.log(err)
        response.status(500).send(err.message);
    }
});

module.exports = router;