const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Define the User model based on the schema
const User = mongoose.model("User", UserSchema);

// Export the model to use it elsewhere in the project
module.exports = User;