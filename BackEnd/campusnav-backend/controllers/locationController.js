const db = require('../config/db');

// GET all locations
const getAllLocations = (req, res) => {
  const sql = 'SELECT * FROM locations';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch locations' });
    }
    res.json(results);
  });
};

// GET search locations by name
const searchLocations = (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Please provide a search term' });
  }
  const sql = 'SELECT * FROM locations WHERE name LIKE ?';
  db.query(sql, [`%${name}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Search failed' });
    }
    res.json(results);
  });
};

// GET single location by ID
const getLocationById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM locations WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch location' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(results[0]);
  });
};

// GET locations by category
const getLocationsByCategory = (req, res) => {
  const { category } = req.params;
  const sql = 'SELECT * FROM locations WHERE category = ?';
  db.query(sql, [category], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch locations' });
    }
    res.json(results);
  });
};

// SAVE a location for logged in user
const saveLocation = (req, res) => {
  const user_id = req.user.id;
  const { location_id } = req.body;

  if (!location_id) {
    return res.status(400).json({ error: 'Please provide a location_id' });
  }

  const checkSql = 'SELECT * FROM saved_locations WHERE user_id = ? AND location_id = ?';
  db.query(checkSql, [user_id, location_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'Location already saved' });
    }

    const insertSql = 'INSERT INTO saved_locations (user_id, location_id) VALUES (?, ?)';
    db.query(insertSql, [user_id, location_id], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save location' });
      }
      res.status(201).json({ message: 'Location saved successfully!' });
    });
  });
};

// GET all saved locations for logged in user
const getSavedLocations = (req, res) => {
  const user_id = req.user.id;

  const sql = `
    SELECT locations.* 
    FROM saved_locations 
    JOIN locations ON saved_locations.location_id = locations.id 
    WHERE saved_locations.user_id = ?
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch saved locations' });
    }
    res.json(results);
  });
};

// DELETE a saved location
const deleteSavedLocation = (req, res) => {
  const user_id = req.user.id;
  const { location_id } = req.params;

  const sql = 'DELETE FROM saved_locations WHERE user_id = ? AND location_id = ?';
  db.query(sql, [user_id, location_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete saved location' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Saved location not found' });
    }
    res.json({ message: 'Location removed from saved!' });
  });
};

module.exports = {
  getAllLocations,
  searchLocations,
  getLocationById,
  getLocationsByCategory,
  saveLocation,
  getSavedLocations,
  deleteSavedLocation
};