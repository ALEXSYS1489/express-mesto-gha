const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(500).send({ massage: "Ошибка на сервере" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if(!user) throw new Error('not found');

    res.send(user);
  } catch (err) {
    if (err.name === "CastError") {
      res
        .status(400)
        .send({message: 'Не валидный id', ...err});
    } else if (err.message === 'not found') {
      res.status(404).send({ message: "Пользователь с указанным id не найден" });
    } else {
      res.status(500).send({ message: "Ошибка на сервере" });
    }
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = await new User(req.body);
    res.send(await newUser.save());
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: "Ошибка валидации полей", ...err });
    } else {
      res.status(500).send({ message: "Ошибка на сервере" });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { name: name, about: about },
      {
        new: true,
        runValidators: true,
        upsert: false,
      }
    ).then((user) => {
      res.send(user);
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: "Ошибка валидации полей", ...err });
    } else if (err.name === "CastError") {
      res
        .status(404)
        .send({ message: "Пользователь с указанным id не найден" });
    } else {
      res.status(500).send({ message: "Ошибка на сервере" });
    }
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    await User.findByIdAndUpdate(
      req.user._id,
      { avatar: avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      }
    ).then((user) => {
      res.send(user);
      console.log(123);
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: "Ошибка валидации полей", ...err });
    } else if (err.name === "CastError") {
      res
        .status(404)
        .send({ message: "Пользователь с указанным id не найден" });
    } else {
      res.status(500).send({ message: "Ошибка на сервере" });
    }
  }
};

module.exports = { getUsers, getUserById, addUser, updateUser, updateAvatar };
