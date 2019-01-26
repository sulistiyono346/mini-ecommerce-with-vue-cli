const Category = require("../models/categories")

module.exports = {
    create_category: (req, res) => {  
        Category.create({ name: req.body.name })
            .then((result) => {
                res.status(200).json({
                    result:result, message: 'successfully added to your database'
                })
            }).catch((err) => {
                res.status(400).json(err)
            });
    },
    get_category: (req, res) => {
        Category.find()
            .then((result) => {
                res.status(200).json( result )
            }).catch((err) => {
                res.status(400).json({
                    err:err, message: 'internal server error'
                })
            });
    },
    updated_category: (req, res) => {
        let updateData = {
            name: req.body.name
        }

        Category.updateOne({ _id: req.params.id }, updateData)
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
    delete_category: (req, res) => {
        Category.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.status(200).json({
                    message: 'successfully deleted from your database'
                })
            }).catch((err) => {
                res.status(400).json({
                    err:err, message: 'internal server error'
                })
        });
    }

}