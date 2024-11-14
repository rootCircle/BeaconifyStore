"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vBeacons = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.vBeacons = (0, pg_core_1.pgTable)('virtual_beacons', {
    uuid: (0, pg_core_1.varchar)('uuid', { length: 36 }).notNull(),
    major: (0, pg_core_1.varchar)('major', { length: 5 }).notNull(),
    minor: (0, pg_core_1.varchar)('minor', { length: 5 }).notNull(),
    latitude: (0, pg_core_1.decimal)('latitude', { precision: 8, scale: 6 }).notNull(),
    longitude: (0, pg_core_1.decimal)('longitude', { precision: 9, scale: 6 }).notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
    timestamp: (0, pg_core_1.timestamp)('timestamp').notNull().defaultNow(),
}, (vBeacons) => [
    (0, pg_core_1.primaryKey)({ columns: [vBeacons.uuid, vBeacons.major, vBeacons.minor] })
]);
