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

  // user location: Tokyo for now
  const userLocation = { lat: 35.68, lon: 139.76 };

  updateEpicenter(quake.lat, quake.lon, quake.shindo, quake.regionName);
  startWaveCountdown(quake, userLocation);
  triggerAlarm(quake);
}

function initApp() {
  initMap();
  initClock();

  // poll every half a second for now
  pollQuakes();
  setInterval(pollQuakes, 500);
}

document.addEventListener("DOMContentLoaded", initApp);
