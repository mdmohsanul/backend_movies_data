const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: String,
    },
    genre: [{ type: String }],
    director: {
      type: String,
      required: true,
    },
    actors: [{ type: String }],
    language: String,
    country: {
      type: String,
      default: "India",
    },
    rating: {
      type: String,
      min: 0,
      max: 10,
      default: 0,
    },
    plot: String,
    awards: String,
    posterUrl: String,
    trailerUrl: String,
  },
  {
    timestamp: true,
  }
);

const Movies = mongoose.model("Movies", MoviesSchema);
module.exports = Movies;
