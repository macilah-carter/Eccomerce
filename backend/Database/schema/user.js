const mongoose = require('mongoose');
const { isEmail } = require('validator')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isEmail,
            message: 'invalid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;