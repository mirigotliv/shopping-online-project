const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
    order: {
        type: Object
    },
    city: {
        type: String,
        required: [true, "Missing city name"],
        minLength: [5, "city must be minimum 5 chars"],
        maxLength: [50, "city can't exceed 50 chars"]
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minLength: [5, "street must be minimum 5 chars "],
        maxLength: [50, "street can't exceed 1000"]
    },
    shippingDate: {
        type: Date,
        required: [true, "Missing date of shipping"],
    },
    creditCard: {
        type: Number,
        required: [true, "Missing creditCard"],
        minLength: [4, "credit card must be minimum 4 chars"],
        maxLength: [20, "credit card can't exceed 20 chars"]
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