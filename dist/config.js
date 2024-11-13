"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || '',
    inactiveThresholdMinutes: 5,
};
