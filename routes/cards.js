const fsPromises = require('fs').promises;
const path = require('path');
const cardsRouter = require('express').Router();

cardsRouter.get('/cards', (req, res) => {
  fsPromises.readFile(path.join(__dirname, '..', 'data', 'cards.json'), 'utf-8')
    .then(cards => res.status(200).send(cards))
    .catch(err => console.log(err))
})

module.exports = cardsRouter
