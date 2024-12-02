import dotenv from 'dotenv';
import joi from 'joi';

dotenv.config();

const envVarsSchema = joi
    .object({
        NODE_ENV: joi.string().valid('development', 'production').default('development'),
        PORT: joi.number().default(3000),
        MONGO_URI: joi.string().required(),
        TMDB_API_KEY: joi.string().required(),
    })
    .unknown();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoUri: envVars.MONGO_URI,
    tmdbApiKey: envVars.TMDB_API_KEY,
};
