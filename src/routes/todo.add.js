const express = require("express")
const jwt = require("jsonwebtoken")

const ToDoModel = require("../models/todo.model")
const UserModel = require("../models/user.model")

const todoAddRoute = express.Router()

todoAddRoute.post("/", (req, res) => {
    jwt.verify(req.headers['authorization'], req.body.email, (err, decode) => {
        const todoElement = new ToDoModel()
        todoElement.message = req.body.message
        todoElement.status = req.body.status
        todoElement.completeBy = req.body.completeBy
        todoElement.save()

        if(err == null) {
            UserModel.findOne({
                email: req.body.email
            }).then(user => {
                if(user) {
                    user.todoList.push(todoElement)
                    user.save()
                    
                    res.json({
                        status: "Updated",
                        message: "Data us added"
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

module.exports = todoAddRoute
