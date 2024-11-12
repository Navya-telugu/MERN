const http = require("http");
// const data=require("./data.json");
const fs = require("fs");
const url = require("url");

http
  .createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname == "/products" && req.method == "GET") {
      fs.readFile("./data.json", "utf-8", (err, data) => {
        if (err) {
          res.end("error in reading data");
        } else {
          if (parsedUrl.query.id !== undefined) {
            const jsarray = JSON.parse(data);
            const singleprod = jsarray.find(
              (item) => item.id == parsedUrl.query.id
            );
            if (singleprod) {
              res.end(JSON.stringify(singleprod));
            } else {
              res.end("product not found");
            }
          } else {
            res.end(data);
          }
        }
      });
    } else if (parsedUrl.pathname == "/products" && req.method == "POST") {
      let product = "";
      req.on("data", (chunk) => {
        product = product + chunk;
      });

      req.on("end", () => {
        fs.readFile("./data.json", "utf-8", (err, data) => {
          if (err) {
            res.end("unable to read file");
          } else {
            let allOldProducts = JSON.parse(data);
            let newProduct = JSON.parse(product);
            allOldProducts.push(newProduct);
            fs.writeFile(
              "./data.json",
              JSON.stringify(allOldProducts),
              (err, data) => {
                if (err) {
                  res.end("unable to create product");
                } else {
                  res.end("New Product Created Successfully");
                }
              }
            );
          }
        });
      });
    } else if (parsedUrl.pathname == "/delete" && req.method == "DELETE") {
      fs.readFile("./data.json", "utf-8", (err, data) => {
        if (err) {
          res.end("error in deleting file");
        } else {
          let allOldProducts = JSON.parse(data);
          let index = allOldProducts.findIndex(
            (item) => item.id == parsedUrl.query.id
          );
          allOldProducts.splice(index, 1);
          fs.writeFile(
            "./data.json",
            JSON.stringify(allOldProducts),
            (err, data) => {
              if (err) {
                res.end("unable to delete");
              } else {
                res.end("Product deleted suucessfully");
              }
            }
          );
        }
      });
    } else if (parsedUrl.pathname == "/update" && req.method == "PUT") {
      fs.readFile("./data.json", "utf-8", (err, data) => {
        if (err) {
          res.end("some error in reading file");
        } else {
          let updateProduct = "";
          req.on("data", (chunk) => {
            updateProduct = updateProduct + chunk;
          });
          req.on("end", () => {
            let allOldProducts = JSON.parse(data);
            let parsedUpdateProduct = JSON.parse(updateProduct);
            let index = allOldProducts.findIndex(
              (item) => item.id == parsedUrl.query.id
            );
            if (index !== -1) {
              allOldProducts[index] = parsedUpdateProduct;
              fs.writeFile(
                "./data.json",
                JSON.stringify(allOldProducts),
                (err, data) => {
                  if (err) {
                    res.end("Unable to update product");
                  } else {
                    res.end("Product updated successfully");
                  }
                }
              );
            } else {
              res.end("Product is not updated");
            }
          });
        }
      });
    } else {
      res.end("404 not found");
    }
  })
  .listen(8004);
