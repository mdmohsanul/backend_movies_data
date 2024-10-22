const express = require("express");
const { initializeDb } = require("./db/db.connect");
const Movies = require("./models/movie.model");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
initializeDb();

//---------------------------  how to get/ fetch data from database -----------------------------------

//find a movie by particular title

const movieByTitle = async (movieTitle) => {
  try {
    const movie = await Movies.findOne({ title: movieTitle });
    return movie;
  } catch (error) {
    throw error;
  }
};

app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await movieByTitle(req.params.title);
    if (movie) {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch movie" });
  }
});

// to find all the movies

const getAllMovies = async () => {
  try {
    const movies = await Movies.find();
    return movies;
  } catch (error) {
    throw error;
  }
};
app.get("/movies", async (req, res) => {
  try {
    const movies = await getAllMovies();
    if (movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "No movies found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

//get movies by director name

const getMovieByDirector = async (directorName) => {
  try {
    const movies = await Movies.find({ director: directorName });
    return movies;
  } catch (error) {
    throw error;
  }
};
app.get("/movies/director/:directorName", async (req, res) => {
  try {
    const movies = await getMovieByDirector(req.params.directorName);
    if (movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({ errro: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// find movie by genre

const movieByGenre = async (movieGenre) => {
  try {
    const movies = await Movies.find({ genre: movieGenre });
    return movies;
  } catch (error) {
    throw error;
  }
};

app.get("/movies/genre/:genreName", async (req, res) => {
  try {
    const movies = await movieByGenre(req.params.genreName);
    if (movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

//---------------------------------- how to add a single object data into database -------------------------------------------

async function createMovie(movieData) {
  try {
    const movie = new Movies(movieData);
    const updatedMovie = movie.save();
    return updatedMovie;
  } catch (error) {
    throw error;
  }
}
app.post("/movies", async (req, res) => {
  try {
    const movies = await createMovie(req.body);
    res.status(200).json({ message: "Movie added successfully, ", movies });
  } catch (error) {
    res.status(500).json({ error: "Failed to update data ", error });
  }
});

// ------------------------------------- Delete a movie ------------------------------------------

async function deleteMovie(movieId) {
  try {
    const movie = await Movies.findByIdAndDelete(movieId);
    return movie;
  } catch (error) {
    throw error;
  }
}
app.delete("/movies/:movieId", async (req, res) => {
  try {
    const deletedMovie = await deleteMovie(req.params.movieId);
    res
      .status(200)
      .json({ message: "Movie deleted successfully ", deletedMovie });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch api", error });
  }
});

// ---------------- update the particular key from movie object ---------------------------------
async function updateMovie(movieId, dataToUpdate) {
  try {
    const movie = await Movies.findByIdAndUpdate(movieId, dataToUpdate);
    return movie;
  } catch (error) {
    throw error;
  }
}
app.post("/movies/:movieId", async (req, res) => {
  try {
    const updatedMovie = await updateMovie(req.params.movieId, req.body);
    if (updatedMovie) {
      res.status(200).json({ message: "Movie update successfully" });
    } else {
      res.status(404).json({ error: "movie not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update movie" });
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running");
});
