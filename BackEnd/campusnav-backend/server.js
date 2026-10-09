const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

const locationRoutes = require('./routes/locations');
const authRoutes = require('./routes/auth');

app.use('/api/locations', locationRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ CampusNav server running on port ${PORT}`);
});