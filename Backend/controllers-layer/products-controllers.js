const categoriesLogic = require('../business-logic-layer/products-logic');
const productsLogic = require('../business-logic-layer/products-logic');
const fs = require("fs");
const express = require("express");
const path = require("path");
const router = express.Router();
const citiesLogic = require('../business-logic-layer/cities-logic')

// GET all categories: http://localhost:3001/api/categories
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

// GET all cities: http://localhost:3001/api/cities
router.get("/cities", async (request, response) => {
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

// GET all products: http://localhost:3001/api/products
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


// // GET all product per category: http://localhost:3001/api/products/by-category/:categoryId
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



// POST add product: http://localhost:3001/api/products
// router.post("/products", async (request, response) => {
//     try {
//         const product = new ProductModel(request.body);
//         const addedProduct = await logic.addProductAsync(product);
//         response.status(201).json(addedProduct);
//     } catch (err) {
//         console.log(err)
//         response.status(500).send(err.message);
//     }
// });


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

// -------------------------------------------------

// const cart = require('../models/cart-model');
// const user = require('../models/user-model');
// const userMiddleware = require("./middlewares/user")

// let init = (app) => {

//     // Get all carts by user ID
//     app.get("/api/carts/:userID", userMiddleware.middleware, (req, res) => {

//         cart.CartModel.find({"userID":req.params.userID})
//         .then(carts => {
//             res.status(200).send(JSON.stringify({"carts":carts}));
//         })
//         .catch((e) => { res.status(400).send(e) });

//     });

//     // Get user active carts by user ID
//     app.get("/api/activecarts/:userID", userMiddleware.middleware, (req, res) => {

//         cart.CartModel.find({"userID":req.params.userID, "active":true})
//         .then(carts => {
//             res.status(200).send(JSON.stringify({"carts":carts}));
//         })
//         .catch((e) => { res.status(400).send(e) });

//     });

//     // Create new cart
//     app.post("/api/carts", userMiddleware.middleware, (req, res) => {

//             cart.CartModel.count({userID: req.body.userID, active:true})
//                 .then(count => {

//                     if(count > 0 ){

//                         res.status(400).send("Failed to create new cart, user already have active cart!");

//                     }else{

//                         let newCart = new cart.CartModel(req.body);
//                         newCart.save()
//                             .then(() => {

//                                 res.status(200).send(newCart)
//                             })
//                             .catch((e) => {

//                                 res.status(400).send(e)
//                             });

//                     }

//                 })
//                 .catch(err => {

//                     res.status(400).send(err)
//                 });



//     })

//     // Update cart by ID

//     app.put("/api/carts/:cartID", userMiddleware.middleware, (req, res) =>{

//         cart.CartModel.findOne({_id: req.params.cartID})
//         .then(cart => {

//             cart.date = req.body.price;
//             cart.active = req.body.active;

//             cart.save();
//             res.status(200).send(cart);
//         })
//         .catch(err => res.status(400).send(err));

//     });

//     // Delete cart by ID

//     app.delete("/api/carts/:cartID", userMiddleware.middleware, (req, res) =>{

//         cart.CartModel.deleteOne({_id: req.params.cartID})
//         .then(() => {

//             res.status(200).send("Deleted!");
//         })
//         .catch(err => res.status(400).send(err));

//     });

// }

// module.exports = { init }


// // router.get('/products/:_id', async (request, response) => {
// //     try {
// //         const _id = request.params._id
// //         const product = await productLogic.getOneProduct(_id)
// //         return response.status(200).json(product)
// //     }
// //     catch (error) {
// //         response.status(500).send(error.message)
// //     }
// // })

// // router.get('/products/search/:val', async (request, response) => {
// //     try {
// //         const val = request.params.val
// //         const products = await productLogic.getSearchResults(val)
// //         return response.status(200).json(products)
// //     }
// //     catch (error) {
// //         response.status(500).send(error.message)
// //     }
// // })

// //add product:
// // router.post('/products', async (request, response) => {
// //     try {
// //         const newProduct = request.body
// //         const addedProduct = await productLogic.addProduct(newProduct)
// //         return response.status(200).json(addedProduct)
// //     }
// //     catch (error) {
// //         response.status(500).send(error.message)
// //     }
// // })

// //update product:
// // router.put('/products/:_id', async (request, response) => {
// //     try {
// //         const product = request.body
// //         const updatedProduct = await productLogic.updateProduct(product)
// //         return response.status(200).json(updatedProduct)
// //     }
// //     catch (error) {
// //         response.status(500).send(error.message)
// //     }
// // })

// //delete product:
// router.delete('/products/:_id', async (request, response) => {
//     try {
//         const _id = request.params._id
//         await productLogic.deleteProduct(_id)
//         return response.status(200)
//     }
//     catch (error) {
//         response.status(500).send(error.message)
//     }
// })

module.exports = router;