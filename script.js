///////////////////////////////////

const ft = new Fetch();
const ui = new UI();

//page autoLoad

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
