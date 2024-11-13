// src/validators.ts
export class BeaconValidator {
  static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  static isValidMajorMinor(value: string): boolean {
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 0 && num <= 65535;
  }

  static isValidLatitude(lat: number): boolean {
    return lat >= -90 && lat <= 90;
  }

  static isValidLongitude(lon: number): boolean {
    return lon >= -180 && lon <= 180;
  }

  static validateBeacon(beacon: {
    uuid: string;
    major: string;
    minor: string;
    latitude: number;
    longitude: number;
  }): { isValid: boolean; message: string } {
    if (!this.isValidUUID(beacon.uuid)) {
      return { isValid: false, message: 'Invalid UUID format' };
    }
    if (!this.isValidMajorMinor(beacon.major)) {
      return { isValid: false, message: 'Invalid major value (must be 0-65535)' };
    }
    if (!this.isValidMajorMinor(beacon.minor)) {
      return { isValid: false, message: 'Invalid minor value (must be 0-65535)' };
    }
    if (!this.isValidLatitude(beacon.latitude)) {
      return { isValid: false, message: 'Invalid latitude (-90 to 90)' };
    }
    if (!this.isValidLongitude(beacon.longitude)) {
      return { isValid: false, message: 'Invalid longitude (-180 to 180)' };
    }
    return { isValid: true, message: 'Valid beacon data' };
  }
}

