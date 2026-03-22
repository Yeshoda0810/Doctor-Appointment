const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ CORS FIX (important)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://yashoda83741_db_user:Yashoda2024@yeshoda.47jpted.mongodb.net/doctorDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// ✅ Appointment Schema
const appointmentSchema = new mongoose.Schema({
  doctor: String
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({ name, email, password });

  res.send("User registered successfully");
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.send("Login successful");
  } else {
    res.send("Invalid credentials");
  }
});

// ✅ Book Appointment
app.post("/book", async (req, res) => {
  const { doctor } = req.body;

  await Appointment.create({ doctor });

  res.send("Appointment booked with " + doctor);
});

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});