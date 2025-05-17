import express from 'express';
import { UAParser } from 'ua-parser-js';
import axios from 'axios';
import { Click } from '../models/clickSchema.model.js';
import {FALLBACK_URL, PLAY_STORE_URL,APP_STORE_URL} from '../constants.js'

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const ua = new UAParser(req.headers['user-agent']).getResult();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const timestamp = new Date().toISOString();
    const referrer = req.headers.referer || "Direct";

    // Default location
    let city = "Unknown", region = "Unknown";

    try {
      const loc = await axios.get(`https://ipapi.co/${ip}/json/`);
      city = loc.data.city || "Unknown";
      region = loc.data.region || "Unknown";
    } catch (err) {
      console.log("Failed to get location:", err.message);
    }

    let os = ua.os.name?.toLowerCase() || '';
    let redirectUrl = FALLBACK_URL;

    if (os.includes("android")) redirectUrl = PLAY_STORE_URL;
    else if (os.includes("ios")) redirectUrl = APP_STORE_URL;

    await Click.create({
      timestamp,
      ip,
      city,
      region,
      deviceType: ua.device.type || "desktop",
      os: ua.os.name || "Unknown",
      deviceVendor: ua.device.vendor || "Unknown",
      referrer,
      redirectedTo: redirectUrl
    });

    return res.redirect(302, redirectUrl);
  } catch (error) {
    console.error("Tracking error:", error.message);
    return res.redirect(FALLBACK_URL);
  }
});

export default router;
