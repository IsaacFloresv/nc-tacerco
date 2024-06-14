const express = require('express');
const router = express.Router();
const {
   getUsersEvents,
   getUsersEventsById,
   getUsersEventsIsConfirmed,
   postUserEvent,
   putUserEvent,
   deletetUsersEvents
} = require('../controllers/userEvent.controller');

// GET ALL UsersEvents
router.get('/', getUsersEvents);

// GET UserEvent By Id
router.get('/id', getUsersEventsById);

// GET UsersEvents By isConfirmed true or false
router.get('/confirmed/:isConfirmed', getUsersEventsIsConfirmed);

// POST an UserEvent
router.post('/', postUserEvent);

// PUT an UserEvent by UserId
router.put('/', putUserEvent);

// DELETE UserEvent By Id
router.delete('/id', deletetUsersEvents);


module.exports = router;
