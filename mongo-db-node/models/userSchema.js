const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
  Name: {
    type: String,
    required: [true, 'Name is required'],
  },
  Address: {

    Add1: {type: String},
    Add2: {type: String},
    Add3: {type: String},
    Area: {type: String},
    City: {type: String},
    State: {type: String},
    Country: {type: String},
    Pincode: {type: Number},

    required: [true, 'Addresss is required'],
  },
  ContactDetails: {
    Mobile: {type: Number},
    Email: {type: String},
    required: [true, 'Contact details are required'],
  },
  Picture: {
    type: String,
    required: [true, 'Picture is required'],
  },
  UserType: {
    type: String,
    default: 'CS',
  },
  Password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

const User = mongoose.model('newUsers', users);
export {User};
