const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
let users = [];
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  users.push({ name, email, password });

  res.send("User registered successfully");
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.send("Login successful");
  } else {
    res.send("Invalid credentials");
  }
});
let appointments = [];

app.post("/book", (req, res) => {
  const { doctor } = req.body;

  appointments.push({ doctor });

  res.send("Appointment booked with " + doctor);
});
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://yashoda83741_db_user:Yashoda2024@yeshoda.47jpted.mongodb.net/doctorDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));