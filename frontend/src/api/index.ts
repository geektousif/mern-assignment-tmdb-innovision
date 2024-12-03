export const API_URL = import.meta.env.VITE_BACKEND_URL;

export const searchUrl = (searchTerm: string) =>
  `${API_URL}/movies/search?movieName=${encodeURIComponent(searchTerm)}`;
