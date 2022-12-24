const express = require('express');
const users = require('./users');
const cards = require('./cards');
const { error404 } = require('../constants');
const auth = require('../middlewares/auth');

const routes = express.Router();

routes.use('/users', auth, users);
routes.use('/cards', auth, cards);
routes.use('/*', (req, res) => {
  res.status(error404).send({ message: 'Страница не найдена' });
});

module.exports = routes;
