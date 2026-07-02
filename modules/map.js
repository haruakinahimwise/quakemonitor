// modules/map.js

let map;
let epicenterMarker;
let japanLayer;

// Initialize the map
function initMap() {
  map = L.map("map").setView([36.0, 138.0], 5); // Japan center

  // Base map tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Load Japan prefecture GeoJSON
  loadJapanGeoJSON();   // ← THIS loads your 30k-line file
}

// Load Japan GeoJSON from /assets
function loadJapanGeoJSON() {
  fetch("assets/japan.geojson")
    .then(res => res.json())
    .then(data => {
      // Remove old layer if reloading
      if (japanLayer) {
        map.removeLayer(japanLayer);
      }

      japanLayer = L.geoJSON(data, {
        style: {
          color: "#374151",      // border color
          weight: 1,             // border thickness
          fillOpacity: 0.05      // faint fill
        }
      }).addTo(map);
    })
    .catch(err => {
      console.error("GeoJSON load error:", err);
      alert("Failed to load Japan map (GeoJSON). Check assets/japan.geojson");
    });
}

// Update epicenter marker + popup
function updateEpicenter(lat, lon, shindo, regionName) {
  if (!map) return;

  // Zoom to quake
  map.setView([lat, lon], 7);

  // Remove old marker
  if (epicenterMarker) {
    map.removeLayer(epicenterMarker);
  }

  // Create new marker
  epicenterMarker = L.circleMarker([lat, lon], {
    radius: 12,
    color: shindoColor(shindo),
    fillColor: shindoColor(shindo),
    fillOpacity: 0.8
  }).addTo(map);

  // Popup
  epicenterMarker.bindPopup(
    `震度: ${shindo}<br>${regionName || "不明"}`
  ).openPopup();
}
