  require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const User = require('./schema');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Error connecting to database:", err));

app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body;

    const user = new User(userData);

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", error: error.message });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
