/* eslint-disable max-len */
import express from 'express';
// const express = require('express')
const app = express();
// to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// bcrypt to encrypt password
import bcrypt from 'bcrypt';
// const bcrypt = require("bcrypt");

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
  } catch (e) {
    if (e != 'TypeError: Cannot read properties of null (reading \'Username\')') {
      console.log(`Error: ${e}`);
    }
  } finally {
    await client.close();
  }
  return duplicate;
};

const createUser = async (req, res) => {
  const client = new MongoClient(url);

  // can use schema here but then unhashed password would be sent, so doing it here like this
  const Name = req.body.Name;
  const Add1 = req.body.Address.Add1;
  const Add2 = req.body.Address.Add2;
  const Add3 = req.body.Address.Add3;
  const Area = req.body.Address.Area;
  const City = req.body.Address.City;
  const State = req.body.Address.State;
  const Country = req.body.Address.Country;
  const Pincode = req.body.Address.Pincode;
  const Mobile = req.body.ContactDetails.Mobile;
  const Email = req.body.ContactDetails.Email;
  const Picture = req.body.Picture;
  let UserType = req.body.UserType;
  const Username = req.body.Username;
  const Password = req.body.Password;


  if (await checkDuplicateUsername(Username) == 1) {
    return res.status(409).json({success: false, error: `Error! duplicate username: ${Username}`});
  }

  // set default user type as cs
  if (UserType == '') {
    UserType = 'CS';
  }

  // tokenize the password with bcrypt or JWT something, TODO
  // now we set user password to hashed password
  const salt = await bcrypt.genSalt(Number(saltValue));

  const TokenizedPasswrod = await bcrypt.hash(Password, salt);

  // how to get username?
  // eslint-disable-next-line require-jsdoc
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const result = await collection.insertOne(({Name: Name, Address: {Add1: Add1, Add2: Add2, Add3: Add3, Area: Area, City: City, State: State, Country: Country, Pincode: Pincode}, ContactDetails: {Mobile: Mobile, Email: Email}, Picture: Picture, UserType: UserType, Username: Username, Password: TokenizedPasswrod}));

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

    // console.log((userData['Password']))

    await bcrypt.compare(Password, userData['Password']).then((result) => {
      // console.log(Password,userData['Password']);
      if (!result) {
        profile = {success: 0, data: 'Wrong credentials!!'};

        console.log('Password doesn\'t match!');
      } else {
        profile = {success: 1, data: userData};
        console.log('Password matches!');
        success = 1;
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
  // Model.findById(id).updateOne(req.body)
  const Name = req.body.Name;
  const Add1 = req.body.Address.Add1;
  const Add2 = req.body.Address.Add2;
  const Add3 = req.body.Address.Add3;
  const Area = req.body.Address.Area;
  const City = req.body.Address.City;
  const State = req.body.Address.State;
  const Country = req.body.Address.Country;
  const Pincode = req.body.Address.Pincode;
  const Mobile = req.body.ContactDetails.Mobile;
  const Email = req.body.ContactDetails.Email;
  const Picture = req.body.Picture;
  const UserType = req.body.UserType;
  const Username = req.params.id;

  if (await checkDuplicateUsername(Username) == 0) {
    return res.status(409).json({success: false, error: `Error! Username not found: ${Username}`});
  }

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const query = {Username: Username};
    const update = {$set: {Name: Name, Address: {Add1: Add1, Add2: Add2, Add3: Add3, Area: Area, City: City, State: State, Country: Country, Pincode: Pincode}, ContactDetails: {Mobile: Mobile, Email: Email}, Picture: Picture, UserType: UserType}};

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

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const salt = await bcrypt.genSalt(Number(saltValue));

    TokenizedPasswrod = await bcrypt.hash(NewPassword, salt);


    const query = {Username: Username};

    const updateDoc = {
      $set: {
        Password: TokenizedPasswrod,
      },
    };

    const result = await collection.updateOne(query, updateDoc);

    return res.json({result: result, msg: `Changed password succesfully`});
  } catch (error) {
    console.warn('ERROR: ' + error);
    return res.status(400).json({success: false, error: 'ERROR!'});
  } finally {
    await client.close();
  }
};


export {createUser, logIn, updateUser, deleteUser, changePassword};
