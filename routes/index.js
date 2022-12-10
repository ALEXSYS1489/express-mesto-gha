const express = require('express');
const users = require('./users');
const cards = require('./cards');
const { error404 } = require('../constants');

const routes = express.Router();

routes.use('/users', users);
routes.use('/cards', cards);
routes.use('/*', (req, res) => {
  res.status(error404).send({ message: 'Страница не найдена' });
});

module.exports = routes;
