const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    fullName: String,
    profileImaagePath: String,
    bio: String,
});

module.exports = mongoose.model('User', userSchema);