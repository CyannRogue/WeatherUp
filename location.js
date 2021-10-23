class Fetch {
  async getCurrent(input) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);

    const { lat } = data.coord;
    const { lon } = data.coord;

    const coordinates = [lat, lon];

    return data;
  }
}

const locate = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    return coords;
  });
  return coords;
};
