const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || "0083663d984624f566e0ec153baac342";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const getImageUrl = (path, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

// SEARCH MOVIES
export async function searchMovies(query) {
  if (!query.trim()) return [];

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=1`
  );

  if (!res.ok) throw new Error("Failed to search movies");

  const data = await res.json();
  return data.results || [];
}

// TRENDING MOVIES
export async function getTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch trending");

  const data = await res.json();
  return data.results || [];
}