const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;

// DB Connection
require("./db/conn");

// Import Mongoose Model (Correct Path)
const Register = require("./models/register");

// Paths
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Middleware
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: false }));

// View Engine Setup
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registeredEmployee = new Register({
        firstName: req.body.firstname,   // match form field name
        lastName: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password,
      });

      const user = await registeredEmployee.save();
      console.log(user);
      res.status(201).render("index");
    } else {
      res.send("Passwords do not match");
    }

  } catch (e) {
    console.log("Error while registering:", e);
    res.status(500).send("Internal Server Error");
  }
});

// for login
app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({email:email})

    if (userEmail.password === password) {
        res.status(201).render("index")
    } else{
        res.status(501).send("password is wrong")
    }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
