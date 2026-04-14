const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, onDelete, onFavorite }) {
  return (
    <div className="card">
      <img
        src={
          movie.poster
            ? IMAGE_BASE + movie.poster
            : "https://via.placeholder.com/150"
        }
        alt={movie.title}
      />

      <h4>{movie.title}</h4>

      <p>{movie.status}</p>

      <div className="actions">
        <button onClick={() => onDelete(movie.id)}>🗑</button>

        <button onClick={() => onFavorite(movie.id, movie.favorite)}>
          {movie.favorite ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;