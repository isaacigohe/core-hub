import MovieCard from "./MovieCard";

function MovieRow({ title, movies = [], onDelete, onFavorite }) {
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row-container">
        {movies.length === 0 ? (
          <p>No movies yet</p>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDelete={onDelete}
              onFavorite={onFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MovieRow;