const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Temporary storage (no DB)
let users = [];
let appointments = [];

// ✅ Test
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send("All fields required ❌");
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.send("User already exists ⚠️");
  }

  users.push({ name, email, password });

  res.send("User registered successfully ✅");
});

// ✅ Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    res.send("Login successful ✅");
  } else {
    res.send("Invalid credentials ❌");
  }
});

// ✅ Book Appointment
app.post("/book", (req, res) => {
  const { doctor } = req.body;

  if (!doctor) {
    return res.send("Select doctor ❌");
  }

  appointments.push({ doctor });

  res.send("Appointment booked with " + doctor + " ✅");
});

// ✅ Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});