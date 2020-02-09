const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const [, , address] = process.argv;

if (!address) {
  console.log'(Please provide an address')
} else {
  geocode({
    address,
    callback: ({ data, error }) => {
      if (error) {
        return error;
      }
  
      const { longitude, latitude, location } = data;
  
      console.log(location);
  
      forecast({
        latitude,
        longitude,
        callback: ({ data, error }) => {
          if (error) {
            return error;
          }
  
          console.log(data);
        }
      });
    }
  });
}
