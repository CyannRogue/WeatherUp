const locate = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];
    let map = L.map("map").setView(coords, 13);

    // weatherAPI

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
    let marker = L.marker(coords).addTo(map);

    map.on("click", function (mapEvent) {
      map.removeLayer(marker);
      const { lat, lng } = mapEvent.latlng;
      marker = L.marker([lat, lng], { draggable: true }).addTo(map);
      map.addLayer(marker);
      console.log([lat, lng]);
    });
  });
};

class Fetch {
  async getCurrent(input) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log();
    data;
    return data;
  }
}
