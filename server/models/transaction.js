const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require('./users')
const Item = require('./items')
const Cart = require ('./cart')

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    item: {
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
    },
    status: {
        type: Boolean
    }
    
},{ timestamps: true })
transactionSchema.pre("save", function () {
Item
    .findOne({_id:this.item})
    .then((result) => {
        let newStock=result.stock-this.total_item
         return Item.findOneAndUpdate({_id:this.item}, {$set:{stock:newStock}})
        next()
    }).
    catch((err)=>{
        console.log(err);
    })
})



const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction