// ═══════════════════════════════════════════════════════
// Samsung Signage CMS — REST API Server
// Run: node rest-server.js
// Endpoints available at http://localhost:3000
// ═══════════════════════════════════════════════════════

const http = require('http');
const url  = require('url');

const PORT = 3000;

// ────────────────────────────────────────────────────────
// MOCK DATABASE
// ────────────────────────────────────────────────────────
const DB = {
  screenConfig: {
    screenId: "lobby-01",
    name: "Main Lobby Display",
    resolution: { width: 1920, height: 1080 },
    orientation: "landscape",
    brightness: 80,
    contrast: 70,
    colorTemp: 6500,
    firmware: "4.2.1.0",
    model: "QM43R",
    serialNumber: "ZNKR3CQTB01824K",
    macAddress: "E8:E5:D6:A1:B2:C3",
    ipAddress: "192.168.1.45",
    subnetMask: "255.255.255.0",
    gateway: "192.168.1.1",
    dns: "8.8.8.8",
    lastSync: "2026-03-02T09:00:00Z",
    uptime: 86400,
    storageUsed: 4096,
    storageTotal: 16384,
    cpuUsage: 22,
    memUsage: 45,
    temperature: 38,
    location: { building: "HQ", floor: 1, zone: "Lobby" },
    tags: ["public", "lobby", "high-traffic"],
    contentGroup: "corporate",
    timezone: "America/New_York",
    language: "en-US",
    autoRestart: true,
    scheduledRestart: "03:00"
  },

  playlist: {
    playlistId: "pl-main-001",
    name: "Q1 Corporate Content",
    version: 12,
    createdAt: "2026-01-15T08:00:00Z",
    updatedAt: "2026-03-01T14:30:00Z",
    createdBy: "admin@corp.com",
    approvedBy: "manager@corp.com",
    status: "active",
    totalDuration: 180,
    loopCount: 0,
    transitionEffect: "fade",
    transitionDuration: 500,
    items: [
      {
        id: "m1", title: "Welcome Q1 2026",
        url: "https://cdn.example.com/welcome.mp4",
        thumbnailUrl: "https://cdn.example.com/t1.jpg",
        duration: 30, type: "video", resolution: "1920x1080",
        fileSize: 52428800, codec: "h264", bitrate: 4000,
        checksum: "abc123def456", uploadedAt: "2026-01-10",
        tags: ["welcome"], approvalStatus: "approved"
      },
      {
        id: "m2", title: "Product Launch Promo",
        url: "https://cdn.example.com/promo.mp4",
        thumbnailUrl: "https://cdn.example.com/t2.jpg",
        duration: 45, type: "video", resolution: "1920x1080",
        fileSize: 78643200, codec: "h264", bitrate: 6000,
        checksum: "def456ghi789", uploadedAt: "2026-02-01",
        tags: ["product", "promo"], approvalStatus: "approved"
      },
      {
        id: "m3", title: "Company Values",
        url: "https://cdn.example.com/values.jpg",
        thumbnailUrl: "https://cdn.example.com/t3.jpg",
        duration: 15, type: "image", resolution: "1920x1080",
        fileSize: 2097152, codec: null, bitrate: null,
        checksum: "ghi789jkl012", uploadedAt: "2026-01-05",
        tags: ["culture"], approvalStatus: "approved"
      }
    ],
    analytics: { totalViews: 1240, avgPlaytime: 158, completionRate: 0.87 }
  },

  weather: {
    stationId: "WX-NYC-001",
    provider: "OpenWeatherMap",
    lastFetched: new Date().toISOString(),
    city: "New York",
    country: "US",
    lat: 40.7128,
    lon: -74.006,
    timezone: "America/New_York",
    current: {
      temp: 12, feelsLike: 9, humidity: 65,
      pressure: 1015, windSpeed: 18, windDir: 245,
      windGust: 28, visibility: 10000, cloudCover: 40,
      uvIndex: 3, dewPoint: 5, condition: "Partly Cloudy",
      icon: "02d", sunrise: "06:23", sunset: "18:12"
    },
    hourlyForecast: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      temp: 10 + Math.round(Math.sin(i / 4) * 4),
      condition: "Clear", precip: 0, humidity: 60, windSpeed: 15
    })),
    dailyForecast: Array.from({ length: 7 }, (_, i) => ({
      day: i, high: 13 + i, low: 5 + i, condition: "Partly Cloudy", precipitation: 0
    })),
    airQuality: { aqi: 42, pm25: 8, pm10: 15, o3: 60, no2: 20 },
    alerts: []
  },

  ads: {
    campaignId: "camp-spring-2026",
    name: "Spring 2026 Campaign",
    advertiser: "Corp Internal",
    startDate: "2026-03-01",
    endDate: "2026-05-31",
    budget: 50000,
    spent: 12400,
    targetImpressions: 100000,
    actualImpressions: 24800,
    cpm: 2.5,
    clickThroughRate: 0.042,
    conversionRate: 0.008,
    demographics: { ageGroups: ["25-34", "35-44"], gender: "all" },
    placements: [
      {
        placementId: "p1", zone: "sidebar", duration: 10, priority: 1,
        imageUrl: "https://cdn.example.com/ad1.jpg", clickUrl: "#",
        impressions: 12400, clicks: 521, ctr: 0.042,
        format: "banner", width: 300, height: 250
      },
      {
        placementId: "p2", zone: "sidebar", duration: 10, priority: 2,
        imageUrl: "https://cdn.example.com/ad2.jpg", clickUrl: "#",
        impressions: 12400, clicks: 390, ctr: 0.031,
        format: "banner", width: 300, height: 250
      }
    ],
    frequency: { maxPerHour: 6, minInterval: 600 },
    reporting: { lastReport: "2026-03-01", nextReport: "2026-04-01" },
    billing: { invoiceId: "INV-2026-0301", status: "pending", amount: 1240 }
  },

  schedule: {
    scheduleId: "sch-lobby-march",
    screenId: "lobby-01",
    month: "2026-03",
    timezone: "America/New_York",
    version: 3,
    approvedBy: "scheduler@corp.com",
    approvedAt: "2026-02-28T16:00:00Z",
    entries: Array.from({ length: 30 }, (_, i) => ({
      date: `2026-03-${String(i + 1).padStart(2, '0')}`,
      timeSlots: [
        { start: "07:00", end: "09:00", playlist: "pl-morning",   priority: 1, override: false },
        { start: "09:00", end: "18:00", playlist: "pl-main-001",  priority: 1, override: false },
        { start: "18:00", end: "22:00", playlist: "pl-evening",   priority: 1, override: false }
      ]
    })),
    exceptions: [],
    holidays: ["2026-03-15"],
    metadata: { totalSlots: 90, activeSlots: 90, nextChange: "18:00" }
  },

  ticker: {
    feedId: "feed-corp-001",
    name: "Corporate Ticker",
    source: "internal-cms",
    refreshInterval: 300,
    maxMessages: 20,
    priority: 1,
    style: { fontSize: 14, color: "#FFFFFF", bgColor: "#1428A0", speed: "medium", fontFamily: "Arial" },
    messages: [
      {
        id: "t1", text: "Welcome to Samsung HQ — Innovation Hub",
        priority: 1, startDate: "2026-03-01", endDate: "2026-03-31",
        active: true, clicks: 0, impressions: 4800,
        author: "cms-admin", language: "en", category: "corporate"
      },
      {
        id: "t2", text: "Q1 Results: Record Revenue Announced",
        priority: 2, startDate: "2026-03-01", endDate: "2026-03-15",
        active: true, clicks: 0, impressions: 2100,
        author: "comms-team", language: "en", category: "finance"
      },
      {
        id: "t3", text: "QLED 8K lineup launches March 15 — Join the event",
        priority: 3, startDate: "2026-03-01", endDate: "2026-03-14",
        active: true, clicks: 0, impressions: 1900,
        author: "marketing", language: "en", category: "product"
      }
    ],
    analytics: { totalImpressions: 8800, avgReadTime: 4.2, clickRate: 0.001 },
    settings: { loop: true, separator: "  ●  ", transitionEffect: "scroll" }
  }
};

// ────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────

/** Simulated network delay (ms) */
function delay(min, max) {
  return new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min + 1)) + min));
}

/** Calculate payload size */
function payloadKB(obj) {
  return (Buffer.byteLength(JSON.stringify(obj), 'utf8') / 1024).toFixed(2);
}

/** Build JSON response with CORS headers */
function sendJSON(res, statusCode, data, extraHeaders = {}) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Payload-KB': payloadKB(data),
    'X-Timestamp':  new Date().toISOString(),
    ...extraHeaders
  });
  res.end(body);
}

/** Send 404 */
function notFound(res, path) {
  sendJSON(res, 404, { error: 'Not Found', path, message: `No endpoint matched: ${path}` });
}

/** Send 405 */
function methodNotAllowed(res, method, path) {
  sendJSON(res, 405, { error: 'Method Not Allowed', method, path });
}

/** Parse query params */
function parseQuery(reqUrl) {
  return Object.fromEntries(new url.URL(reqUrl, `http://localhost:${PORT}`).searchParams);
}

// ────────────────────────────────────────────────────────
// ROUTE HANDLERS
// ────────────────────────────────────────────────────────

const routes = {

  // ── GET /api/screen/config ──────────────────────────
  'GET /api/screen/config': async (req, res) => {
    await delay(180, 290);
    const t0 = Date.now();
    const params = parseQuery(req.url);
    const screenId = params.screenId || 'lobby-01';

    // In a real system you'd look up by screenId
    const data = { ...DB.screenConfig, screenId, _requestedAt: new Date().toISOString() };

    sendJSON(res, 200, data, {
      'X-Resolver': 'screen-config',
      'X-Resolve-Ms': Date.now() - t0,
      'X-Fields-Total': '28',
      'X-Fields-Typically-Used': '3'   // screenId, resolution, orientation
    });

    log('GET', '/api/screen/config', payloadKB(data));
  },

  // ── GET /api/media/playlist ─────────────────────────
  'GET /api/media/playlist': async (req, res) => {
    await delay(220, 390);
    const t0 = Date.now();
    const data = { ...DB.playlist, _requestedAt: new Date().toISOString() };

    sendJSON(res, 200, data, {
      'X-Resolver': 'media-playlist',
      'X-Resolve-Ms': Date.now() - t0,
      'X-Fields-Total': '24',
      'X-Fields-Typically-Used': '3'   // items[].title, url, duration
    });

    log('GET', '/api/media/playlist', payloadKB(data));
  },

  // ── GET /api/weather/current ────────────────────────
  'GET /api/weather/current': async (req, res) => {
    await delay(140, 260);
    const t0 = Date.now();

    // Slightly randomize temp to simulate live data
    const data = {
      ...DB.weather,
      current: { ...DB.weather.current, temp: 10 + Math.round(Math.random() * 8) },
      lastFetched: new Date().toISOString(),
      _requestedAt: new Date().toISOString()
    };

    sendJSON(res, 200, data, {
      'X-Resolver': 'weather',
      'X-Resolve-Ms': Date.now() - t0,
      'X-Fields-Total': '50',
      'X-Fields-Typically-Used': '3'   // city, current.temp, current.condition
    });

    log('GET', '/api/weather/current', payloadKB(data));
  },

  // ── GET /api/ads/campaigns ──────────────────────────
  'GET /api/ads/campaigns': async (req, res) => {
    await delay(190, 320);
    const t0 = Date.now();
    const data = { ...DB.ads, _requestedAt: new Date().toISOString() };

    sendJSON(res, 200, data, {
      'X-Resolver': 'ads-campaigns',
      'X-Resolve-Ms': Date.now() - t0,
      'X-Fields-Total': '26',
      'X-Fields-Typically-Used': '2'   // placements[0].imageUrl, duration
    });

    log('GET', '/api/ads/campaigns', payloadKB(data));
  },

  // ── GET /api/schedule/current ───────────────────────
  'GET /api/schedule/current': async (req, res) => {
    await delay(210, 350);
    const t0 = Date.now();
    const params = parseQuery(req.url);
    const screenId = params.screenId || 'lobby-01';
    const data = { ...DB.schedule, screenId, _requestedAt: new Date().toISOString() };

    sendJSON(res, 200, data, {
      'X-Resolver': 'schedule',
      'X-Resolve-Ms': Date.now() - t0,
      'X-Fields-Total': '18',
      'X-Fields-Typically-Used': '1',  // entries[today].timeSlots[active].playlist
      'X-Warning': 'Returns 30-day calendar; client only needs todays active slot'
    });

    log('GET', '/api/schedule/current', payloadKB(data));
  },

  // ── GET /api/ticker/feed ────────────────────────────
  'GET /api/ticker/feed': async (req, res) => {
    await delay(155, 245);
    const t0 = Date.now();
    const data = { ...DB.ticker, _requestedAt: new Date().toISOString() };

    sendJSON(res, 200, data, {
      'X-Resolver': 'ticker-feed',
      'X-Resolve-Ms': Date.now() - t0,
      'X-Fields-Total': '20',
      'X-Fields-Typically-Used': '1'   // messages[].text
    });

    log('GET', '/api/ticker/feed', payloadKB(data));
  },

  // ── GET /api/health ─────────────────────────────────
  'GET /api/health': async (req, res) => {
    sendJSON(res, 200, {
      status: 'ok',
      server: 'Samsung Signage CMS REST API',
      version: '1.0.0',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      endpoints: [
        'GET /api/screen/config',
        'GET /api/media/playlist',
        'GET /api/weather/current',
        'GET /api/ads/campaigns',
        'GET /api/schedule/current',
        'GET /api/ticker/feed',
        'GET /api/health'
      ]
    });
  }
};

// ────────────────────────────────────────────────────────
// REQUEST LOGGER
// ────────────────────────────────────────────────────────
const COLORS = {
  reset:  '\x1b[0m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
  red:    '\x1b[31m',
  magenta:'\x1b[35m'
};

function log(method, path, kbSize) {
  const ts   = new Date().toLocaleTimeString();
  const m    = method.padEnd(4);
  const kb   = kbSize ? `${COLORS.yellow}${kbSize} KB${COLORS.reset}` : '';
  console.log(
    `${COLORS.gray}[${ts}]${COLORS.reset} ` +
    `${COLORS.green}${m}${COLORS.reset} ` +
    `${COLORS.cyan}${path}${COLORS.reset} ` +
    `${kb}`
  );
}

// ────────────────────────────────────────────────────────
// SERVER
// ────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const parsedUrl = new url.URL(req.url, `http://localhost:${PORT}`);
  const pathname  = parsedUrl.pathname;

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const routeKey = `${req.method} ${pathname}`;
  const handler  = routes[routeKey];

  if (handler) {
    try {
      await handler(req, res);
    } catch (err) {
      console.error('Handler error:', err);
      sendJSON(res, 500, { error: 'Internal Server Error', message: err.message });
    }
  } else {
    // Check if path exists but method is wrong
    const pathExists = Object.keys(routes).some(r => r.split(' ')[1] === pathname);
    if (pathExists) {
      methodNotAllowed(res, req.method, pathname);
    } else {
      notFound(res, pathname);
    }
  }
});

server.listen(PORT, () => {
  console.log('\n' +
    `${COLORS.cyan}╔══════════════════════════════════════════════╗${COLORS.reset}\n` +
    `${COLORS.cyan}║${COLORS.reset}   Samsung Signage CMS — REST API Server     ${COLORS.cyan}║${COLORS.reset}\n` +
    `${COLORS.cyan}╚══════════════════════════════════════════════╝${COLORS.reset}\n`
  );
  console.log(`${COLORS.green}✓${COLORS.reset} Server running at ${COLORS.cyan}http://localhost:${PORT}${COLORS.reset}\n`);
  console.log(`${COLORS.magenta}Available Endpoints:${COLORS.reset}`);
  console.log(`  ${COLORS.cyan}GET${COLORS.reset}  http://localhost:${PORT}/api/screen/config`);
  console.log(`  ${COLORS.cyan}GET${COLORS.reset}  http://localhost:${PORT}/api/media/playlist`);
  console.log(`  ${COLORS.cyan}GET${COLORS.reset}  http://localhost:${PORT}/api/weather/current`);
  console.log(`  ${COLORS.cyan}GET${COLORS.reset}  http://localhost:${PORT}/api/ads/campaigns`);
  console.log(`  ${COLORS.cyan}GET${COLORS.reset}  http://localhost:${PORT}/api/schedule/current`);
  console.log(`  ${COLORS.cyan}GET${COLORS.reset}  http://localhost:${PORT}/api/ticker/feed`);
  console.log(`  ${COLORS.cyan}GET${COLORS.reset}  http://localhost:${PORT}/api/health\n`);
  console.log(`${COLORS.gray}Waiting for requests...${COLORS.reset}\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n${COLORS.red}✗ Port ${PORT} is already in use. Kill the other process or change PORT.${COLORS.reset}\n`);
  } else {
    console.error(`\n${COLORS.red}Server error:${COLORS.reset}`, err);
  }
  process.exit(1);
});