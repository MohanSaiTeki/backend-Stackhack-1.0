//
// List model that contains user email password and there to do tasks
//
let mongoose = require("mongoose");

let TodoSchema = mongoose.Schema({
    message: String,
    status: String,
    completeBy: Date
})

module.exports = mongoose.model("ToDoList", TodoSchema)
