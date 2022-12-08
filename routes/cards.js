const express = require('express');
const cards = express.Router();
const {getCards, addCard, deleteCard, likeCard, dislikeCard} = require('../controlers/cards')

cards.get('/', getCards)
cards.post('/', express.json(), addCard)
cards.delete('/:cardId', deleteCard)
cards.put('/:cardId/likes', express.json(), likeCard)
cards.delete('/:cardId/likes', express.json(), dislikeCard)

module.exports = cards