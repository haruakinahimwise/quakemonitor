// Simple helpers

function formatTime(date) {
  return date.toLocaleString("ja-JP", { hour12: false });
}

// Haversine distance in km
function distanceKm(a, b) {
  const R = 6371;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const c =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(c));
}

function shindoColor(shindo) {
  if (shindo >= 6) return "#ef4444";
  if (shindo >= 5) return "#f97316";
  if (shindo >= 4) return "#facc15";
  if (shindo >= 3) return "#22c55e";
  if (shindo >= 2) return "#38bdf8";
  return "#6366f1";
}
