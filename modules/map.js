// modules/map.js

let map;

function initMap() {
  map = L.map("map").setView([36.0, 138.0], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  loadJapanGeoJSON();
}

function loadJapanGeoJSON() {
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
    .catch(err => console.error("GeoJSON load error:", err));
}
