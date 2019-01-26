var express = require('express');
var router = express.Router();
const upload = require("../helpers/upload")
const itemController = require("../controllers/items")
var { isLogin, isAdmin } = require("../middleware/validations")

/* GET users listing. */
router.get('/', itemController.get_item)
router.get('/:id', itemController.detail_item)
router.get('/category/:id', itemController.get_by_category)
router.post('/', isLogin, isAdmin,upload.multer.single('img'),
upload.sendUploadToGCS, itemController.add_item)
router.put('/:id', isLogin, isAdmin, upload.multer.single('img'),
upload.sendUploadToGCS, itemController.updates_item)
router.delete('/:id',isLogin, isAdmin, itemController.delete_item)

module.exports = router;
