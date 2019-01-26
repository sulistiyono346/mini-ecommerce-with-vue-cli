const User = require("../models/users")
const { verify_token } = require('../helpers/token')

module.exports = {
    isLogin: (req, res, next) => {
      console.log(req.headers.token);
      
        
        verify_token(req.headers.token, function (err, decoded) {
            if (err) {
                res.status(400).json({
                    message: "forbidden access to this resource on the server is denied"
                })
            }
            else {
                User.findOne({ email: decoded.email })
                    .then((result) => {
                        req.decoded = {
                            id: result._id,
                            name: result.name,
                            email: result.email,
                            role: result.role,
                            img: result.img
                        }     
                        console.log(req.decoded);
                                           
                        next()
                    }).catch((err) => {
                        res.status(400).json({
                            message: "forbidden access to this resource on the server is denied"
                        })
                    });
            }
        })
    },
    isAdmin: (req, res, next) => {
        if(req.decoded.role == 'admin'){
            next ()
        }
        else{
            res.status(400).json({
                message : "you don't have permission to access / on this server"
            })
        }
    }
}

