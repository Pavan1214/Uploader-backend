const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  cover: String,
  url: String,
  duration: String,
});

const Song = mongoose.model('Song', songSchema);

app.post('/upload', async (req, res) => {
  const { title, artist, cover, url, duration } = req.body;

  try {
    const song = new Song({ title, artist, cover, url, duration });
    await song.save();
    res.status(200).json({ message: 'Song uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving song.' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
