const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
    cityName: {
        type: String,
        required: [true, "Missing city name"],
        minlength: [2, "Name must be minimum 2 chars"],
        maxlength: [100, "Name can't exceed 100 chars"]
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        min: [0, "street can't be negative"],
        max: [1000, "street can't exceed 1000"]
    },
    shippingDate: {
        type: Date,
        required: [true, "Missing date of shipping"],
    },
    creditCard: {
        type: Number,
        required: [true, "Missing creditCard"],
        min: [1000, "credit card must be min 4"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

OrdersSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

const OrderModel = mongoose.model("OrderModel", OrdersSchema, "orders");

module.exports = OrderModel;