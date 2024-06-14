const express = require('express');
const router = express.Router();
const {
   getAllUsersPreferences,
   getUserPreferenceById
} = require('../controllers/userPreference.controller');

// GET ALL UsersEvents
router.get('/', getAllUsersPreferences);

// GET UserEvent By Id
router.get('/:id', getUserPreferenceById);

module.exports = router;
