// modules/api.js

// Convert "YYYYMMDDhhmmss" → JS Date
function parseEEWTime(ts) {
  const y = ts.slice(0, 4);
  const m = ts.slice(4, 6);
  const d = ts.slice(6, 8);
  const h = ts.slice(8, 10);
  const min = ts.slice(10, 12);
  const s = ts.slice(12, 14);
  return new Date(`${y}-${m}-${d}T${h}:${min}:${s}+09:00`);
}

// Fetch latest EEW quake (accurate origin time)
async function fetchLatestQuake() {
  try {
    // 1) Get latest EEW timestamp
    const latestRes = await fetch("https://www.kmoni.bosai.go.jp/webservice/server/pros/latest.json");
    const latest = await latestRes.json();

    const ts = latest.latest_time; // "YYYYMMDDhhmmss"

    // 2) Fetch EEW hypo JSON
    const eewRes = await fetch(`https://www.kmoni.bosai.go.jp/webservice/hypo/eew/${ts}.json`);
    const data = await eewRes.json();

    const r = data.result;

    if (!r || r.message === "データがありません") return null;

    return {
      lat: parseFloat(r.latitude),
      lon: parseFloat(r.longitude),
      shindo: r.calcintensity,
      regionName: r.region_name,
      originTime: r.origin_time, // still "YYYYMMDDhhmmss"
      originDate: parseEEWTime(r.origin_time),
      mag: r.magunitude
    };

  } catch (err) {
    console.error("EEW API error:", err);
    return null;
  }
}
