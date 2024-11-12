const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

//connect to mongodb

mongoose
  .connect("mongodb://localhost:27017/First-Database")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

//Create schema

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [500, "minimum product size is 500"],
      max: [1000, "maximum product size is 1000"],
    },
    model: {
      type: String,
      required: true,
      enum: ["shirt", "Kurta", "Saree"],
    },
    Color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//create model

const productModel = mongoose.model("Products", productSchema);

app.get("/products", (req, res) => {
  productModel
    .find()
    .then((data) => {
      console.log(data);
      res.send({ message: "Fetched data Successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/products/:id", (req, res) => {
  productModel
    .findOne({ _id: req.params.id })
    .then((data) => {
      console.log(data);
      res.send({ message: "Fetched data by id Successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/products", (req, res) => {
  let product = req.body;
  productModel
    .create(product)
    .then((data) => {
      console.log(data);
      res.send({ message: "Created data Successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/products/:id", (req, res) => {
  let product = req.body;
  productModel
    .updateOne(product, { _id: req.params.id })
    .then((data) => {
      console.log(data);
      res.send({ message: "Updated data Successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/products/:id", (req, res) => {
  productModel
    .deleteOne({ _id: req.params.id })
    .then((data) => {
      console.log(data);
      res.send({ message: "deleted data Successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(8007, () => {
  console.log("server is running on port 8000");
});
