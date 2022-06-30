const axios = require("axios");

function forecast(long, lat, callback) {
    // b2dfe0e2aaae8395ca3bef89e495a185

  const uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}4&lon=${long}&appid=b2dfe0e2aaae8395ca3bef89e495a185`;

  axios
    .get(uri)
    .then((res) => {
      const result = res.data;
      callback(undefined, result.wind.speed);
    // console.log(result.base)
    })
    .catch((err) => {
      callback(err.message, undefined);
    });
}


module.exports = forecast