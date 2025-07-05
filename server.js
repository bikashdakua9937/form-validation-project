const express = require('express');
const path = require('path');
const app = express();

const tempStorage = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.post('/submit', (req, res) => {
  const { name, email, age, password } = req.body;

  if (!name || !email || !age || !password) {
    return res.status(400).send("All fields are required.");
  }

  if (isNaN(age) || age < 18) {
    return res.status(400).send("You must be at least 18 years old.");
  }

  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters.");
  }

  tempStorage.push({ name, email, age, password });
  res.send("Form submitted successfully!");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
