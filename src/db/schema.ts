import { pgTable, serial, varchar, boolean, timestamp, decimal } from 'drizzle-orm/pg-core';

export const vBeacons = pgTable('virtual_beacons', {
  id: serial('id').primaryKey(),
  uuid: varchar('uuid', { length: 36 }).notNull(),
  major: varchar('major', { length: 5 }).notNull(),
  minor: varchar('minor', { length: 5 }).notNull(),
  latitude: decimal('latitude', { precision: 8, scale: 6 }).notNull(),
  longitude: decimal('longitude', { precision: 9, scale: 6 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
});