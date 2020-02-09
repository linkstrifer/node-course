const request = require("request");

function forecast({ latitude, longitude, callback = () => {} } = {}) {
  const url = `https://api.darksky.net/forecast/06478c1c4d9b4ba70b140fe0c833788d/${latitude},${longitude}?units=si`;

  request(
    {
      url,
      json: true
    },
    (error, response) => {
      if (error) {
        callback({
          error: "Unable to connect to forecast service."
        });
      } else if (response.body.error) {
        callback({
          error: "Unable to find location."
        });
      } else {
        callback({
          data: `${response.body.daily.data[0].summary} Its currently ${response.body.currently.temperature} degrees out. There is a  ${response.body.currently.precipProbability}% change of rain`
        });
      }
    }
  );
}

module.exports = forecast;
