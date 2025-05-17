
import express from 'express';
import { UAParser } from 'ua-parser-js';
import axios from 'axios';
import { Click } from '../models/clickSchema.model.js'; 
import { FALLBACK_URL, PLAY_STORE_URL, APP_STORE_URL } from '../constants.js'; 

const router = express.Router();


const isPublicIp = (ip) => {
  if (!ip) return false;
  
  if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') return false;


  const parts = ip.split('.');
  if (parts.length === 4) {
    const firstOctet = parseInt(parts[0], 10);
    const secondOctet = parseInt(parts[1], 10);
    if (firstOctet === 10 ||
        (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) ||
        (firstOctet === 192 && secondOctet === 168)) {
      return false;
    }
  }
 
  return true;
};

router.get('/', async (req, res) => {
  try {
    const userAgentString = req.headers['user-agent'];
    const ua = new UAParser(userAgentString).getResult();

    
    let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (clientIp && typeof clientIp === 'string') {
      
      const ips = clientIp.split(',');
      clientIp = ips[0].trim();
    }
    
    if (clientIp && clientIp.startsWith('::ffff:')) {
      clientIp = clientIp.substring(7);
    }

    const timestamp = new Date().toISOString();
    const referrer = req.headers.referer || "Direct";

    console.log(`[TRACKING] Request from IP: ${clientIp}, User-Agent: ${userAgentString}`);

    let city = "Unknown", region = "Unknown";

    if (clientIp && isPublicIp(clientIp)) {
      try {
        console.log(`[GEO-IP] Querying ipapi.co for IP: ${clientIp}`);
        const geoResponse = await axios.get(`https://ipapi.co/${clientIp}/json/`);
        console.log(`[GEO-IP] ipapi.co response for ${clientIp}:`, geoResponse.data);

        if (geoResponse.data && !geoResponse.data.error) {
          city = geoResponse.data.city || "Unknown";
          region = geoResponse.data.region || "Unknown";
        } else if (geoResponse.data && geoResponse.data.reason) {
          console.warn(`[GEO-IP] API error from ipapi.co for IP ${clientIp}: ${geoResponse.data.reason}`);
        } else {
          console.warn(`[GEO-IP] ipapi.co returned an unexpected response or no location data for IP ${clientIp}.`);
        }
      } catch (geoError) {
        console.error(`[GEO-IP] Failed to fetch location for IP ${clientIp} from ipapi.co: ${geoError.message}`);
        if (geoError.response) {
          console.error(`[GEO-IP] ipapi.co error status: ${geoError.response.status}`);
          console.error(`[GEO-IP] ipapi.co error data:`, geoError.response.data);
        }
      }
    } else {
      console.log(`[GEO-IP] Skipped geolocation for non-public or undefined IP: ${clientIp}`);
    }

    let os = ua.os.name?.toLowerCase() || '';
    let redirectUrl = FALLBACK_URL;

    if (os.includes("android")) {
      redirectUrl = PLAY_STORE_URL;
    } else if (os.includes("ios")) {
      redirectUrl = APP_STORE_URL;
    }

    await Click.create({
      timestamp,
      ip: clientIp || "Unknown", 
      city,
      region,
      deviceType: ua.device.type || "desktop",
      os: ua.os.name || "Unknown",
      deviceVendor: ua.device.vendor || "Unknown",
      referrer,
      redirectedTo: redirectUrl,
    });

    return res.redirect(302, redirectUrl);
  } catch (error) {
    console.error("[TRACKING] Overall tracking error:", error.message, error.stack);
    return res.redirect(FALLBACK_URL);
  }
});

export default router;