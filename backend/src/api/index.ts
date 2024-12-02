import { config } from '../config';
import ApiError from '../utils/ApiError';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithRetry = async (url: string, options = {}, retries = 3, backoff = 1000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new ApiError(response.status, response.statusText);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error(`Error - ${error.message}`);

            if (attempt < retries) {
                console.log(`Retrying in ${backoff}ms...`);
                await delay(backoff);
                backoff *= 2;
            } else {
                throw error;
            }
        }
    }
};

export const searchMoviesByNameUrl = (search: string) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${config.tmdbApiKey}&query=${search}`;
};

export const getMovieDetailsUrl = (movieId: number) => {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.tmdbApiKey}&append_to_response=videos,credits`;
};
