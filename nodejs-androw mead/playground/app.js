const fs = require('fs');

const dataBuffer = fs.readFileSync('data.json');
const data = dataBuffer.toString();
const parsedJSON = JSON.parse(data)

parsedJSON.name = 'jishan',
parsedJSON.age= 23

const newData = JSON.stringify(parsedJSON)
fs.writeFileSync('data.json', newData)
console.log(newData)