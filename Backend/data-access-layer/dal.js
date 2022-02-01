const mongoose = require("mongoose")

// connect to db:
function connectAsync() {
    return new Promise((resolve, reject) => {
        const options = { useNewUrlParser: true, useUnifiedTopology: true }

        mongoose.connect(config.database.connectionString, options, (error, db) => {
            if (error) {
                reject(error)
                return
            }
            resolve(db)
        })
    })
}
connectAsync().then(() => console.log("We're connected to MongoDB."))
    .catch(error => console.log(error))

module.exports = {
    connectAsync
};