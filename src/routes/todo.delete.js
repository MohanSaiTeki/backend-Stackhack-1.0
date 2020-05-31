const express = require("express")
const jwt = require("jsonwebtoken")

const ToDoModel = require("../models/todo.model")
const UserModel = require("../models/user.model")

const todoDeleteRoute = express.Router()

todoDeleteRoute.post("/", (req, res) => {
    jwt.verify(req.headers['authorization'], req.body.email, (err, decode) => {

        if(err == null) {
            UserModel.findOne({
                email: req.body.email
            }).then( user => {
                if(user) {
                    user.todoList.pull({ _id : req.body.todoElement })
                    user.save()

                    ToDoModel.deleteOne({ _id : req.body.todoElement }).then( err => {
                        res.json({
                            status: "Updated",
                            message: "Data is deleted"
                        })
                    })

                } else {
                    res.json({
                        status: "UserDoesntExist",
                        message: "User doesn't exist"
                    })
                }
            })
        } else {
            res.json({
                status: "TokenExpiredError",
                message: "JSON Token Expired"
            })
        }
    })
})

module.exports = todoDeleteRoute
