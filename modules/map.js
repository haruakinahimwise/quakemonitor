let map;
let epicenterMarker;

function initMap() {
  map = L.map("map").setView([36.0, 138.0], 5); // Japan center

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 10,
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);
}

function updateEpicenter(lat, lon, shindo, regionName) {
  if (!map) return;

  map.setView([lat, lon], 7);

  if (epicenterMarker) {
    map.removeLayer(epicenterMarker);
  }

  epicenterMarker = L.circleMarker([lat, lon], {
    radius: 12,
    color: shindoColor(shindo),
    fillColor: shindoColor(shindo),
    fillOpacity: 0.8
  }).addTo(map);

  epicenterMarker.bindPopup(
    `震度: ${shindo}<br>${regionName || "不明"}`
  ).openPopup();
}
