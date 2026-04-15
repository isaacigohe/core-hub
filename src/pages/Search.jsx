import { useState } from "react";
import { searchMovies } from "../services/api";
import { addMovie } from "../services/movieService";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const results = await searchMovies(query);
    setMovies(results);
  };

  const handleAdd = async (movie) => {
    if (!auth.currentUser) {
      alert("Please login first!");
      navigate("/auth");
      return;
    }

    await addMovie({
      userId: auth.currentUser.uid,
      title: movie.title,
      poster: movie.poster_path,
      releaseDate: movie.release_date,
      rating: 0,
      notes: "",
      status: "want",
      favorite: false
    });

    alert("Added to your list!");
  };

  return (
    <div>
      <h2>Explore Movies</h2>

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