const fsPromises = require('fs').promises;
const path = require('path');
const usersRouter = require('express').Router();

const pathToFile = path.join(__dirname, '..', 'data', 'users.json')

usersRouter.get('/users', (req, res) => {
  fsPromises.readFile(pathToFile, 'utf-8')
    .then(users => res.status(200).send(users))
    .catch(err => console.log(err))
})


usersRouter.get('/users/:id', (req, res) => {
  fsPromises.readFile(pathToFile, 'utf-8')
    .then(users => {
      const user = JSON.parse(users).find(user => user._id === req.params.id);
      if (!user) return res.status(404).send({ "message": "Нет пользователя с таким id" });
      res.status(200).send(user)
    })
    .catch(err => console.log(err))
})

module.exports = usersRouter
