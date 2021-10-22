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
  }
  populateUI(data) {
    this.uiContainer.innerHTML = `<div class="weather">
    <div class="temp-container">
      <div class="temp">25&degc</div>
      <div class="line"></div>
    </div>

    <div class="condition">
      <img src="/icons/sun.svg" alt="icon" class="weather-icon" />
      <div class="title">${data.weather[0].description}</div>
      <div class="range">${data.main.temp_max}&degc / ${data.main.temp_min}&degc</div>
    </div>`;
    this.cityEl.innerHTML = `${data.name}`;
  }
}
