import 'dotenv/config';

export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || '',
  inactiveThresholdMinutes: 5,
} as const;

