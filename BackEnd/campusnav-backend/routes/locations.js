const express = require('express');
const router = express.Router();
const {
  getAllLocations,
  searchLocations,
  getLocationById,
  getLocationsByCategory,
  saveLocation,
  getSavedLocations,
  deleteSavedLocation
} = require('../controllers/locationController');
const verifyToken = require('../config/authMiddleware');

// Public routes (no login needed)
router.get('/', getAllLocations);
router.get('/search', searchLocations);
router.get('/category/:category', getLocationsByCategory);
router.get('/:id', getLocationById);

// Protected routes (login required)
router.post('/save', verifyToken, saveLocation);
router.get('/saved/list', verifyToken, getSavedLocations);
router.delete('/saved/:location_id', verifyToken, deleteSavedLocation);

module.exports = router;