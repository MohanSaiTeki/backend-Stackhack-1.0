const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const UserModel = require("../models/user.model")

const Login = express.Router()
Login.use(cors())


Login.post("/", (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password

    UserModel.findOne({
        email: email
    })
    .then((user) => {
        if(user) {
            if(bcrypt.compareSync(password, user.password)) {
                const payload = {
                    email: user.email,
                    username: username
                }

                let token = jwt.sign(payload, email, {
                    expiresIn: 7200
                })
                
                res.json({
                    email: user.email,
                    username: user.username,
                    token: token
                })
            } else {
                res.json({
                    status: "PasswordIncorrect",
                    message: "Password is incorrect"
                })
            }
        } else {
            res.json({
                status: "UserDoesntExist",
                message: "User doesn't exist"
            })
        }
    })
    .catch(err => {
        res.json({
            status: err
        })
    })
})

module.exports = Login