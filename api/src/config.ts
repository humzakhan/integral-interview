import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  port: process.env.PORT || 4041,
  allowedOrigins: process.env.ALLOWED_ORIGINS || '',
  providerUrl: process.env.PROVIDER_URL || '',
  providerApiKey: process.env.PROVIDER_API_KEY || '',
};