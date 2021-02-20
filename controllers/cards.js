const Card = require('../models/card');
const errors = require('../utils/utils');

function getCards(req, res) {
  Card.find({})
    .populate('user')
    .then(cards => res.status(200).send(cards))
    .catch(() => res.status(500).send(errors['500']))
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.status(200).send(card))
    .catch(err => err.name === 'ValidationError' ? res.status(400).send(errors['400']) : res.status(500).send(errors['500']))
}

function deleteCard(req, res) {
  Card.findByIdAndDelete(req.params.id)
    .then(card => card ? res.status(200).send({ message: `Карточка с id: ${req.params.id} удалена`}) : res.status(404).send(errors['404']))
    .catch(err => err.name === 'CastError' ? res.status(404).send(errors['404']) : res.status(500).send(errors['500']))
}

function addLike(req, res) {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => card ? res.status(200).send(card) : res.status(404).send(errors['404']))
    .catch(err => err.name === 'CastError' ? res.status(404).send(errors['404']) : res.status(500).send(errors['500']))
}

function deleteLike(req, res) {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => card ? res.status(200).send(card) : res.status(404).send(errors['404']))
    .catch(err => err.name === 'CastError' ? res.status(404).send(errors['404']) : res.status(500).send(errors['500']))
}

module.exports = { getCards, createCard, deleteCard, addLike, deleteLike }
