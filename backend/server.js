const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://yashoda83741_db_user:Yashoda2024@yeshoda.47jpted.mongodb.net/doctorDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

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

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await User.create({ name, email, password });

    res.send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.send("Login successful");
    } else {
      res.send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send("Error logging in");
  }
});

// ✅ Book Appointment
app.post("/book", async (req, res) => {
  try {
    const { doctor } = req.body;

    await Appointment.create({ doctor });

    res.send("Appointment booked with " + doctor);
  } catch (err) {
    res.status(500).send("Error booking appointment");
  }
});

// ✅ OPTIONAL (for browser testing)
app.get("/login", (req, res) => {
  res.send("Login API working");
});

app.get("/register", (req, res) => {
  res.send("Register API working");
});

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});