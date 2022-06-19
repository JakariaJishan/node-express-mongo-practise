const fs = require("fs");



const requestHandler = (req, res) => {
    const url = req.url;
    if (url === "/") {
      res.write("<html>");
      res.write("<head></head>");
      res.write("<body><h1><form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>send</button></form></h1></body>");
      res.write("</head>");
      res.write("</html>");
      return res.end();
    }
    if(url === "/message" && req.method === "POST") {
      const tempData = [];
      req.on("data", (chunk) => {
          tempData.push(chunk)
      })
      req.on("end", () => {
          const parsedTempData = Buffer.concat(tempData).toString();
          const message = parsedTempData.split("=")[1];
          fs.writeFileSync('test.txt', message);
      })
      res.statusCode=302
      res.setHeader('location','/');
      return res.end();
    }
    res.write("<html>");
    res.write("<head></head>");
    res.write("<body><h1>this is test server</h1></body>");
    res.write("</head>");
    res.end();
  }

  module.exports = requestHandler