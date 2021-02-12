const fsPromises = require('fs').promises;
const path = require('path');
const usersRouter = require('express').Router();

const pathToFile = path.join(__dirname, '..', 'data', 'users.json');

usersRouter.get('/users', (req, res) => {
  fsPromises.readFile(pathToFile, 'utf-8')
    .then(users => res.status(200).send(JSON.parse(users)))
    .catch(() => res.status(500).send({ message: 'Извините, проблемы с данными' }));
});

usersRouter.get('/users/:id', (req, res) => {
  fsPromises.readFile(pathToFile, 'utf-8')
    .then(users => {
      const user = JSON.parse(users).find(usr => usr._id === req.params.id);
      if (!user) return res.status(404).send({ message: 'Нет пользователя с таким id' });
      return res.status(200).send(user);
    })
    .catch(() => res.status(500).send({ message: 'Извините, проблемы с данными' }));
});

module.exports = usersRouter;
