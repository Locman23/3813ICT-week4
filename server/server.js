const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({
  origin: 'http://localhost:4200', // allow requests from this origin
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());


class User {
  constructor(username, birthdate, age, email, password, valid = false) {
    this.username = username;
    this.birthdate = birthdate;
    this.age = age;
    this.email = email;
    this.password = password; 
    this.valid = valid; 
  }
}

const users = [
  new User("lachlan",  "1995-01-01", 22, "lachlan@example.com",  "12345"),
  new User("sarah", "1998-05-12", 20, "sarah@example.com", "letmein"),
  new User("dylan",  "2000-09-20", 28, "dylan@example.com",  "password123")
];

// POST /api/auth -> check credentials
app.post("/api/auth", (req, res) => {
  const { email, password } = req.body || {};
  const match = users.find(u => u.email === email && u.password === password); 

  if (!match) {
    return res.json({ valid: false }); 
  }


const { password: _omit, ...userData } = { ...match, valid: true };
  return res.json(userData);
});

app.listen(3000, () => {
  console.log("Auth server running at http://localhost:3000");
});
