const axios = require("axios");

const uri = `http://api.positionstack.com/v1/forward?access_key=8b7c556a8b78b99d7820d4281d35a0a3&query=dhaka&limit=1`;

axios
  .get(uri)
  .then((res) => {
    const users = res.data;
    console.log(users.data[0].latitude, users.data[0].longitude);
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });
