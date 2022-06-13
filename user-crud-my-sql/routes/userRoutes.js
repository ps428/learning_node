/* eslint-disable max-len */
import express from 'express';
// const express = require('express')
// eslint-disable-next-line new-cap
const userRouter = express.Router();

// Importing functionalities of the users from userController file
import * as user from '../controllers/userController.js'
// const user = require('../controllers/userController')

// Importing validators
import * as validator from '../validators/validation_schema.js';
// const validator = require('../validators/validation_schema')
import {validatorAction} from '../validators/validation_action.js';
import {auth} from '../middlewares/auth.js';
// const validatorAction = require('../validators/validation_action')

// Setting the requests
userRouter.post('/', validator.createUserValidation, validatorAction, user.createUser);
userRouter.put('/:id', validator.updateUserValidation, validatorAction, user.updateUser);
// userRouter.post('/changepassword', validator.changePasswordValidation, validatorAction, user.changePassword);
// userRouter.delete('/:id', validator.deleteValidation, validatorAction, user.deleteUser);

// // for testing
// userRouter.post('/login', validator.logInValidation, validatorAction, user.logIn);
// userRouter.get('/userData/:id', auth, user.getUserData);

export {userRouter};
