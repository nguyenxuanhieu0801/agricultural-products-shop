import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || process.env.APP_PORT || 8081;
//JWT
export const SECRET_KEY = process.env.SECRET_KEY || 'dummy';
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'dummy';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
//CLOUDINARY
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
