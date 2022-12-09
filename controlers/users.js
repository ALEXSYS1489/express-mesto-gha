/*eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
const User = require('../models/user');
const { error400, error404, error500 } = require('../constants');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(error500).send({ massage: 'Ошибка на сервере' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) throw new Error('not found');

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      res
        .status(error400)
        .send({ message: 'Не валидный id' });
    } else if (err.message === 'not found') {
      res.status(error404).send({ message: 'Пользователь с указанным id не найден' });
    } else {
      res.status(error500).send({ message: 'Ошибка на сервере' });
    }
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await new User(req.body);
    res.send(await newUser.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(error400).send({ message: 'Ошибка валидации полей', ...err });
    } else {
      res.status(error500).send({ message: 'Ошибка на сервере' });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error('not found');

    const { name, about } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    ).then((data) => {
      res.send(data);
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(error400).send({ message: 'Ошибка валидации полей', ...err });
    } else if (err.name === 'CastError') {
      res
        .status(error404)
        .send({ message: 'Не валидный id' });
    } else if (err.message === 'not found') {
      res.status(error404).send({ message: 'Пользователь с указанным id не найден' });
    } else {
      res.status(error500).send({ message: 'Ошибка на сервере' });
    }
  }
};

const updateAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error('not found');

    const { avatar } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    ).then((data) => {
      res.send(data);
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(error400).send({ message: 'Ошибка валидации полей', ...err });
    } else if (err.name === 'CastError') {
      res
        .status(error404)
        .send({ message: 'Не валидный id' });
    } else if (err.message === 'not found') {
      res.status(error404).send({ message: 'Пользователь с указанным id не найден' });
    } else {
      res.status(error500).send({ message: 'Ошибка на сервере' });
    }
  }
};

module.exports = { getUsers, getUserById, addUser, updateUser, updateAvatar };
/*eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/