"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconService = void 0;
// src/services/beaconService.ts
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
const validators_1 = require("../validators");
class BeaconService {
    constructor(db) {
        this.db = db;
    }
    async pollBeacon(beaconData) {
        const validation = validators_1.BeaconValidator.validateBeacon(beaconData);
        if (!validation.isValid) {
            return { success: false, message: validation.message };
        }
        try {
            // Check for existing beacon
            const existing = await this.db
                .select()
                .from(schema_1.vBeacons)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.vBeacons.uuid, beaconData.uuid.toLowerCase()), (0, drizzle_orm_1.eq)(schema_1.vBeacons.major, beaconData.major), (0, drizzle_orm_1.eq)(schema_1.vBeacons.minor, beaconData.minor)));
            if (existing.length > 0) {
                // Update existing beacon
                await this.db
                    .update(schema_1.vBeacons)
                    .set({
                    latitude: beaconData.latitude.toString(),
                    longitude: beaconData.longitude.toString(),
                    isActive: true,
                    timestamp: new Date(),
                })
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.vBeacons.uuid, beaconData.uuid.toLowerCase()), (0, drizzle_orm_1.eq)(schema_1.vBeacons.major, beaconData.major), (0, drizzle_orm_1.eq)(schema_1.vBeacons.minor, beaconData.minor)));
                return { success: true, message: 'Beacon updated successfully' };
            }
            // Insert new beacon
            await this.db.insert(schema_1.vBeacons).values({
                ...beaconData,
                latitude: beaconData.latitude.toString(),
                longitude: beaconData.longitude.toString(),
                timestamp: new Date(),
            });
            return { success: true, message: 'Beacon registered successfully' };
        }
        catch (error) {
            console.error('Error in pollBeacon:', error);
            return { success: false, message: 'Internal server error' };
        }
    }
    async getAllActiveBeacons() {
        try {
            const beacons = await this.db
                .select()
                .from(schema_1.vBeacons)
                .where((0, drizzle_orm_1.eq)(schema_1.vBeacons.isActive, true))
                .orderBy((0, drizzle_orm_1.desc)(schema_1.vBeacons.timestamp));
            return {
                success: true,
                message: 'Beacons retrieved successfully',
                data: beacons,
            };
        }
        catch (error) {
            console.error('Error in getAllActiveBeacons:', error);
            return {
                success: false,
                message: 'Internal server error',
                data: null,
            };
        }
    }
}
exports.BeaconService = BeaconService;
