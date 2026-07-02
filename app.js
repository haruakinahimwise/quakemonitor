// app.js

function initClock() {
  const clockEl = document.getElementById("clock");
  const update = () => {
    clockEl.textContent = formatTime(new Date());
  };
  update();
  setInterval(update, 1000);
}

async function pollQuakes() {
  const quake = await fetchLatestQuake();
  if (!quake) return;

  const userLocation = { lat: 35.68, lon: 139.76 }; // Tokyo

  updateEpicenter(quake.lat, quake.lon, quake.shindo, quake.regionName);

  startWaveCountdown(quake, userLocation);

  startWaveVisual(quake.lat, quake.lon, quake.originDate);

  triggerAlarm(quake);
}

function initApp() {
  initMap();
  initClock();

  pollQuakes();
  setInterval(pollQuakes, 2000); // EEW updates fast
}

document.addEventListener("DOMContentLoaded", initApp);
