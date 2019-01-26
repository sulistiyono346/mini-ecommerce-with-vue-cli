var express = require('express');
var router = express.Router();
const transactionController = require("../controllers/transaction")
var { isLogin } = require("../middleware/validations")

router.post('/cart', isLogin, transactionController.add_cart)
router.get('/cart', isLogin, transactionController.get_cart)
router.delete('/cart/:id', isLogin, transactionController.remove_cart)
router.put('/up_qty/:id', isLogin, transactionController.up_qty)
router.put('/down_qty/:id', isLogin, transactionController.down_qty)
router.post('/checkout', isLogin, transactionController.checkout)

module.exports = router

