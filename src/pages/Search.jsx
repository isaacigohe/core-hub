import { useState } from "react";
import { searchMovies } from "../services/api";
import { addMovie } from "../services/movieService";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const results = await searchMovies(query);
    setMovies(results);
  };

  const handleAdd = async (movie) => {
    await addMovie({
      title: movie.title,
      poster: movie.poster_path,
      releaseDate: movie.release_date,
      rating: 0,
      notes: "",
      status: "want",
      favorite: false
    });
    alert("Added!");
  };

  return (
    <div>
      <input onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <button onClick={() => handleAdd(movie)}>
            Add to Watchlist
          </button>
        </div>
      ))}
    </div>
  );
}

export default Search;