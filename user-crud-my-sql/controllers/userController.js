/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
// const express = require('express')
const app = express();
// to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// bcrypt to encrypt password
import bcrypt from 'bcryptjs';
// const bcrypt = require("bcrypt");

// importing jwt
import jwt from 'jsonwebtoken';

// env config
import dotenv from 'dotenv';
// const dotenv = require('dotenv');
dotenv.config();
const dbName = process.env.DBNAME;

const saltValue = process.env.saltValue;

/// importing the db functions from dbFunctions directory
import * as userDBFunctions from '../dbFunctions/user_crud_functions.js'


// ---------CREATE USER: DONE

const createPassword = async () => {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const createUser = async (req, res) => {
  const userid = req.body.userid;

  const duplicateCheck = await userDBFunctions.getUserDataByParameter(`userid="${userid}" OR mobile="${mobile}" OR email="${email}"`);
  if (duplicateCheck['success'] == true) {
    return res.status(409).json({ success: false, error: 'User already exists with these details: userid, mobile and email must be unique' });
  }

  // tokenize the password with bcrypt or JWT something, TODO
  // now we set user password to hashed password
  const salt = await bcrypt.genSalt(Number(saltValue));

  // Auto generation of passsword
  // eslint-disable-next-line quotes
  if (req.body.password == "") {
    req.body.password = await createPassword();
  };

  req.body.password = bcrypt.hashSync(req.body.password, salt);

  // how to get username?
  // eslint-disable-next-line require-jsdoc
  try {
    const result = await userDBFunctions.addNewUser(req.body);

    // retreving the sent data back from DB
    const user = await userDBFunctions.getUserDataByParameter('userid', req.body.userid)

    res.json({ success: true, result: result, data: user });
  } catch (e) {
    res.json({ success: false, error: e });

    console.log(`Error: ${e}`);
  }
};

// ---------GET PROFILE: DONE: Basic Login work ///THIS IS ALSO USED FOR CHANGE PASSWORD FUNCTIONALITY
// DON'T REMOVE FETCH PROFILES FUNCTION
const fetchProfileData = async (Username, Password) => {
  try {
    const client = new MongoClient(url);
    let profile = { success: 0, data: 'Wrong credentials' };
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const userData = await collection.findOne({ Username: Username });

    // if (!bcrypt.compareSync(Password, userData['Password'])) {
    //   console.log('The Current Password is Wrong');
    // } else {
    //   console.log('Correct password');
    // }
    await bcrypt.compare(Password, userData['Password']).then((result) => {
      if (!result) {
        profile = { success: 0, data: 'Wrong credentials!!' };

        console.log('Password doesn\'t match!');
      } else {
        profile = { success: 1, data: userData };
        console.log('Password matches!');
        // console.log(profile);
        // return profile
      }
    });

    console.log(profile);
    return profile;
  } catch (e) {
    console.log(`Error: ${e}`);
    profile = { success: 0, data: e.message };
    return profile;
  }
};
const logIn = async (req, res) => {
  const Username = req.body.Username;
  const Password = req.body.Password;

  // console.log(`Getting profile of user: ${req.params.username}`);
  const result = await fetchProfileData(Username, Password);
  console.log(result);
  if ((await result.success == 1)) {
    res.json(result);
  } else {
    res.status(409).json(result);
  }
};

// ---------UPDATE USER: TODO
const updateUser = async (req, res) => {
  const userid = req.params.id;

  const duplicateCheck = await userDBFunctions.getUserDataByParameter(`userid="${userid}"`);
  if (duplicateCheck['success'] == false) {
    return res.status(409).json({ success: false, error: 'User does not exists' });
  }

  try {
    const user = await userDBFunctions.getUserDataByParameter(`userid="${req.body.userid}"`)
    const oldValues = user.values[0];
    // console.log(oldValues);

    if (req.body.name)
      oldValues.name = req.body.name;

    if (req.body.mobile) {
      const mobileCheck = await userDBFunctions.getUserDataByParameter(`mobile="${req.body.mobile}" AND userid!=${userid}`)
      if (mobileCheck['success'] == true)
          return res.status(409).json({ success: false, error: 'Mobile number is already taken' });

      oldValues.mobile = req.body.mobile
    }

    if (req.body.email) {
      const emailCheck = await userDBFunctions.getUserDataByParameter(`email="${req.body.email}" AND userid!=${userid}`)
      if (emailCheck['success'] == true)
         return res.status(409).json({ success: false, error: 'Email is already taken' });

      oldValues.email = req.body.email
    }

    if (req.body.picture) {
      oldValues.picture = req.body.picture
    }

    if (req.body.user_type_id) {
      oldValues.user_type_id = req.body.user_type_id
    }

    const js_time = new Date();
    oldValues.updated_at = js_time.toISOString().split('T')[0] + ' ' + js_time.toTimeString().split(' ')[0];;

    const result = await userDBFunctions.updateData(oldValues);
    console.log(result)
    return res.json({ success: result.success, msg: result.msg });
  } catch (error) {
    console.warn('ERROR: ' + error);
  }
};


// ---------DELETE USER: DONE
const deleteUser = async (req, res) => {
  const client = new MongoClient(url);
  const Username = req.params.id;
  // console.log(Username)

  // Check if user exists or not before deletion
  if (!(await checkDuplicateUsername(Username))) {
    return res.status(409).json({ success: false, error: 'User not found' });
  }
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const query = { Username: Username };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 1) {
      res.end(`Successfully deleted the user ${Username}.`);
    } else {
      res.end('Unable to delete the user.');
    }
  } catch (error) {
    console.warn('ERROR: ' + error);
  } finally {
    await client.close();
  }
};


// ---------CHANGE PASSWORD:
const changePassword = async (req, res) => {
  const client = new MongoClient(url);

  const Username = req.body.Username;
  const OldPassword = req.body.OldPassword;
  const NewPassword = req.body.NewPassword;

  // Check if user exists or not before updation
  if (! await checkDuplicateUsername(Username)) {
    return res.status(409).json({ successs: false, error: `Error! Username: ${Username} not found` });
  }

  const results = await fetchProfileData(Username, OldPassword);
  if (!results['success']) {
    return res.status(404).json({ success: false, error: `Error! Wrong credentials` });
  }

  // Check if new password is same as old password
  if (NewPassword == OldPassword) {
    return res.status(400).json({ success: false, error: `Old password and new password can not be same` });
  }
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const salt = await bcrypt.genSalt(Number(saltValue));

    const TokenizedPasswrod = await bcrypt.hash(NewPassword, salt);


    const query = { Username: Username };

    const updateDoc = {
      $set: {
        Password: TokenizedPasswrod,
      },
    };

    const result = await collection.updateOne(query, updateDoc);


    // -------------- JWT
    const data = {
      userID: results.data._id,
    }; const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(data, jwtSecretKey);
    res.header('auth-token', token);

    // 1. HOW TO PASS IN THE DATABASE NAME AND COLLECTION NAME IN THE REST API FUNCTIONS ITSELF
    // --------------

    return res.json({ result: result, msg: `Changed password succesfully` });
  } catch (error) {
    console.warn('ERROR: ' + error);
    return res.status(400).json({ success: false, error: 'ERROR!' });
  } finally {
    await client.close();
  }
};

const getUserData = async (req, res) => {
  try {
    const Username = req.params.id;
    const userID = req.user.userID;
    console.log(req.user.userID);

    const client = new MongoClient(url);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const userData = await collection.findOne({ Username: Username });

    console.log(userData);
    res.json({ success: true, data: userData });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
};

export { createUser, logIn, updateUser, deleteUser, changePassword, getUserData };
