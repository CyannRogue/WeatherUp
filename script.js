locate();

///////////////////////////////////

const ft = new Fetch();
const ui = new UI();

//events

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");

button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then(data => {
    //call a UI method
    ui.populateUI(data);
    //save
    ui.saveToLS(data);
  });
});
