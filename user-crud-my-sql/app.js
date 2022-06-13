import express from 'express';
// const express = require('express')
const app = express();

// env config
import dotenv from 'dotenv';
// const dotenv = require('dotenv');
dotenv.config();

// setup db
import {connection} from './dbConfig.js'

// Importing user router to deal with users
import {userRouter} from './routes/userRoutes.js';
// const userRouter = require('./routes/user')

// to read json and access user's response's body
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', userRouter);

app.listen(process.env.port || 3000, () => {
  console.log(`Server listening on port ${process.env.port || 3000}...`);
});
