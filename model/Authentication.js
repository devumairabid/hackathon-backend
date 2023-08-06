const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'useName is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (value) {

                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be at least 6 characters long']
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    token: String,

});

const User = mongoose.model('SignUp', userSchema);
module.exports = User;
