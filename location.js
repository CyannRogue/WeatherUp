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

function mapLocateWeather(lat, lon) {
  var platform = new H.service.Platform({
    apikey: `${geolocationKey}`,
  });
  var service = platform.getSearchService();
  service.reverseGeocode(
    {
      at: `${lat},${lon}`,
    },

    result => {
      result.items.forEach(item => {
        const arr = item.address.label;
        const addressData = arr.split(",");
        console.log(addressData);

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${addressData[1]}&units=metric&appid=${API_KEY}`
        )
          .then(response => response.json())
          .then(data => console.log(data));
        return data;
      });
    },
    alert
  );
}

// Array [ "M3, Zonnebloem, 7925, South Africa" ]
// ​
// 0: "M3, Zonnebloem, 7925, South Africa"
// ​
// length: 1
// ​
// <prototype>: Array []
