let map = L.map("map").setView([51.505, -0.09], 13);
const token =
  "pk.eyJ1IjoiY3lhbm5yb2d1ZSIsImEiOiJja3V4MDRscTYwbDVrMm9tcjZzZXFidWRkIn0.xMIu6n8qk8AA45DyRYDoaA";

L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: token,
  }
).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
