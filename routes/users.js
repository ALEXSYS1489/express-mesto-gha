const express = require('express');
const users = express.Router();
const {getUsers, getUserById, addUser, updateUser, updateAvatar} = require('../controlers/users')

users.get('/', getUsers)
users.get('/:userId', getUserById)
users.post('/', express.json(), addUser)
users.patch('/me', express.json(), updateUser)
users.patch('/me/avatar', express.json(), updateAvatar)

module.exports = users