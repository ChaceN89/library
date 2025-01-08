// src/API/globals.js

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const DEFAULT_PAGE_SIZE = process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE || 10;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

export const IMAGE_PREFIX = `https://${process.env.AWS_STORAGE_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION_NAME}.amazonaws.com`;
