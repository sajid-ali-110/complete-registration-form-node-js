const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/registrationForm")
  .then(() => {
    console.log("db connected successfullyl");
  })
  .catch((e) => {
    console.log("failed to connect with db", e);
  });

