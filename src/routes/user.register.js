const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")

const UserModel = require("../models/user.model")

const registerRoute = express.Router()
registerRoute.use(cors())

// Register the user with email, password and empty todolist 
registerRoute.post('/', (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password

    UserModel.findOne({
        email: email
    })
    .then((user) => {
        if(!user) {
            bcrypt.hash(password, 10, (err, hash) => {
                UserModel.create({
                    email: email,
                    username: username,
                    password: hash,
                    todolist: []
                })
                .then(user => {
                    res.json({
                        status: user.email + "created successfully"
                    })
                })
                .catch(err => {
                    res.json({
                        status: err
                    })
                })
            })
        } else {
            res.json({
                status: "User already exists"
            })
        }
    })
    .catch( err => {
        res.json({
            status: err
        })
    })
})


module.exports = registerRoute
