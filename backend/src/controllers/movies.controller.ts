import joi from 'joi';

import ApiError from '../utils/ApiError';
import ApiResponse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';
import { searchMovies } from '../services/movies.service';
import { searchMoviesByNameUrl } from '../api';

const search = asyncHandler(async (req, res) => {
    const { movieName } = req.query;

    const schema = joi.object({
        movieName: joi.string().required(),
    });

    await schema.validateAsync({ movieName });

    if (!movieName) {
        throw new ApiError(400, 'movieName is required');
    }

    const movies = await searchMovies(movieName as string);

    console.log(movies);

    return res.status(200).json(new ApiResponse(200, 'Movies found', movies));
});

export default { search };
