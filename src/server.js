const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongooes = require("mongoose")

const app = express()

const Register = require("./routes/user.register")
const Login = require("./routes/user.login")
const AppView = require("./routes/user.appview")

var corsOptions = {
    origin: "http://localhost:8081"
}

// connect to database
mongooes.connect("mongodb://localhost:27017/devuserdb", {useNewUrlParser: true}, (data) => {
    console.log(data)
}).catch( err => console.log(err))

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use("/register", Register)
app.use("/login", Login)
app.use("/", AppView)

const PORT = 8080

app.listen(PORT, () => {
    console.log("Server running at", PORT)
})