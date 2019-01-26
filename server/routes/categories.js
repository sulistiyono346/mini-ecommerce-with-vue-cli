var express = require('express');
var router = express.Router();
const categoryController = require("../controllers/categories")
var { isLogin, isAdmin } = require("../middleware/validations")


/* GET users listing. */
router.get('/', categoryController.get_category)
router.post('/', isLogin, isAdmin, categoryController.create_category)
router.put('/:id', isLogin, isAdmin, categoryController.updated_category)
router.delete('/:id', isLogin, isAdmin, categoryController.delete_category)

module.exports = router;
