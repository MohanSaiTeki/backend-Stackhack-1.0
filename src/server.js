const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

const Register = require("./routes/user.register")
const Login = require("./routes/user.login")
const AppView = require("./routes/user.appview")
const TodoAdd = require("./routes/todo.add")
const TodoDelete = require("./routes/todo.delete")
const TodoUpdate = require("./routes/todo.update")

var corsOptions = {
    origin: "http://localhost:8081"
}


// connect to database
mongoose.connect("mongodb://localhost:27017/devuserdb", {useNewUrlParser: true} ).catch( err => console.log(err))

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use("/register", Register)
app.use("/login", Login)
app.use("/", AppView)
app.use("/api/todo/add", TodoAdd)
app.use("/api/todo/delete", TodoDelete)
app.use("/api/todo/update", TodoUpdate)

const PORT = 8080

app.listen(PORT, () => {
    console.log("Server running at", PORT)
})
