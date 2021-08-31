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
    address: {
        type: String,
        required: true,
    },
    mobilenumber: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    collegename: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    fromyear: {
        type: Object,       
        required: true,
    },
    toyear: {
        type: Object,
        required: true,
    },
    collegecity: {
        type: String,
        required: true,
    },
    collegestate: {
        type: String,
        required: true,
    },
    cgpa: {
        type: Number,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    codechef: {
        type: String,
        required: true,
    },
    leetcode: {
        type: String,
        required: true,
    },
    hackerrank: {
        type: String,
        required: true,
    },
    exp_companyname: {
        type: String,
        required: true,
    },
    exp_position: {
        type: String,
        required: true,
    },
    exp_fromyear: {
        type: Object,       
        required: true,
    },
    exp_toyear: {
        type: Object,
        required: true,
    },
    exp_location: {
        type: String,
        required: true,
    },
    exp_description: {
        type: String,
        required: true,
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