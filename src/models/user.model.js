// 
// User model that contains user email password and there to do tasks
// 
var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: String,
    password: String,
    todolist: Array
})

module.exports = mongoose.model("Users", UserSchema)
