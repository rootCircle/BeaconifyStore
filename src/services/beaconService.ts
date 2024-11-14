// src/services/beaconService.ts
import { and, eq, desc } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { vBeacons } from '../db/schema';
import { BeaconValidator } from '../validators';

export class BeaconService {
  constructor(private db: PostgresJsDatabase) { }

  async pollBeacon(beaconData: {
    uuid: string;
    major: string;
    minor: string;
    latitude: number;
    longitude: number;
  }) {
    const validation = BeaconValidator.validateBeacon(beaconData);
    if (!validation.isValid) {
      return { success: false, message: validation.message };
    }

    try {
      // Check for existing beacon

      const existing = await this.db
        .select()
        .from(vBeacons)
        .where(
          and(
            eq(vBeacons.uuid, beaconData.uuid.toLowerCase()),
            eq(vBeacons.major, beaconData.major),
            eq(vBeacons.minor, beaconData.minor)
          )
        );

      if (existing.length > 0) {
        // Update existing beacon
        await this.db
          .update(vBeacons)
          .set({
            latitude: beaconData.latitude.toString(),
            longitude: beaconData.longitude.toString(),
            isActive: true,
            timestamp: new Date(),
          })
          .where(
            and(
              eq(vBeacons.uuid, beaconData.uuid.toLowerCase()),
              eq(vBeacons.major, beaconData.major),
              eq(vBeacons.minor, beaconData.minor)
            )
          );
        return { success: true, message: 'Beacon updated successfully' };
      }

      // Insert new beacon
      await this.db.insert(vBeacons).values({
        ...beaconData,
        latitude: beaconData.latitude.toString(),
        longitude: beaconData.longitude.toString(),
        timestamp: new Date(),
      });

      return { success: true, message: 'Beacon registered successfully' };
    } catch (error) {
      console.error('Error in pollBeacon:', error);
      return { success: false, message: 'Internal server error' };
    }
  }

  async getAllActiveBeacons() {
    try {
      const beacons = await this.db
        .select()
        .from(vBeacons)
        .where(eq(vBeacons.isActive, true))
        .orderBy(desc(vBeacons.timestamp));

      return {
        success: true,
        message: 'Beacons retrieved successfully',
        data: beacons,
      };
    } catch (error) {
      console.error('Error in getAllActiveBeacons:', error);
      return {
        success: false,
        message: 'Internal server error',
        data: null,
      };
    }
  }

  async deactivateBeacon(beaconData: {
    uuid: string;
    major: string;
    minor: string;
  }) {
    // Leaky abstraction for allowing latitude and longitude to be passed
    const validation = BeaconValidator.validateBeacon({
      ...beaconData,
      latitude: 0,
      longitude: 0,
    });
    if (!validation.isValid) {
      return { success: false, message: validation.message };
    }

    try {
      // Check for existing beacon
      const existing = await this.db
        .select()
        .from(vBeacons)
        .where(
          and(
            eq(vBeacons.uuid, beaconData.uuid.toLowerCase()),
            eq(vBeacons.major, beaconData.major),
            eq(vBeacons.minor, beaconData.minor)
          )
        );
      if (existing.length === 0) {
        return { success: false, message: 'Beacon not found' };
      }

      // Deactivate beacon
      await this.db
        .update(vBeacons)
        .set({ isActive: false })
        .where(
          and(
            eq(vBeacons.uuid, beaconData.uuid.toLowerCase()),
            eq(vBeacons.major, beaconData.major),
            eq(vBeacons.minor, beaconData.minor)
          )
        );

      return { success: true, message: 'Beacon deactivated successfully' };
    } catch (error) {
      console.error('Error in deactivateBeacon:', error);
      return { success: false, message: 'Internal server error' };
    }
  }
}

