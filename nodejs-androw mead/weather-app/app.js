const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// console.log(process.argv[2] === undefined)

if(process.argv[2] !== undefined){
  geocode(process.argv[2], (err, data) => {
    if(err){
      return console.log(err);
    }
    forecast(data.longitude, data.latitude, (error, data) => {
      if(error) {
        return console.log(error);
      }
      // console.log("Error2", error);
      console.log("Data2", data);
    });
  });
}else{
  console.log('plz provide a  location');
}



