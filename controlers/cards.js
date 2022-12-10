const Card = require('../models/card');
const { error400, error404, error500 } = require('../constants');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    res.send(cards);
  } catch (err) {
    res.status(error500).send({ massage: 'Ошибка на сервере' });
  }
};

const addCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const newCard = await new Card({ name, link, owner }).populate('owner');
    res.send(await newCard.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(error400).send({ message: 'Ошибка валидации полей', ...err });
    } else {
      res.status(error500).send({ message: 'Ошибка на сервере' });
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) throw new Error('not found');

    await Card.findByIdAndRemove(req.params.cardId);
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(error400).send({ message: 'Не валидный id', ...err });
    } else if (err.message === 'not found') {
      res.status(error404).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(error500).send({ message: 'Ошибка на сервере' });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).populate(['owner', 'likes']);
    if (!card) throw new Error('not found');

    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(error400).send({ message: 'Не валидный id', ...err });
    } else if (err.message === 'not found') {
      res.status(error404).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(error500).send({ message: 'Ошибка на сервере' });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).populate(['owner', 'likes']);
    if (!card) throw new Error('not found');

    await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(error400).send({ message: 'Не валидный id', ...err });
    } else if (err.message === 'not found') {
      res.status(error404).send({ message: 'Карточка с указанным id не найдена' });
    } else {
      res.status(error500).send({ message: 'Ошибка на сервере' });
    }
  }
};

module.exports = {
  getCards, addCard, deleteCard, likeCard, dislikeCard,
};
