// update the UI
const cityEl = document.querySelector("#city");
const dayEl = document.querySelector("#day");
const monthEl = document.querySelector(".month");
const dateEl = document.querySelector(".date");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const year = time.getFullYear();
  // const hour = time.getHours();
  // const hoursIn12HrF = hour >= 13 ? hour % 12 : hour;
  // const minutes = time.getMinutes();
  // const ampm = hour >= 12 ? "PM" : "AM";

  // timeEL.innerHTML =
  //   hoursIn12HrF + ":" + minutes + " " + `<span id="am-pm">${ampm}</span>`;

  // dateEL.innerHTML =
  //   days[day] + ", " + date + " " + months[month] + " " + year;

  dayEl.innerHTML = `${days[day]}`;
  dateEl.innerHTML = `${date}`;
  monthEl.innerHTML = `${months[month]}`;
}, 1000);

// const uiContainer = data => {
//   return (cityEl.innerHTML = `${data.name}`);
// };

class UI {
  constructor() {
    this.uiContainer = document.getElementById("content");
    this.cityEl = document.querySelector("#city");
    this.autoLocated = document.querySelector(".mapLocator");
  }
  populateUI(data) {
    this.uiContainer.innerHTML = `<div class="weather">
    <div class="temp-container">
      <div class="temp">${data.main.temp}&degc</div>
      <div class="line"></div>
    </div>

    <div class="condition">
      <img src="icons/sun.svg" alt="icon" class="weather-icon" />
      <div class="title">${data.weather[0].description}</div>
      <div class="range">${data.main.temp_max}&degc / ${data.main.temp_min}&degc</div>
    </div>`;
    this.cityEl.innerHTML = `${data.name}`;
  }
  mapUI(data) {
    const { lat } = data.coord;
    const { lon } = data.coord;

    let container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
    const coordinates = [lat, lon];
    let map = L.map("map").setView(coordinates, 13);

    //Map layout
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
    let marker = L.marker(coordinates).addTo(map);
    this.autoLocated.innerHTML = `<img id="locator" src="/icons/Locator.svg" />`;
    map.on("click", function (mapEvent) {
      map.removeLayer(marker);
      const { lat, lng } = mapEvent.latlng;

      console.log(lat, lng);
      marker = L.marker([lat, lng], { draggable: true }).addTo(map);
      map.addLayer(marker);
      return lat, lng;
    });
  }
}
