const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helpers/encrypt')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name can't be blank"]
    },
    email: {
        type: String,
        required: [true, "email can't be blank"],
        validate: [{
            isAsync: true,
            validator: function (value, cb) {
                User.findOne({
                    email: value
                }, function (err, res) {
                    cb(!res)
                })
            },
            message: 'email already exist'
        }]
    },
    img: {
        type: String,
    },
    register_by: {
        type: String,
    },
    wallet: {
        type: Number,
        default: 1000000
    },
    point: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: [true, "password can't be blank"],
        minlength: [5, "minimum length of password 5 caracter"]
    },
    role: {
        type: String,
        default: "customer"
    }
})

userSchema.pre("save", function () {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model("User", userSchema);
module.exports = User