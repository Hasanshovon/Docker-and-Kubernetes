const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
require('dotenv').config(); // Load environment variables

const Favorite = require('./models/favorite');

const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Get favorites
app.get('/favorites', async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.status(200).json({ favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while fetching favorites.' });
  }
});

// Add favorite
app.post('/favorites', 
  [
    body('name').notEmpty().withMessage('Name is required.'),
    body('type').isIn(['movie', 'character']).withMessage('"type" should be "movie" or "character"!'),
    body('url').isURL().withMessage('URL must be valid.')
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name: favName, type: favType, url: favUrl } = req.body;

    try {
      const existingFav = await Favorite.findOne({ name: favName });
      if (existingFav) {
        return res.status(400).json({ message: 'Favorite exists already!' });
      }

      const favorite = new Favorite({ name: favName, type: favType, url: favUrl });
      await favorite.save();
      res.status(201).json({ message: 'Favorite saved!', favorite: favorite.toObject() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong while saving favorite.' });
    }
});

// Get movies
app.get('/movies', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');
    res.status(200).json({ movies: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while fetching movies.' });
  }
});

// Get people
app.get('/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people');
    res.status(200).json({ people: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while fetching people.' });
  }
});

// Start server
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

