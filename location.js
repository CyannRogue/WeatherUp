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

async function getIpData() {
  try {
    let success = await fetch(`https://api.ipdata.co?api-key=${ipdataKey}`);
    let ipData = await success.json();
    const {
      ip,
      city,
      region,
      region_code,
      country_name,
      country_code,
      continent_name,
      continent_code,
      latitude,
      longitude,
    } = ipData;

    // console.log(ipData.city);
    // console.log(ipData);
    return [
      ip,
      city,
      region,
      region_code,
      country_name,
      country_code,
      continent_name,
      continent_code,
      latitude,
      longitude,
    ];
  } catch (err) {
    console.error(err);
  }
}

async function autoGetCurrent(clientInfo) {
  try {
    console.log(clientInfo);

    console.log(city);
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);

    const { lat } = data.coord;
    const { lon } = data.coord;

    const coordinates = [lat, lon];

    return data;
  } catch (err) {
    console.error(err);
  }
}
