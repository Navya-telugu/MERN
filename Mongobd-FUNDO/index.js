const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/First-Database")
  .then((data) => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//Now lets create Schema for this

// const practiceSchema = mongoose.Schema({
//   name: String,
//   age: Number,
//   City: String,
// });

//we can also validate this Schema
const practiceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: [20, "Minimum age should be 20"],
      max: [50, "Maximum age should be 50"],
    },
    City: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
      minLength: [5, "Minimum length of Password should be 5"],
      maxLength: [10, "Maximum length of Password should be 10"],
    },
    role: {
      type: String,
      required: true,
      enum: ["Developer", "Farmer", "Home-Maker"],
    },
  },
  { timestamps: true }
);

// Create Model for which Collection we want to connect this database

const practicemodel = mongoose.model("practices", practiceSchema);

//Now Create Sample Data into this

const sampleData = {
  name: "Cherry",
  age: 24,
  City: "Kurnool",
  Password: "NavTelugu",
  role: "Developer",
};

//Now Create data in Database in specified collection by using create method

practicemodel
  .create(sampleData)
  .then((data) => {
    console.log(data);
    console.log("data inserted sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

//Now lets fetch Data using find() Method

// practicemodel
//   .find({ name: "Cherry" })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//Find particular data by uding findOne()

// practicemodel
//   .findOne({ name: "Cherry" })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//Sort data by using sort() in ascending order

// practicemodel
//   .find()
//   .sort({ age: 1 })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//Sort data by using sort() in descending order

// practicemodel
//   .find()
//   .sort({ age: 1 })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//delete data by using deleteOne()

//deleteOne()-->we can delete one item
//deleteMany()-->we can delete Many items

// practicemodel
//   .deleteMany({ name: "Saavi",age:39 })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//update by using updateOne()

practicemodel
  .updateMany({ name: "Charitha" }, { age: 23 })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
