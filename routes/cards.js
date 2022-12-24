const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cards = express.Router();
const {
  getCards, addCard, deleteCard, likeCard, dislikeCard,
} = require('../controlers/cards');

cards.get('/', celebrate({
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), getCards);

cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }).unknown(true),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), addCard);

cards.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), deleteCard);

cards.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), likeCard);

cards.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    Authorization: Joi.string(),
  }).unknown(true),
}), dislikeCard);

module.exports = cards;
