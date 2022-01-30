///////////////////////////////////

const ft = new Fetch();
const ui = new UI();
const autoLocated = document.querySelector(".mapLocator");

const uiContainer2 = document.getElementById("content");
const cityEl2 = document.querySelector("#city");

//page autoLoad
// getForecast();
window.onload = () => {
  getUserWeather();
};

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

autoLocated.addEventListener("click", function (e) {
  getUserWeather();
});

setTimeout(function () {
  alert("Press F11 to toggle full screen mode");
}, 10);
