const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
	useUnifiedTopology: true
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '602d042b6f3dee3b7079f3c1' };
  next();
});

app.use('/', usersRouter, cardsRouter);
app.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`));
