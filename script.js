///////////////////////////////////

const ft = new Fetch();
const ui = new UI();

const uiContainer2 = document.getElementById("content");
const cityEl2 = document.querySelector("#city");

let clientIP = getIpData();

autoGetCurrent(clientIP);

//page autoLoad

// window.onload = () => {
//   console.log("page is fully loaded");
//   autoGetCurrent(ipData).then(data => {
//     console.log(data);
//     uiContainer2.innerHTML = `<div class="weather">
//     <div class="temp-container">
//       <div class="temp">${data.main.temp}&degc</div>
//       <div class="line"></div>
//     </div>

//     <div class="condition">
//       <img src="/icons/sun.svg" alt="icon" class="weather-icon" />
//       <div class="title">${data.weather[0].description}</div>
//       <div class="range">${data.main.temp_max}&degc / ${data.main.temp_min}&degc</div>
//     </div>`;
//     cityEl2.innerHTML = `${data.name}`;

//     //Map update
//     const { lat } = data.coord;
//     const { lon } = data.coord;

//     let container = L.DomUtil.get("map");
//     if (container != null) {
//       container._leaflet_id = null;
//     }
//     const coordinates = [lat, lon];
//     let map = L.map("map").setView(coordinates, 13);

//     //Map layout
//     L.tileLayer(
//       `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${token}`,
//       {
//         attribution:
//           'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: "mapbox/streets-v11",
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: token,
//       }
//     ).addTo(map);
//     let marker = L.marker(coordinates).addTo(map);

//     map.on("click", function (mapEvent) {
//       map.removeLayer(marker);
//       const { lat, lng } = mapEvent.latlng;

//       console.log(lat, lng);
//       marker = L.marker([lat, lng], { draggable: true }).addTo(map);
//       map.addLayer(marker);
//       return lat, lng;
//     });
//   });
// };

//events

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");

button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then(data => {
    //call a UI method
    ui.populateUI(data);
    ui.mapUI(data);

    //save
    // ui.saveToLS(data);
  });
});

search.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const currentVal = search.value;

    ft.getCurrent(currentVal).then(data => {
      //call a UI method
      ui.populateUI(data);
      ui.mapUI(data);

      //save
      // ui.saveToLS(data);
    });
  }
});
