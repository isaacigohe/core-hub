import { useEffect, useState } from "react";
import { getMovies, deleteMovie, updateMovie } from "../services/movieService";

function Dashboard() {
  const [movies, setMovies] = useState([]);

  const loadMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = async (id) => {
    await deleteMovie(id);
    loadMovies();
  };

  const handleStatusChange = async (id, status) => {
    await updateMovie(id, { status });
    loadMovies();
  };

  const toggleFavorite = async (id, current) => {
    await updateMovie(id, { favorite: !current });
    loadMovies();
  };

  return (
    <div>
      <h2>My Movies</h2>

      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>

          <button onClick={() => handleDelete(movie.id)}>
            Delete
          </button>

          <button onClick={() => handleStatusChange(movie.id, "watched")}>
            Mark Watched
          </button>

          <button onClick={() => toggleFavorite(movie.id, movie.favorite)}>
            {movie.favorite ? "★" : "☆"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;