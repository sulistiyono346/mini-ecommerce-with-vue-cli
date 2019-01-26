const User = require("../models/users")
const { dcrypt } = require("../helpers/encrypt")
const { create_token } = require("../helpers/token")


module.exports = {
    register: (req, res) => {
        User.create({
            name: req.body.name,
            email: req.body.email,
            img: "https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png",
            register_by: "own_app",
            password: req.body.password
        })
            .then((result) => {
                res.status(201).json({
                    message: "You have been successfully registered, please login first"
                })
            }).catch((err) => {
                res.status(400).json(err)
            });
    },
    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((result) => {
                if (result) {
                    let dcryptPass = dcrypt(req.body.password, result.password)
                    if (dcryptPass) {
                        let data = {
                            _id: result._id,
                            email: result.email,
                            cart: result.cart,
                            transaction: result.transactions,
                            role: result.role
                        }
                        let access_token = create_token(data)
                        res.status(200).json({
                            access_token: access_token, message: "You have been successfully login !"
                        })

                    }
                    else {
                        res.status(400).json({
                            message: "wrong password/email please try again"
                        })
                    }

                }
                else {
                    res.status(400).json({
                        message: "wrong password/email please try again"
                    })
                }

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },


    isLogin: (req, res) => {
        res.status(200).json({
            user: req.decoded
        })
    }

}