const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard, addLike, deleteLike } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:id', deleteCard);
cardsRouter.put('/cards/:id/likes', addLike);
cardsRouter.delete('/cards/:id/likes', deleteLike);

module.exports = cardsRouter
