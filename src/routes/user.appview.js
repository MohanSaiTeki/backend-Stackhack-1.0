const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const UserModel = require("../models/user.model")

const App = express.Router()
App.use(cors())

App.get("/", (req, res) => {
    jwt.verify(req.headers['authorization'], req.body.email, (err, decode) => {

        if (err == null){
            UserModel.findOne({
                email: decode.email
                }).populate('todoList')
                .then( result => {
                    res.json({
                        todoList: result.todoList
                    })
                })
        } else {
            res.json({
                status: "TokenExpiredError",
                message: "JSON Token Expired"
            })
        }
    })

})

module.exports = App
