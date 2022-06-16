const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.write("<html>");
    res.write("<head></head>");
    res.write("<body><h1><form action='/message' method='POST'><input /><button type='submit'>send</button></form></h1></body>");
    res.write("</head>");
    return res.end();
  }
  if(url === "/message" && req.method === "POST") {
    fs.writeFileSync('test.txt', 'dummy text');
    res.statusCode=302
    res.setHeader('location','/');
    return res.end();
  }
  res.write("<html>");
  res.write("<head></head>");
  res.write("<body><h1>this is test server</h1></body>");
  res.write("</head>");
  res.end();
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
