const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://yashoda83741_db_user:Yeshodagantyada2026@yeshoda.47jpted.mongodb.net/doctorDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Mongo Error:", err));

// ✅ Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const appointmentSchema = new mongoose.Schema({
  doctor: String
});

// ✅ Models
const User = mongoose.model("User", userSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);

// ✅ Test
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Register
app.post("/register", async (req, res) => {
  try {
    console.log(req.body); // DEBUG

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send("All fields required");
    }

    await User.create({ name, email, password });

    res.send("User registered successfully");
  } catch (err) {
    console.log("Register Error:", err);
    res.status(500).send("Server error");
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  try {
    console.log(req.body); // DEBUG

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.send("Login successful");
    } else {
      res.send("Invalid credentials");
    }
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).send("Server error");
  }
});

// ✅ Book
app.post("/book", async (req, res) => {
  try {
    const { doctor } = req.body;

    await Appointment.create({ doctor });

    res.send("Appointment booked with " + doctor);
  } catch (err) {
    console.log("Booking Error:", err);
    res.status(500).send("Server error");
  }
});

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});