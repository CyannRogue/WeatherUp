class Fetch {
  async getCurrent(input) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log(data);

      const { lat } = data.coord;
      const { lon } = data.coord;

      const coordinates = [lat, lon];

      return data;
    } catch (err) {
      alert(`Didn't catch that...
      Please Enter correct spelling
      : ${err}`); // TypeError: failed to fetch
    }
  }
}

// get User Weather automatically
async function getUserWeather() {
  // read IP JSON
  let response = await fetch(`https://api.ipdata.co?api-key=${ipdataKey}`);
  let userIP = await response.json();
  // console.log(userIP);
  // read Weather
  let WeatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userIP.city}&units=metric&appid=${API_KEY}`
  );
  let data = await WeatherResponse.json();
  console.log(data);
  // console.log(data.weather[0].icon);
  // load ui
  uiContainer2.innerHTML = `<div class="weather">
  <div class="temp-container">
    <div class="temp">${data.main.temp}&degc</div>
    <div class="line"></div>
  </div>

  <div class="condition">
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" class="weather-icon" />
    <div class="title">${data.weather[0].description}</div>
    <div class="range">${data.main.temp_max}&degc / ${data.main.temp_min}&degc</div>
  </div>`;
  cityEl2.innerHTML = `${data.name}`;
  main.innerHTML = ` <div class="forecast">
    <i class="fas fa-tint wIcon"></i>
    <div class="Humidity fontS">${data.main.humidity}</div>
  </div>
  <div class="forecast">
    <i class="fas fa-tachometer-alt wIcon"></i>
    <div class="Pressure fontS">${data.main.pressure}</div>
  </div>
  <div class="forecast">
    <i class="fas fa-wind wIcon"></i>
    <div class="WindSpeed fontS">${data.wind.speed}</div>
  </div>`;

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
  autoLocated.innerHTML = `<img id="locator" src="/icons/Locator.svg" />`;
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

async function getForecast() {
  // read IP JSON
  let response = await fetch(`https://api.ipdata.co?api-key=${ipdataKey}`);
  let userIP = await response.json();
  // console.log(userIP);
  let { latitude, longitude } = userIP;
  // console.log(latitude, longitude);

  let weatherForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}`
  );
  let data = await weatherForecast.json();
  // console.log(data);

  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    if ((idx = 0)) {
    } else {
      otherDayForecast += `<div class="forecast">
      <img src="https://openweathermap.org/img/wn/${
        day.weather[0].icon
      }@2x.png" alt="icon" class="weather-icon" />
      <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
    </div>`;
    }
  });
  let weeklyForecast = document.querySelector(".week");

  weeklyForecast.innerHTML = otherDayForecast;
}
