// modules/waves.js

let waveCircle;
let waveTimer;

// Draw expanding P-wave based on real origin time
function startWaveVisual(lat, lon, originDate) {
  if (waveCircle) {
    map.removeLayer(waveCircle);
  }

  waveCircle = L.circle([lat, lon], {
    radius: 0,
    color: "#3b82f6",
    weight: 2,
    fillOpacity: 0.05
  }).addTo(map);

  const vP = 6; // km/s

  waveTimer = setInterval(() => {
    const now = Date.now();
    const seconds = (now - originDate.getTime()) / 1000;

    if (seconds < 0) return; // EEW sometimes arrives early

    const radiusMeters = seconds * vP * 1000;
    waveCircle.setRadius(radiusMeters);

    if (seconds > 300) { // stop after 10 minutes
      clearInterval(waveTimer);
    }
  }, 100);
}

// Distance formula (km)
function distanceKm(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lon - a.lon) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;

  const x = Math.sin(dLat/2)**2 +
            Math.sin(dLon/2)**2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

// Countdown using real origin time
function startWaveCountdown(quake, userLocation) {
  const origin = quake.originDate;
  const dist = distanceKm(
    { lat: quake.lat, lon: quake.lon },
    userLocation
  );

  const vP = 6;
  const vS = 3.5;

  const pArrival = origin.getTime() + (dist / vP) * 1000;
  const sArrival = origin.getTime() + (dist / vS) * 1000;

  const el = document.getElementById("countdown");

  const timer = setInterval(() => {
    const now = Date.now();
    const pLeft = Math.max(0, Math.round((pArrival - now) / 1000));
    const sLeft = Math.max(0, Math.round((sArrival - now) / 1000));

    el.textContent =
      `P波: ${pLeft} 秒 / S波: ${sLeft} 秒`;

    if (pLeft === 0 && sLeft === 0) {
      clearInterval(timer);
    }
  }, 500);
}
