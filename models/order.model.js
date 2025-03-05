const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    }
}, { timestamps: true });

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;