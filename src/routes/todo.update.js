const express = require("express")
const jwt = require("jsonwebtoken")

const ToDoModel = require("../models/todo.model")
const UserModel = require("../models/user.model")

const todoUpdateRoute = express.Router()

todoUpdateRoute.post("/", (req, res) => {
    jwt.verify(req.headers['authorization'], req.body.email, (err, decode) => {

        if(err == null) {
            UserModel.findOne({
                email: req.body.email
            }).then(user => {
                if(user) {
                    ToDoModel.updateOne(
                        {_id: req.body.todoElement},
                        { $set : {
                                'message': req.body.message,
                                'status': req.body.status,
                                'completeBy': req.body.completeBy
                            }
                        }
                    ).then(
                        res.json({
                            status: "updated",
                            message: "Task updated"
                        })
                    )
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

module.exports = todoUpdateRoute
