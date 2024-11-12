const http = require("http");

http
  .createServer((req, res) => {
    console.log("hello");
    res.end("sever running on 8000");
  })
  .listen(8000);
