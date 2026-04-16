import { useState, useEffect } from "react";
import { searchMovies, getTrendingMovies, getImageUrl } from "@/lib/tmdb";
import { addMovie, getUserMovies } from "@/lib/watchlist";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Search as SearchIcon, Plus, Check, Film, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

/**
 * SearchPage component
 */
const SearchPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addedIds, setAddedIds] = useState(new Set());

  // Load user's existing movies to know which are already added
  useEffect(() => {
    if (!user) return;
    getUserMovies(user.uid).then((movies) => {
      setAddedIds(new Set(movies.map((m) => m.tmdbId)));
    });
    getTrendingMovies().then(setTrending).catch(() => {});
  }, [user]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    try {
      const data = await searchMovies(query);
      setResults(data);
    } catch {
      toast({ title: "Search failed", variant: "destructive" });
    } finally {
      setSearching(false);
    }
  };

  const handleAdd = async (movie) => {
    if (!user) return;
    try {
      await addMovie({
        userId: user.uid,
        tmdbId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        overview: movie.overview,
        status: "want",
        rating: 0,
        notes: "",
      });
      setAddedIds((prev) => new Set(prev).add(movie.id));
      toast({ title: `"${movie.title}" added to your list!` });
    } catch {
      toast({ title: "Failed to add movie", variant: "destructive" });
    }
  };

  const displayMovies = results.length > 0 ? results : trending;
  const isSearchResults = results.length > 0;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">
          <span className="text-gradient">Discover</span> Movies
        </h1>
        <p className="text-muted-foreground">Search TMDB and add to your watchlist</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie…"
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={searching}>
          {searching ? "Searching…" : "Search"}
        </Button>
      </form>

      {!isSearchResults && displayMovies.length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-muted-foreground">
          <TrendingUp className="h-4 w-4" /> Trending This Week
        </div>
      )}

      {displayMovies.length === 0 && !searching ? (
        <div className="flex flex-col items-center py-20 text-center">
          <Film className="h-16 w-16 text-muted-foreground/30" />
          <p className="mt-4 text-muted-foreground">Search for movies to add to your list</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayMovies.map((movie, i) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass group overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                {movie.poster_path ? (
                  <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <Film className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-display font-semibold leading-tight line-clamp-1">{movie.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                  {" · "}⭐ {movie.vote_average.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">{movie.overview}</p>
                <Button
                  size="sm"
                  variant={addedIds.has(movie.id) ? "secondary" : "default"}
                  className="w-full gap-1"
                  disabled={addedIds.has(movie.id)}
                  onClick={() => handleAdd(movie)}
                >
                  {addedIds.has(movie.id) ? (
                    <>
                      <Check className="h-3 w-3" /> In Your List
                    </>
                  ) : (
                    <>
                      <Plus className="h-3 w-3" /> Add to My List
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
