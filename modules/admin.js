// modules/admin.js

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("adm-spawn");

  btn.addEventListener("click", () => {
    const quake = {
      lat: parseFloat(document.getElementById("adm-lat").value),
      lon: parseFloat(document.getElementById("adm-lon").value),
      mag: parseFloat(document.getElementById("adm-mag").value),
      shindo: parseFloat(document.getElementById("adm-shindo").value),
      regionName: document.getElementById("adm-region").value,
      originDate: new Date(),
      originTime: new Date().toLocaleTimeString()
    };

    debug("ADMIN SPAWNED QUAKES", quake);

    // Show marker on map
    L.circle([quake.lat, quake.lon], {
      radius: 5000,
      color: "#f00",
      fillColor: "#f00",
      fillOpacity: 0.5
    }).addTo(map).bindPopup(
      `Fake Quake<br>Region: ${quake.regionName}<br>Mag: ${quake.mag}<br>Shindo: ${quake.shindo}`
    );

    // Trigger wave animation
    if (typeof startWaveVisual === "function") {
      startWaveVisual(quake.lat, quake.lon, quake.originDate);
    }

    // Trigger alarm system
    if (typeof triggerAlarm === "function") {
      triggerAlarm(quake);
    }

    // Update countdown
    if (typeof updateCountdown === "function") {
      updateCountdown(quake);
    }
  });
});
