// modules/map.js

let map;

function initMap() {
  debug("initMap() CALLED");

  try {
    map = L.map("map").setView([36.0, 138.0], 5);
    debug("Leaflet map created");
  } catch (e) {
    debug("Leaflet FAILED to create map", e);
    return;
  }

  debug("Adding tile layer…");

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: "&copy; OpenStreetMap contributors"
  })
  .on("load", () => debug("Tile layer loaded"))
  .on("tileerror", (e) => debug("Tile ERROR", e))
  .addTo(map);

  debug("Loading Japan GeoJSON…");

  fetch("assets/japan.geojson")
    .then(res => {
      debug("GeoJSON response", { status: res.status });
      return res.json();
    })
    .then(data => {
      debug("GeoJSON parsed OK");
      L.geoJSON(data).addTo(map);
      debug("GeoJSON added to map");
    })
    .catch(err => debug("GeoJSON ERROR", err));
}
