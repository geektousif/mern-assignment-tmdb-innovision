import { fetchWithRetry, getMovieDetailsUrl, searchMoviesByNameUrl } from '../api';
import logger from '../config/logger.config';
import ApiError from '../utils/ApiError';

interface SearchResponse {
    results: {
        id: number;
    }[];
}

const searchMovies = async (search: string) => {
    try {
        if (!search) {
            throw new ApiError(400, 'Search query cannot be empty');
        }
        const searchUrl = searchMoviesByNameUrl(search);
        const searchData: SearchResponse = await fetchWithRetry(searchUrl);

        if (!searchData.results || searchData.results.length === 0) {
            return [];
        }

        const movieIds = searchData.results.map(({ id }) => id);
        console.log(movieIds.length);

        const moviesDetails = movieIds.map(async (movieId: any) => {
            try {
                const movieDetailsUrl = getMovieDetailsUrl(movieId);
                const movie = await fetchWithRetry(movieDetailsUrl);

                return movie;
            } catch (error) {
                logger.error(`Error fetching movie details for ID ${movieId}:`, error);
                return null;
            }
        });

        const movies = await Promise.all(moviesDetails);
        const filteredMovies = movies
            .filter((movie: any) => movie !== null)
            .map(({ id, title, release_date, poster_path, overview, credits, videos }) => {
                const castDetails = credits
                    ? credits.cast.map((actor: any) => ({
                          name: actor.name,
                          character: actor.character,
                          profile_path: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : null,
                      }))
                    : [];

                const trailer = videos ? videos.results.find((video: any) => video.type === 'Trailer') : null;
                const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

                return {
                    id,
                    title,
                    release_date,
                    poster_path: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : null,
                    description: overview || 'No description available',
                    casts: castDetails,
                    trailer: trailerUrl,
                };
            });
        return filteredMovies;
    } catch (error: any) {
        logger.error(error);
        throw new ApiError(500, 'Failed to fetch movies');
    }
};

export { searchMovies };
