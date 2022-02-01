const express = require('express');
const router = express.Router();
const categoriesLogic = require('../business-logic-layer/products-logic');
const productsLogic = require('../business-logic-layer/products-logic');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '$!Aefksn34'
const isTokenValid = tokenExp => new Date() - tokenExp

// get all categories of products:
router.get('/getCategories', async (request, response) => {
    try {
        const categories = await categoriesLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post('/getProducts', async (request, response) => {
    try {
        const products = await productsLogic.searchProducts((!!request.body.productName && request.body.productName) || 'a');
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get('/products/by-category/:categoryId', async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const products = await productsLogic.getProductsByCategoryAsync(categoryId);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// get cart by email of user:
router.post('/getCart', async (request, response) => {
    const token = request.body.token
    jwt.verify(token, SECRET_KEY, async function (err, decodedToken) {
        if (isTokenValid(decodedToken?.exp)) {
            const cart = await productsLogic.getUserCartAsync(decodedToken.email)
            response.json(cart)
        }
    })
})

router.post('/addProductCart', async (request, response) => {
    const token = request.body.token
    jwt.verify(token, SECRET_KEY, async function (err, decodedToken) {
        if (isTokenValid(decodedToken.exp)) {
            const email = decodedToken.email
            const productId = request.body.productId;
            const productName = request.body.productName;
            const price = request.body.price;
            const oldCart = request.body.oldCart;
            await productsLogic.addProductToCartAsync({
                email,
                oldCart,
                price,
                productId,
                productName
            });
            const cart = await productsLogic.getUserCartAsync(email)
            response.status(201).json(cart);
        }
    });
});

router.put('/deleteProductCart', async (request, response) => {
    const token = request.body.token
    jwt.verify(token, SECRET_KEY, async function (err, decodedToken) {
        if (isTokenValid(decodedToken.exp)) {
            const email = decodedToken.email
            const cart = request.body.cart;
            await productsLogic.deleteProductCartAsync({
                email,
                cart
            })
            response.sendStatus(200)
        }
    })
});

module.exports = router;