const { getEvents, createEvents, getEventsByCategory, deleteEvents, getEventsBySubCategory } = require('../controllers/event.controller')


const eventRouter = require('express').Router();

eventRouter.get('/', getEvents)
eventRouter.get('/:id', getEvents)
eventRouter.get('/category/:id', getEventsByCategory)
eventRouter.get('/SubCategory/:id', getEventsBySubCategory)
eventRouter.post('/', createEvents)
eventRouter.delete('/deleteEvent/:id', deleteEvents)


module.exports = eventRouter;
