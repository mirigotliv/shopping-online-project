global.config = require(process.env.NODE_ENV === 'production' ? './config-prod.json' : './config-dev.json')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express()
// controllers:
const productsController = require('./controllers-layer/products-controllers')
const usersControllers = require('./controllers-layer/users-controllers')
const ordersControllers = require('./controllers-layer/orders-controllers')
const citiesControllers = require('./controllers-layer/cities-controllers')

// Setting Server Up
server.use(cors({
    origin: ['http://localhost:4200'],
    'methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'preflightContinue': false,
    'optionsSuccessStatus': 204,
    credentials: true
}));

server.use(express.json())
server.use(require('express').static(__dirname))
server.use(bodyParser.urlencoded({ extended: true }))

server.listen(3001, () => {
    console.log('Listening...')
    server.use('/api', productsController)
    server.get('/cities', citiesControllers)
    server.post('/register', usersControllers)
    server.post('/orders', ordersControllers)
    server.post('/getCart', productsController)
    server.post('/getProducts', productsController)
    server.put('/deleteProductCart', productsController)
    server.post('/login', usersControllers)
    server.post('/addProductCart', productsController)
    server.use(bodyParser.json())
})