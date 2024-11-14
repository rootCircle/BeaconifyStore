"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBeaconRouter = createBeaconRouter;
// src/routes/beaconRoutes.ts
const express_1 = require("express");
function createBeaconRouter(beaconService) {
    const router = (0, express_1.Router)();
    router.post('/pollVBeacons', async (req, res) => {
        const result = await beaconService.pollBeacon(req.body);
        res.json(result);
    });
    router.get('/getAllVBeacons', async (_req, res) => {
        const result = await beaconService.getAllActiveBeacons();
        res.json(result);
    });
    router.post('/deactivateVBeacon', async (req, res) => {
        const result = await beaconService.deactivateBeacon(req.body);
        res.json(result);
    });
    return router;
}
