const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const UserModel = require("../models/user.model")

const App = express.Router()
App.use(cors())

App.get("/", (req, res) => {
    var check = jwt.verify(req.headers['authorization'], req.body.email, (output) => {
        console.log(output)
    })


    res.json({
        "message": "Ok"
    })
})

module.exports = App