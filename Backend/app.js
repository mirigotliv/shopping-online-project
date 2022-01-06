global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json")
const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express()
// controllers:
const cartControllers = require('./controllers-layer/carts-controllers')
const productsController = require('./controllers-layer/products-controllers')
const usersControllers = require('./controllers-layer/users-controllers')
const ordersControllers = require('./controllers-layer/orders-controllers')
const citiesControllers = require('./controllers-layer/cities-controllers')

// Setting Server Up
server.use(cors({
    origin: ['http://localhost:4200'],
    "methods": "GET,PUT,POST",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    credentials: true
}));
server.use(express.json())
server.use(require('express').static(__dirname))

server.use('/api/carts', cartControllers)
// server.use('/api/orders', ordersControllers)
// server.use('/cities', citiesControllers)

server.use(bodyParser.json()) // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true }))

server.listen(3001, () => {
    console.log('aaa')
    console.log("Listening...")
    server.use("/api", productsController)
    server.get("/carts", cartControllers)
    server.get("/cities", citiesControllers)

    server.post("/register", usersControllers)
    server.post("/orders", ordersControllers)
    server.use(express.json()) // for parsing application/json
    server.post("/login", usersControllers)
    server.post("/addProductCart", productsController)
    server.use(bodyParser.json())
})


