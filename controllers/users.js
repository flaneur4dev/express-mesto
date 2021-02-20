const User = require('../models/user');
const errors = require('../utils/utils');

function getUsers(req, res) {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(() => res.status(500).send(errors['500']))
}

function getUser(req, res) {
  User.findById(req.params.id)
    .then(user => user ? res.status(200).send(user) : res.status(404).send(errors['404']))
    .catch(err => err.name === 'CastError' ? res.status(404).send(errors['404']) : res.status(500).send(errors['500']))
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  
  User.create({ name, about, avatar })
    .then(user => res.status(200).send(user))
    .catch(err => err.name === 'ValidationError' ? res.status(400).send(errors['400']) : res.status(500).send(errors['500']))
}

function updateUser(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(user => res.status(200).send(user))
    .catch(err => err.name === 'ValidationError' ? res.status(400).send(errors['400']) : res.status(500).send(errors['500']))
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(user => res.status(200).send(user))
    .catch(err => err.name === 'ValidationError' ? res.status(400).send(errors['400']) : res.status(500).send(errors['500']))
}

module.exports = { getUsers, getUser, createUser, updateUser, updateAvatar }
