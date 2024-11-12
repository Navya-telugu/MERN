const http = require("http");

http
  .createServer((req, res) => {
    if (req.url == "/products" && req.method == "GET") {
      res.end("showed all products");
    } else if (req.url == "/updateProducts" && req.method == "PUT") {
      res.end("updated products");
    } else if (req.url == "/deleteProducts" && req.method == "DELETE") {
      res.end("deleted products");
    }
  })
  .listen(8001);
