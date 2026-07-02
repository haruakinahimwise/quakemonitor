// modules/map.js

let map;

function initMap() {
  // Create map centered on Japan
  map = L.map("map").setView([36.0, 138.0], 5);

  // Base map tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  // Load Japan GeoJSON
  fetch("assets/japan.geojson")
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: {
          color: "#374151",
          weight: 1,
          fillOpacity: 0.05
        }
      }).addTo(map);
    })
    .catch(err => {
      console.error("GeoJSON load error:", err);
    });
}
