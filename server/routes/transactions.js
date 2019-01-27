var express = require('express');
var router = express.Router();
const transactionController = require("../controllers/transaction")
var { isLogin, isAdmin, isCustomer,isOwn} = require("../middleware/validations")



router.get('/done',isLogin,isAdmin, transactionController.get_transaction_true)
router.get('/onprocess',isLogin, isAdmin, transactionController.get_transaction_false)
router.put('/:id',isLogin, isCustomer, transactionController.confirm)
router.get('/',isLogin, isCustomer, transactionController.get_transaction_user)
router.post('/cart', isLogin, isCustomer, transactionController.add_cart)
router.get('/cart', isLogin, isCustomer, transactionController.get_cart)
router.delete('/cart/:id', isLogin, isCustomer, isOwn, transactionController.remove_cart)
router.put('/up_qty/:id', isLogin, isCustomer, isOwn, transactionController.up_qty)
router.put('/down_qty/:id', isLogin, isCustomer, isOwn,transactionController.down_qty)
router.post('/checkout', isLogin, transactionController.checkout)

module.exports = router

