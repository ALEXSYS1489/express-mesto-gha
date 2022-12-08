const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '63909a523dfdc093251d37f4' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(routes)

async function connect(){
await mongoose.connect('mongodb://localhost:27017/mestodb', {});
await app.listen(PORT)
// Если всё работает, консоль покажет, какой порт приложение слушает
console.log(` UUUU...MAAA  App listening on port ${PORT}`)
}

connect()