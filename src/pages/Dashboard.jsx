import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserMovies, deleteMovie, updateMovie } from "@/lib/watchlist";
import { getImageUrl } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit3, Star, Film, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MovieEditDialog from "@/components/MovieEditDialog";

const statusLabels = {
  want: "Want to Watch",
  watching: "Watching",
  watched: "Watched",
};

const statusColors = {
  want: "bg-primary/20 text-primary border-primary/30",
  watching: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  watched: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editMovie, setEditMovie] = useState(null);

  const fetchMovies = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getUserMovies(user.uid);
      setMovies(data);
    } catch {
      toast({ title: "Failed to load movies", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Movie removed" });
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateMovie(id, { status });
      setMovies((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
      toast({ title: `Status updated to "${statusLabels[status]}"` });
    } catch {
      toast({ title: "Failed to update", variant: "destructive" });
    }
  };

  const filtered = filter === "all" ? movies : movies.filter((m) => m.status === filter);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">
            My <span className="text-gradient">Watchlist</span>
          </h1>
          <p className="text-muted-foreground">{movies.length} movies tracked</p>
        </div>
        <Link to="/search">
          <Button className="gap-2">
            <Search className="h-4 w-4" /> Add Movies
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["all", "want", "watching", "watched"].map((s) => (
          <Button
            key={s}
            variant={filter === s ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(s)}
          >
            {s === "all" ? "All" : statusLabels[s]}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Film className="h-16 w-16 text-muted-foreground/30" />
          <p className="mt-4 text-lg text-muted-foreground">No movies yet</p>
          <Link to="/search">
            <Button variant="outline" className="mt-4">
              Search & Add Movies
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {filtered.map((movie) => (
              <motion.div
                key={movie.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass group overflow-hidden rounded-xl"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  {movie.posterPath ? (
                    <img
                      src={getImageUrl(movie.posterPath)}
                      alt={movie.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                      <Film className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  {/* Overlay actions */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex w-full gap-2 p-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex-1 gap-1"
                        onClick={() => setEditMovie(movie)}
                      >
                        <Edit3 className="h-3 w-3" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => movie.id && handleDelete(movie.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-display font-semibold leading-tight line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={statusColors[movie.status]}>
                      {statusLabels[movie.status]}
                    </Badge>
                    {movie.rating > 0 && (
                      <span className="flex items-center gap-1 text-sm text-primary">
                        <Star className="h-3 w-3 fill-primary" /> {movie.rating}/10
                      </span>
                    )}
                  </div>
                  {/* Quick status buttons */}
                  <div className="flex gap-1 pt-1">
                    {["want", "watching", "watched"].map((s) => (
                      <button
                        key={s}
                        onClick={() => movie.id && handleStatusChange(movie.id, s)}
                        className={`rounded-md px-2 py-0.5 text-xs transition-colors ${
                          movie.status === s
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {s === "want" ? "Want" : s === "watching" ? "Watching" : "Watched"}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {editMovie && (
        <MovieEditDialog
          movie={editMovie}
          open={!!editMovie}
          onClose={() => setEditMovie(null)}
          onSave={async (data) => {
            if (!editMovie.id) return;
            await updateMovie(editMovie.id, data);
            setMovies((prev) =>
              prev.map((m) => (m.id === editMovie.id ? { ...m, ...data } : m))
            );
            setEditMovie(null);
            toast({ title: "Movie updated" });
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
