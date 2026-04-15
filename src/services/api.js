const API_KEY = "0083663d984624f566e0ec153baac342";

export const searchMovies = async (query) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
};