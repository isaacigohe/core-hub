import { Link } from "react-router-dom";

function Navbar({ setFilter }) {
  return (
    <div className="navbar">
      
      {/* LEFT SIDE - NAVIGATION */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/auth">Login</Link>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("watched")}>Watched</button>
        <button onClick={() => setFilter("favorites")}>Favorites</button>
      </div>

    </div>
  );
}

export default Navbar;