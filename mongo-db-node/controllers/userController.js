/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import express from 'express';
// const express = require('express')
const app = express();
// to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// bcrypt to encrypt password
import bcrypt from 'bcryptjs';
// const bcrypt = require("bcrypt");

// importing jwt
import jwt from 'jsonwebtoken';

// env config
import dotenv from 'dotenv';
// const dotenv = require('dotenv');
dotenv.config();
const dbName = process.env.dbName;
const collectionName = process.env.collectionName;
const saltValue = process.env.saltValue;

import {MongoClient} from 'mongodb';
// const { MongoClient } = require('mongodb');
// import validatorAction from '../validators/validation_action.js'
// eslint-disable-next-line max-len
// const { validateRequestAction } = require('../../validators/validation_action');
// const { Model } = require('mongoose');
const url = process.env.dbURL;

// ---------CREATE USER: DONE
const checkDuplicateUsername = async (Username) => {
  const client = new MongoClient(url);
  let duplicate = 0;
  // basic user creation function
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const user = await collection.findOne({Username: Username});
    if (user.Username == Username) {
      duplicate = 1;
    };
    console.log('checked');
  } catch (e) {
    if (e != 'TypeError: Cannot read properties of null (reading \'Username\')') {
      console.log(`Error: ${e}`);
    }
  } finally {
    await client.close();
  }
  return duplicate;
};

const createPassword = async ()=>{
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const createUser = async (req, res) => {
  const client = new MongoClient(url);

  const Username = req.body.Username;

  if (await checkDuplicateUsername(Username) == 1) {
    return res.status(409).json({success: false, error: `Error! duplicate username: ${Username}`});
  }

  // tokenize the password with bcrypt or JWT something, TODO
  // now we set user password to hashed password
  const salt = await bcrypt.genSalt(Number(saltValue));

  // Auto generation of passsword
  // eslint-disable-next-line quotes
  if (req.body.Password=="") {
    req.body.Password = await createPassword();
  };

  req.body.Password = bcrypt.hashSync(req.body.Password, salt);

  // how to get username?
  // eslint-disable-next-line require-jsdoc
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const result = await collection.insertOne(req.body);
    // retreving the sent data back from DB
    const user = await collection.findOne({Username: Username});

    res.json({result: result, data: user});
  } catch (e) {
    console.log(`Error: ${e}`);
  } finally {
    await client.close();
  }
};

// ---------GET PROFILE: DONE: Basic Login work ///THIS IS ALSO USED FOR CHANGE PASSWORD FUNCTIONALITY
// DON'T REMOVE FETCH PROFILES FUNCTION
const fetchProfileData = async (Username, Password) => {
  try {
    const client = new MongoClient(url);
    let profile = {success: 0, data: 'Wrong credentials'};
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const userData = await collection.findOne({Username: Username});

    // if (!bcrypt.compareSync(Password, userData['Password'])) {
    //   console.log('The Current Password is Wrong');
    // } else {
    //   console.log('Correct password');
    // }
    await bcrypt.compare(Password, userData['Password']).then((result) => {
      if (!result) {
        profile = {success: 0, data: 'Wrong credentials!!'};

        console.log('Password doesn\'t match!');
      } else {
        profile = {success: 1, data: userData};
        console.log('Password matches!');
        // console.log(profile);
        // return profile
      }
    });

    console.log(profile);
    return profile;
  } catch (e) {
    console.log(`Error: ${e}`);
    profile = {success: 0, data: e.message};
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
  const client = new MongoClient(url);

  const Username = req.params.id;

  if (await checkDuplicateUsername(Username) == 0) {
    return res.status(409).json({success: false, error: `Error! Username not found: ${Username}`});
  }

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const query = {Username: Username};
    const update = {$set: req.body};
    const results = await collection.updateOne(query, update);

    console.log((results));
    const userUpdated = await collection.findOne({Username: Username});

    return res.json({success: true, newData: userUpdated});
  } catch (error) {
    console.warn('ERROR: ' + error);
  } finally {
    await client.close();
  }
};


// ---------DELETE USER: DONE
const deleteUser = async (req, res) => {
  const client = new MongoClient(url);
  const Username = req.params.id;
  // console.log(Username)

  // Check if user exists or not before deletion
  if (!(await checkDuplicateUsername(Username))) {
    return res.status(409).json({success: false, error: 'User not found'});
  }
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const query = {Username: Username};
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
    return res.status(409).json({successs: false, error: `Error! Username: ${Username} not found`});
  }

  const results = await fetchProfileData(Username, OldPassword);
  if (!results['success']) {
    return res.status(404).json({success: false, error: `Error! Wrong credentials`});
  }

  // Check if new password is same as old password
  if (NewPassword==OldPassword) {
    return res.status(400).json({success: false, error: `Old password and new password can not be same`});
  }
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const salt = await bcrypt.genSalt(Number(saltValue));

    const TokenizedPasswrod = await bcrypt.hash(NewPassword, salt);


    const query = {Username: Username};

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

    return res.json({result: result, msg: `Changed password succesfully`});
  } catch (error) {
    console.warn('ERROR: ' + error);
    return res.status(400).json({success: false, error: 'ERROR!'});
  } finally {
    await client.close();
  }
};

const getUserData = async (req, res)=>{
  try {
    const Username = req.params.id;
    const userID = req.user.userID;
    console.log(req.user.userID);

    const client = new MongoClient(url);
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const userData = await collection.findOne({Username: Username});

    console.log(userData);
    res.json({success: true, data: userData});
  } catch (error) {
    res.status(400).json({success: false, err: error});
  }
};

export {createUser, logIn, updateUser, deleteUser, changePassword, getUserData};
