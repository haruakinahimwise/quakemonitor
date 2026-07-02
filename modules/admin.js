// modules/admin.js

let adminQuakeMarkers = [];

document.addEventListener("DOMContentLoaded", () => {
  const spawnBtn = document.getElementById("adm-spawn");
  const removeBtn = document.getElementById("adm-remove");

  spawnBtn.addEventListener("click", () => {
    const quake = {
      lat: parseFloat(document.getElementById("adm-lat").value),
      lon: parseFloat(document.getElementById("adm-lon").value),
      mag: parseFloat(document.getElementById("adm-mag").value),
      shindo: parseFloat(document.getElementById("adm-shindo").value),
      regionName: document.getElementById("adm-region").value,
      originDate: new Date(),
      originTime: new Date().toLocaleTimeString()
    };

    debug("ADMIN SPAWNED QUAKE", quake);

    // Create marker
    const marker = L.circle([quake.lat, quake.lon], {
      radius: 5000,
      color: "#f00",
      fillColor: "#f00",
      fillOpacity: 0.5
    }).addTo(map).bindPopup(
      `Fake Quake<br>Region: ${quake.regionName}<br>Mag: ${quake.mag}<br>Shindo: ${quake.shindo}`
    );

    // Save marker so we can remove it later
    adminQuakeMarkers.push(marker);

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

  // REMOVE QUAKES BUTTON
  removeBtn.addEventListener("click", () => {
    debug("ADMIN REMOVED ALL QUAKES");

    adminQuakeMarkers.forEach(marker => {
      map.removeLayer(marker);
    });

    adminQuakeMarkers = [];
  });
});
