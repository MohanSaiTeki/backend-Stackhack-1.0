// 
// User model that contains user email password and there to do tasks
// 
let mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: String,
    password: String,
    todoList: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'ToDoList'
    }]
})

module.exports = mongoose.model("Users", UserSchema)
