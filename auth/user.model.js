const {
    Schema, model
} = require('mongoose');

const userSchema = new Schema({
    googleId: String,
    username: String,
    email: String
});

export const User = model('user', userSchema);
