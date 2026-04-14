function Navbar({ setFilter }) {
  return (
    <div className="navbar">
      <input placeholder="Search movies..." />

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("watched")}>Watched</button>
        <button onClick={() => setFilter("favorites")}>Favorites</button>
      </div>
    </div>
  );
}

export default Navbar;