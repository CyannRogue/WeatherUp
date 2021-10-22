class UI {
  constructor() {
    this.cityEl = document.getElementById("city");
    this.dayEl = document.getElementsByClassName("day");
    this.monthEl = document.getElementsByClassName("month");
    this.dateEl = document.getElementsByClassName("date");
  }

  populateUI(data) {
    //

    //

    this.cityEl.innerHTML = `${data.name}`;
  }
}
