global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json")
const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express()
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fs = require('fs')
const url = require("url")
const path = require('path')
const http = require("http")

// controllers:
const cartControllers = require('./controllers-layer/carts-controllers')
const productsController = require('./controllers-layer/products-controllers')
const usersControllers = require('./controllers-layer/users-controllers')
const ordersControllers = require('././controllers-layer/orders-controllers')
const citiesControllers = require('./controllers-layer/cities-controllers')

// Setting Server Up
server.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}));
server.use(express.json())
server.use(require('express').static(__dirname))

//display images:
// server.use('getProducts', () => {
//     getProductsFromDB = async () => {
//         const products = await productsLogic.getAllProductsAsync();
//         response.json(products)
//     }
// })

// server.use('/getImages', express.static('images'));
// server.use(express.static(__dirname + '/images'));

server.use('/api/carts', cartControllers)
server.use('/api/orders', ordersControllers)
server.use('/api/cities', citiesControllers)
// server.use('/api/products/images', productsController);

server.use(bodyParser.json()) // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }))

// server.use('/trying', () => {
//     console.log('function trying')
// })

// server.post('/register', (request, response) => {
//     console.log(request.body)
//     const id = request.body.id
//     const email = request.body.email
//     const password = request.body.password
//     const city = request.body.city || 'petach tikva'
//     const street = request.body.street || 'yona'
//     const lastName = request.body.lastName || 'ufnik'
//     const firstName = request.body.firstName || 'moishe'

//     const user = new User()
//     user.id = id
//     user.email = email
//     user.password = password
//     user.city = city
//     user.street = street
//     user.lastName = lastName
//     // user.username = email
//     user.firstName = firstName

//     user.save((err, result) => {
//         if (err) {
//             console.log('err', err)
//             console.log("There is an error in adding user in database")
//             response.send({ success: "Failed to add user", status: 500 })
//         }
//         response.send({ success: "Successfully added new user", status: 200 })
//     })
// })

server.listen(3001, () => {
    console.log('aaa')
    console.log("Listening...")
    server.use("/api", productsController)
    server.get("/carts", cartControllers)
    server.post("/register", usersControllers)
    server.use(express.json()) // for parsing application/json
    server.post("/login", usersControllers)
    server.use(bodyParser.json())
})


