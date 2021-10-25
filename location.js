class Fetch {
  async getCurrent(input) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);

    const { lat } = data.coord;
    const { lon } = data.coord;

    const coordinates = [lat, lon];

    return data;
  }
}

// get User Weather automatically
async function getUserWeather() {
  // read IP JSON
  let response = await fetch(`https://api.ipdata.co?api-key=${ipdataKey}`);
  let userIP = await response.json();
  console.log(userIP);
  // read Weather
  let WeatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userIP.city}&units=metric&appid=${API_KEY}`
  );
  let data = await WeatherResponse.json();

  // load ui
  uiContainer2.innerHTML = `<div class="weather">
  <div class="temp-container">
    <div class="temp">${data.main.temp}&degc</div>
    <div class="line"></div>
  </div>

  <div class="condition">
    <img src="icons/sun.svg" alt="icon" class="weather-icon" />
    <div class="title">${data.weather[0].description}</div>
    <div class="range">${data.main.temp_max}&degc / ${data.main.temp_min}&degc</div>
  </div>`;
  cityEl2.innerHTML = `${data.name}`;

  //Map update
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

  map.on("click", function (mapEvent) {
    map.removeLayer(marker);
    const { lat, lng } = mapEvent.latlng;

    marker = L.marker([lat, lng], { draggable: true }).addTo(map);
    map.addLayer(marker);
    return lat, lng;
  });
  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
}
