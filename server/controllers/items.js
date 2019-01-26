
const Items = require("../models/items")

module.exports = {
    get_item: (req, res) => {
        Items.find()
            .populate('category')
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(400).json(err)
                
            });
    },

    add_item: (req, res) => {
        let new_item = {
            title: req.body.title,
            price: Number(req.body.price),
            first_stock: Number(req.body.stock),
            stock: Number(req.body.stock),
            description: req.body.description,
            category: req.body.category,
            img: req.file.cloudStoragePublicUrl,
        }
        console.log(new_item);
        
        Items.create(new_item)
            .then((result) => {
                res.status(201).json({
                    result:result, message: 'successfully added to your database'
                })
            }).catch((err) => {
                res.status(400).json({
                    err:err, message: 'internal server error'
                })
            });
    },
    updates_item: (req, res) => {

        let update_item = {
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            category: req.body.category,
            img: req.file.cloudStoragePublicUrl
        }
        Items.updateOne({ _id: req.params.id }, update_item)
            .then((result) => {
                res.status(200).json({
                    result:result, message: 'successfully updated to your database'
                })
            }).catch((err) => {
                res.status(400).json({
                    err:err, message: 'internal server error'
                })
            });
    },

    delete_item: (req, res) => {
        Items.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.status(200).json({
                    message: 'successfully deleted from your database'
                })

            }).catch((err) => {
                res.status(400).json({
                    err:err, message: 'internal server error'
                })
            });
    },
    detail_item: (req, res) => {
        Items.findOne({ _id: req.params.id })
            .then((result) => {
                res.status(200).json(result)

            }).catch((err) => {
                res.status(400).json(err)
            });
    },
    get_by_category: (req, res) => {
        Items.find({ category: req.params.id })
            .then((result) => {
                res.status(200).json(result)

            }).catch((err) => {
                res.status(400).json(err)
            });

    }
}
