import { useEffect, useState } from "react";

import { Movie } from "@/types";
import MovieCard from "./MovieCard";
import { searchUrl } from "@/api";
import { Skeleton } from "../ui/skeleton";

interface SearchResultsProps {
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!searchTerm) {
      setMovies(null);
      setError(null);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);

      try {
        const response = await fetch(searchUrl(searchTerm));
        const data = await response.json();

        if (data.success) {
          setMovies(data.data);
        }
      } catch (error: any) {
        setError(error.message || "Failed to fetch movies");
        setMovies(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  if (!searchTerm) {
    return (
      <p className="text-center text-gray-500">
        Enter a term to search for movies.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500">No movies found.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default SearchResults;
