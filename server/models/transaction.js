const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Item = require('./items')

const transactionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    item_id: {
        type: Schema.Types.ObjectId, ref: "Item"
    },
    total_item: {
        type: Number
    },
    province_id: {
        type: String
    },
    city_id: {
        type: String
    },
    courier: {
        type: String
    },
    cost: {
        type: Number
    },
    etd:{
        type: String
    },
    name: {
        type: String
    },
    address: {
        type :String
    }
},{ timestamps: true })



const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction