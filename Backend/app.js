const server = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    authControllers = require('./controllers-layer/auth-controllers'),
    productControllers = require('./controllers-layer/products-controllers'),
    cartControllers = require('./controllers-layer/carts-controllers'),
    usersControllers = require('./controllers-layer/users-controllers'),
    ordersControllers = require('./controllers-layer/orders-controllers');

// Setting Server Up
server.use(require('express').json());
server.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}));

// Setting DB Up
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err, mongoClient) => {
    if (err) return console.log(err);
    console.log(`Connected to ${mongoClient.name}`);
});

// Server Online
server.use('/api/auth', authControllers);
server.use('/api/stock', productControllers);
server.use('/api/carts', cartControllers);
server.use('/api/users', usersControllers);
server.use('/api/orders', ordersControllers);

server.listen(keys.env.PORT, () => console.log(`Connected to port ${keys.env.PORT}`));