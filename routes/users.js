const express = require('express');
const { celebrate, Joi } = require('celebrate');

const users = express.Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserMe,
} = require('../controlers/users');

users.get('/', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), getUsers);

users.get('/me', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), getUserMe);

users.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum(),
  }).unknown(true),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), getUserById);

users.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    about: Joi.string().required(),
  }).unknown(true),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), updateUser);

users.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }).unknown(true),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), updateAvatar);

module.exports = users;
