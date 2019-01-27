const Cart = require('../models/cart')
const Transaction = require('../models/transaction')

module.exports = {
    add_cart: (req, res) => { 
        let new_cart = {
            user_id: req.decoded.id,
            item_id: req.body.item_id,
            total_item: req.body.total_item
        }
        Cart.find({user_id:req.decoded.id})
        .then((result) => {
            if(result.length===0) {
            return Cart.create(new_cart)
                }
            else {
            let isTrue=false
             result.forEach(item => {  
                 if(item.item_id == req.body.item_id) isTrue=true
                })
             if(isTrue==true){
               return res.status(200).json({
                    message: 'item already in your cart'
                })
            }
            else{
                return Cart.create(new_cart)
              }
            }
        }).then((result) => {
            res.status(201).json({
            result:result, message: 'successfully added to your cart'
            })
        })
        .catch((err) => {
            console.log(err);
        })
    },
    get_cart: (req, res) => {
        Cart.find({ user_id: req.decoded.id })
            .populate('item_id')
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                console.log(err);
                
                res.status(400).json(err)
            });
    },
    remove_cart: (req, res) => {
        Cart.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.status(201).json({
                    result:result, message: 'successfully deleted from your cart'
                })

            }).catch((err) => {
                res.status(400).json(err)
            });
    },
    up_qty: (req,res) => {
        Cart.findById(req.params.id)
        .populate('item_id')
        .then((result) => { 
        let total_item=result.total_item+1 
            if(total_item <= result.item_id.stock){
                return Cart.findByIdAndUpdate({_id:result._id},{$set:{total_item:total_item}})
            }
            else{
            return res.status(400).json({
                message: 'item out of stock'
            })
            }
        }).then((result)=>{
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(req.decoded);
        });
    },
    down_qty: (req,res) => {
        Cart.findById(req.params.id)
        .then((result) => {
        let total_item=result.total_item-1 
        if(total_item <= result.item_id.stock || total_item >0){
            return Cart.findByIdAndUpdate({_id:result._id},{$set:{total_item:total_item}})
        }
        else{
            return res.status(400).json({
            message: 'there was a one item minimum purchase '
         })
        }
        }).then((result)=>{
            res.status(200).json(result)
        })
        .catch((err) => {
            console.log(req.decoded);
        });
    },
    checkout: (req,res) => {
        Cart.find({user_id: req.decoded.id})
        .then((result) => {
            result.forEach(cart => {    
                let data = {
                    user: req.decoded.id,
                    item: cart.item_id,
                    total_item: cart.total_item,
                    province_id: req.body.provinceid,
                    city_id: req.body.cityid,
                    courier: req.body.courier,
                    cost: req.body.cost.value,
                    etd: req.body.cost.etd,
                    name: req.body.detail_shipping.name,
                    address: req.body.detail_shipping.address,
                    status: false
                }
            Transaction
                .create(data)
                .then((result) => {
                    Cart.deleteOne({item_id:cart.item_id})
                    .then(()=>{
                        res.status(200).json({
                           message: "successfully buy item"
                        })
                    })
                })
            })
        })
       .catch((err) => {
            console.log(err);
        });
    },
    get_transaction_user: (req,res) => {
      Transaction.find({user:req.decoded.id})
      .populate('item')
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
          res.status(400).json(err)
      });
    },
    confirm: (req,res) => {
      Transaction.findByIdAndUpdate({_id:req.params.id},{$set:{status:true}})
      .then((result) => {
        res.status(200).json(result)
      }).catch((err) => {
        res.status(400).json(result)
      })
    },
    get_transaction_true: (req,res) => {
        Transaction.find({status: true})
        .populate('item')
        .then((result) => {
          res.status(200).json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });
      },
      get_transaction_false: (req,res) => {
        Transaction.find({status: false})
        .populate('item')
        .then((result) => {
          res.status(200).json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });
    },
}