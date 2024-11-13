"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const beaconRoutes_1 = require("./routes/beaconRoutes");
const beaconService_1 = require("./services/beaconService");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Database connection
const client = (0, postgres_1.default)(config_1.config.databaseUrl);
const db = (0, postgres_js_1.drizzle)(client);
// Services
const beaconService = new beaconService_1.BeaconService(db);
// Routes
app.use('/api', (0, beaconRoutes_1.createBeaconRouter)(beaconService));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        data: null,
    });
});
exports.default = app;
