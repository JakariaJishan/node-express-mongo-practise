const axios = require("axios");

function geocode(address, callback) {
  const uri = `http://api.positionstack.com/v1/forward?access_key=8b7c556a8b78b99d7820d4281d35a0a3&query=${address}&limit=1`;

  axios
    .get(uri)
    .then((res) => {
      const users = res.data;
      const data = {
        latitude: users.data[0].latitude,
        longitude: users.data[0].longitude,
      };
      callback(undefined, data);
    })
    .catch((err) => {
      callback(err, undefined);
    });
}


module.exports = geocode