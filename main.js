const radioStations = document.querySelector(".radio-station-content");
const radioFooter = document.querySelector("#radios-footer");

fetch("https://teclead.de/recruiting/radios")
  .then(response => response.json())
  .then((data) => {
    data.radios.forEach((radio) => {
      const station = `
      <div id="radios-list">
        <div class="radio-station radio-border">
          <p class="radio-name">${radio.name}</p>
          <p>${radio.frequency}</p>
        </div>
          <div class="radio-image">
            <i class="fas fa-minus-circle"></i>
            <img src="${radio.image}">
            <i class="fas fa-plus-circle"></i>
          </div>
      </div>`;

      const footer = `
        <div class="footer-content">
          <h5>CURRENTLY PLAYING</h5>
          <p>${radio.name}</p>
        </div>`;

      radioStations.insertAdjacentHTML("beforeend", station);
      radioFooter.insertAdjacentHTML("beforeend", footer);
    });
  });

// function for transforming the component on click event
const transformComponent = nodeArray => {
  const arr = Array.from(nodeArray); //transform nodearr into an arr, so that map works
  let lastClicked = "h"; // assign random value so that img div will be shown upon first click
  let counter = 0;
  arr.map(button => {
    button.addEventListener("click", event => {
      hideDivs(); //append hide-class to all divs before removing it from one specific div
      const imgDiv = button.parentNode.parentNode.lastElementChild; //return div with image
      // check if the same button was clicked 2 consecutive times in a row
      if (event.currentTarget.innerHTML === lastClicked && counter % 2 == 0) {
        imgDiv.classList.add("hide-box");
      } else {
        imgDiv.classList.remove("hide-box");
      }

      const footerDiv = Array.from(
        document.querySelector(".radio-footer").children
      ); //returns all hidden footer divs
      footerDiv.map(div => {
        //iterate over each footer div
        if (div.lastElementChild.innerHTML === event.currentTarget.innerHTML) {
          //check which button out of the 4 footer divs matches the button of the current event to show only that div
          div.classList.remove("hide-box"); //
        }
      });
      // after footer-div is shown, check if the same button was clicked twice
      if (event.currentTarget.innerHTML === lastClicked && counter % 2 == 0) {
        footerDiv.forEach(footer => {
          footer.classList.add("hide-box");
        });
      }
      lastClicked = event.currentTarget.innerHTML;
      counter += 1;
    });
  });
};
