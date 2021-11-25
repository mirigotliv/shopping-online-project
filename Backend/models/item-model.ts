const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    itemId: String,
    quantity: Number,
    totalPrice: Number
    // totalPrice: = price * quantity
}, { versionKey: false });

ItemSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

ItemSchema.virtual("product", {
    ref: "productModel",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

const ItemModel = mongoose.model("ItemModel", ItemSchema, "items");

module.exports = ItemModel;