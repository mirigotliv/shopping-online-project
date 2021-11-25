const mongoose = require("mongoose")

function connectAsync() {
    return new Promise((resolve, reject) => {
        // Connect options - prevent console warnings:
        const options = { useNewUrlParser: true, useUnifiedTopology: true }
        // Connect to MongoDB:
        mongoose.connect(config.database.connectionString, options, (error, db) => {
            if (error) {
                reject(error)
                return
            }
            resolve(db)
        })
    })
}
connectAsync().then(db => console.log("We're connected to MongoDB."))
    .catch(error => console.log(error))

    module.exports = {
        connectAsync
    };
