const express = require('express');
const router = express.Router();
const {
   getLocations,
   createLocations,
   updateLocations,
   deleteLocations
} = require('../controllers/LocationsController');

/* GET users listing. */
router.get('/', getLocations);
router.get('/:id', getLocations);
router.post('/', createLocations);
router.put('/', updateLocations);
router.delete('/', deleteLocations);

module.exports = router;
