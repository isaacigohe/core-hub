import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getUserMovies, deleteMovie, updateMovie } from "@/lib/watchlist";
import { getImageUrl } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit3, Star, Film, Search } from "lucide-react";
import MovieEditDialog from "@/components/MovieEditDialog";

const statusLabels = { want: "Want to Watch", watching: "Watching", watched: "Watched" };

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

  useEffect(() => {
    const fetchMovies = async () => {
      if (!user) return;
      try {
        const data = await getUserMovies(user.uid);
        setMovies(data);
      } catch {
        toast({ title: "Failed to load movies", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [user, toast]);

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter((m) => m.id !== id));
      toast({ title: "Movie removed" });
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateMovie(id, { status });
      setMovies(movies.map((m) => (m.id === id ? { ...m, status } : m)));
      toast({ title: "Status updated" });
    } catch {
      toast({ title: "Failed to update", variant: "destructive" });
    }
  };

  const filteredMovies = filter === "all" ? movies : movies.filter((m) => m.status === filter);

  if (loading) return <div className="flex h-[60vh] items-center justify-center animate-pulse text-primary">Loading...</div>;

  return (
    <div className=" py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">My <span className="text-gradient">Watchlist</span></h1>
          <p className="text-muted-foreground">{movies.length} movies tracked</p>
        </div>
        <Link to="/search"><Button className="gap-2"><Search size={16} /> Add Movies</Button></Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", "want", "watching", "watched"].map((s) => (
          <Button key={s} variant={filter === s ? "default" : "outline"} size="sm" onClick={() => setFilter(s)}>
            {s === "all" ? "All" : statusLabels[s]}
          </Button>
        ))}
      </div>

      {/* Movie Grid */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-20 opacity-50"><Film className="mx-auto mb-4" size={48} /><p>No movies found</p></div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="glass group overflow-hidden rounded-xl border border-border/50">
              <div className="relative aspect-[2/3]">
                <img src={getImageUrl(movie.posterPath)} alt={movie.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => setEditMovie(movie)}><Edit3 size={14} /></Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(movie.id)}><Trash2 size={14} /></Button>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold truncate">{movie.title}</h3>
                <div className="flex items-center justify-between">
                  <Badge className={statusColors[movie.status]}>{statusLabels[movie.status]}</Badge>
                  {movie.rating > 0 && <span className="flex items-center gap-1 text-primary"><Star size={12} fill="currentColor" /> {movie.rating}</span>}
                </div>
                <div className="flex gap-1">
                  {["want", "watching", "watched"].map((s) => (
                    <button key={s} onClick={() => handleStatusChange(movie.id, s)} className={`flex-1 rounded py-1 text-[10px] uppercase font-bold transition ${movie.status === s ? "bg-primary text-black" : "bg-muted hover:bg-secondary"}`}>
                      {s.slice(0, 4)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editMovie && (
        <MovieEditDialog
          movie={editMovie}
          open={!!editMovie}
          onClose={() => setEditMovie(null)}
          onSave={async (data) => {
            await updateMovie(editMovie.id, data);
            setMovies(movies.map((m) => (m.m_id === editMovie.m_id ? { ...m, ...data } : m)));
            setEditMovie(null);
            toast({ title: "Movie updated" });
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;