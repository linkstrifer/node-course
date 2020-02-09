const form = window["weather-form"];
const result = window.result;

form.addEventListener("submit", event => {
  event.preventDefault();

  result.innerText = "Searching...";

  const { value: address } = event.target.address;

  fetch(`/weather?address=${address}`)
    .then(response => response.json())
    .then(({ error, forecast, location }) => {
      if (error) {
        return (result.innerHTML = `<span style="color: red">${error}</span>`);
      }

      result.innerHTML = `
        <h2>${location}</h2>
        <p>${forecast}</p>
      `;
    });
});
