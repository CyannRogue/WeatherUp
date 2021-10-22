const dayEl = document.querySelector("#date");
const cityEl = document.getElementById("city");
const countryEL = document.getElementById("country");
const tempEl = document.getElementsByClassName("temp");
const weatherFo = document.querySelector(".week");
const currentWeatherData2 = document.getElementById("current-weather-items");
const currentEl = document.querySelector(".today");

const locateAndWeather = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // weather Data
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        showWeatherData(data);
      });

    //Maps data
    const coords = [latitude, longitude];
    let map = L.map("map").setView(coords, 13);

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
    let marker = L.marker(coords).addTo(map);

    map.on("click", function (mapEvent) {
      map.removeLayer(marker);
      const { lat, lng } = mapEvent.latlng;
      marker = L.marker([lat, lng], { draggable: true }).addTo(map);

      map.addLayer(marker);
    });
  });
};

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();

  //add time element
  /*
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 3 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    
    timeEL.innerHTML = `${hoursIn12HrFormat}:${minutes}:<span id="am=pm">${ampm}</span>`;
    */

  dayEl.innerHTML = `${days[day]}, ${date}, ${months[month]}`;
});

///////////////////////////////////////

// Weather data
function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;
  console.log(data);
  cityEl.innerHTML = data.timezone;
  countryEL.innerHTML = data.lat + "N " + data.lon + "E";

  currentWeatherData2.innerHTML = ` <div class="weather-data2">
  <div>Humidity</div>
  <div>${humidity}</div>
</div>
<div class="weather-data2">
  <div>Pressure</div>
  <div>${pressure}</div>
</div>
</div>
<div class="weather-data2">
  <div>Wind Speed</div>
  <div>${wind_speed}</div>
</div>
<div class="weather-data2">
  <div>Sunrise</div>
  <div>${window.moment(sunrise * 1000).format("HH:MM")}</div>
</div>
<div class="weather-data2">
  <div>Sunset</div>
  <div>${window.moment(sunset * 1000).format("HH:MM")}</div>
</div>
</div>`;
  let otherDayforcast = "";
  data.daily.forEach((day, idx) => {
    if ((idx = 0)) {
      currentEl.innerHTML = ` 
       
      img src="https://openweathermap.org/img/wn/${day.weather[0]}@4x.png" alt="weather icon" class="w-icon">
      <div class="day">Monday</div>
      <div class="day">N - ${day.temp.night}</div>
      <div class="day">D - ${day.temp.day}</div>
    
        `;
    } else {
      otherDayforcast += `<div class="forecast">
      <img src="https://openweathermap.org/img/wn/${
        day.weather[0]
      }@2x.png" class="weather-icon" />
      <div class="temp-min">N - ${day.temp.night}&#176</div>
      <div class="temp-min">D - ${day.temp.day}&#176</div>
      <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
    </div>
        
        
        `;
    }
  });

  weatherFo.innerHTML = otherDayforcast;
}
