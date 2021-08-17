const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: Date.now
    },
    linkedin:{
        type: String
    },
    github:{
        type: String,
    },
    twitter:{
        type: String,
    },
    facebook:{
        type: String,
    }
});

UserSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  };
  UserSchema.methods.isValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
  };
const User = mongoose.model('User', UserSchema);
module.exports = User;