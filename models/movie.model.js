const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
  title: String,
  releaseYear: Number,
  genre: [{ type: String }],
  director: String,
  actors: [{ type: String }],
  language: String,
  country: String,
  rating: Number,
  plot: String,
  awards: String,
  posterUrl: String,
  trailerUrl: String,
});

const Movies = mongoose.model("Movies", MoviesSchema);
module.exports = Movies;
