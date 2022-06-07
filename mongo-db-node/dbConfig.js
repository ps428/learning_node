const { hash } = require('bcrypt');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const users =  new Schema({
    Name:{
        type:String,
        required: [true,'Name is required']
    },
    Address:{
        type:JSON,
        required: [true,'Addresss is required']
    },
    ContactDetails:{
        type:JSON,
        required: [true,'Contact details are required']
    },
    Picture:{
        type:String,
        required: [true, 'Picture is required']
    },
    UserType:{
        type:String,
        default:"CS"
    },
    Password:{
        type:String,
        required: [true, 'Password is required']
    }
})

const User = mongoose.model('newUsers',users)