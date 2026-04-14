import { useEffect, useState } from "react";
import { getMovies, deleteMovie, updateMovie } from "../services/movieService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MovieRow from "../components/MovieRow";

function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const loadMovies = async () => {
    setLoading(true);
    const data = await getMovies();
    setMovies(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  // FILTERS
  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.status === "watched";
    if (filter === "favorites") return movie.favorite;
    return true;
  });

  const handleDelete = async (id) => {
    await deleteMovie(id);
    loadMovies();
  };

  const toggleFavorite = async (id, current) => {
    await updateMovie(id, { favorite: !current });
    loadMovies();
  };

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Navbar setFilter={setFilter} />

        {/* HERO SECTION */}
        <div className="hero">
          <h1>🎬 Your Movie Tracker</h1>
          <p>Manage your watchlist, favorites, and progress</p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <MovieRow
              title="All Movies"
              movies={filteredMovies}
              onDelete={handleDelete}
              onFavorite={toggleFavorite}
            />

            <MovieRow
              title="⭐ Favorites"
              movies={movies.filter((m) => m.favorite)}
              onDelete={handleDelete}
              onFavorite={toggleFavorite}
            />

            <MovieRow
              title="🎬 Watched"
              movies={movies.filter((m) => m.status === "watched")}
              onDelete={handleDelete}
              onFavorite={toggleFavorite}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;