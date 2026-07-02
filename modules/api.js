// modules/api.js

// Fetch real-time Kyoshin Monitor quake data
async function fetchLatestQuake() {
  try {
    const res = await fetch("https://www.kmoni.bosai.go.jp/webservice/quake.json");
    const data = await res.json();

    if (!data || !data.result) return null;

    return {
      lat: data.result.latitude,
      lon: data.result.longitude,
      shindo: data.result.calcintensity,
      regionName: data.result.region_name,
      originTime: data.result.origin_time
    };

  } catch (err) {
    console.error("Kyoshin Monitor API error:", err);
    return null;
  }
}
