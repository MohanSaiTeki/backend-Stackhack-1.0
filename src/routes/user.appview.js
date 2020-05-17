const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const UserModel = require("../models/user.model")

const App = express.Router()
App.use(cors())

App.get("/", (req, res) => {
    
})