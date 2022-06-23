/* eslint-disable no-undef */
import express from 'express';
// const express = require('express')
const app = express();


// env config
import dotenv from 'dotenv';
// const dotenv = require('dotenv');
dotenv.config();

// setup db
// eslint-disable-next-line no-unused-vars
// import {connection} from './dbConfig.js'

// Importing user router to deal with users
import {userRouter} from './routes/userRoutes.js';
// const userRouter = require('./routes/user')

// to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res)=>{
  return res.send("User CRUD and Password Change")
});
app.use('/api/users', userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.port || 3000}...`);
});
