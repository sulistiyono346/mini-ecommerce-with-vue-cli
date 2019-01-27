const mongoose = require("mongoose")
const Schema = mongoose.Schema


const cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    item_id: {
        type: Schema.Types.ObjectId, ref: "Item"
    },
    total_item: {
        type: Number
    }
})

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart