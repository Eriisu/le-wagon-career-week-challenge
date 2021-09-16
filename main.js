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
