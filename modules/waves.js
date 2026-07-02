// modules/waves.js

let waveCircle;
let waveTimer;

// Draw expanding wave on the map
function startWaveVisual(lat, lon) {
  // Remove old wave if exists
  if (waveCircle) {
    map.removeLayer(waveCircle);
  }

  let radius = 1000; // start small (meters)

  waveCircle = L.circle([lat, lon], {
    radius: radius,
    color: "#3b82f6",
    weight: 2,
    fillOpacity: 0.05
  }).addTo(map);

  // Animate the wave expanding
  waveTimer = setInterval(() => {
    radius += 5000; // expand 5km per tick
    waveCircle.setRadius(radius);

    // Stop after it covers Japan
    if (radius > 2000000) { // 2000km
      clearInterval(waveTimer);
    }
  }, 100); // update every 0.1s
}

// Connect wave to quake detection
function startWaveCountdown(quake, userLocation) {
  // Start visual wave
  startWaveVisual(quake.lat, quake.lon);

  // Your existing countdown code stays here
  const origin = new Date(quake.originTime).getTime();
  const dist = distanceKm(
    { lat: quake.lat, lon: quake.lon },
    userLocation
  );

  const vP = 6;   // km/s
  const vS = 3.5; // km/s

  const pArrival = origin + (dist / vP) * 1000;
  const sArrival = origin + (dist / vS) * 1000;

  const el = document.getElementById("countdown");

  const timer = setInterval(() => {
    const now = Date.now();
    const pLeft = Math.max(0, Math.round((pArrival - now) / 1000));
    const sLeft = Math.max(0, Math.round((sArrival - now) / 1000));

    el.textContent =
      `P波到達まで: ${pLeft} 秒 / S波到達まで: ${sLeft} 秒`;

    if (pLeft === 0 && sLeft === 0) {
      clearInterval(timer);
    }
  }, 500);
}
