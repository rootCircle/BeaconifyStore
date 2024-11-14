// src/routes/beaconRoutes.ts
import { Router } from 'express';
import { BeaconService } from '../services/beaconService';

export function createBeaconRouter(beaconService: BeaconService) {
  const router = Router();

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