const mongoose = require('mongoose');
const{Schema} = mongoose;
//equals to 
//const Schema = mongoose.Schema

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default:5}
});

mongoose.model('users', userSchema);