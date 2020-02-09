const request = require("request");

function geocode({ address, callback }) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibGlua3N0cmlmZXIiLCJhIjoiY2s2ZmY0NzBwMjBkeDNtbjhxd3Z6OTJmbyJ9.w1EE6raU04IMmw-F0UGktQ`;

  request(
    {
      url,
      json: true
    },
    (error, response) => {
      if (error) {
        callback({
          error: "Unable to connect to geocode service!"
        });
      } else if (response.body.features.length === 0) {
        callback({
          error: "Unable to find location"
        });
      } else {
        const [longitude, latitude] = response.body.features[0].center;
        const location = response.body.features[0].place_name;

        callback({
          data: {
            latitude,
            longitude,
            location
          }
        });
      }
    }
  );
}

module.exports = geocode;
