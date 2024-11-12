const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
//mongoose connection
mongoose
  .connect("mongodb://localhost:27017/Second-database")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//Schema

const authSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//model

const authModel = mongoose.model("Auth", authSchema);

//Routes

app.post("/register", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (!err) {
          req.body.password = hash;
          console.log(req.body.password);
          authModel
            .create(req.body)
            .then((data) => {
              res.send({ message: "Data Created Successfully" });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  authModel.findOne({ email: req.body.email }).then((user) => {
    if (user !== null) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result == true) {
          jwt.sign({ email: req.body.email }, "hey!", (err, token) => {
            if (!err) {
              res.send({ message: "Login Successfull", token: token });
            } else {
              res.send(err);
            }
          });
        } else {
          res.send({ message: "Incorrect Password" });
        }
      });
    } else {
      res.send({ message: "User not found or Invalid Email" });
    }
  });
});

app.get("/getdata", verifyToken, (req, res) => {
  authModel
    .find({},{password:0})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
//Verify token here

function verifyToken(req, res, next) {
  let authtoken = req.headers.authorization.split(" ")[1];
  if (authtoken) {
    jwt.verify(authtoken, "hey!", (err, data) => {
      if (!err) {
        console.log(data);
        next();
      } else {
        res.send({ message: "Invalid Token" });
      }
    });
  } else {
    res.send({ message: "No Token Provided" });
  }
}
app.listen(8001, () => {
  console.log("server up and running on 8001");
});
