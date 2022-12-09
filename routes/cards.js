const express = require('express');

const cards = express.Router();
const { getCards, addCard, deleteCard, likeCard, dislikeCard } = require('../controlers/cards')

cards.get('/', getCards);
cards.post('/', express.json(), addCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', likeCard);
cards.delete('/:cardId/likes', dislikeCard);

module.exports = cards;
