const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3001;
const dataFilePath = path.join(__dirname, "data", "orgData.json");

app.use(cors());
app.use(express.json());

// GET: Read all nodes
app.get("/api/nodes", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  res.json(data);
});

// POST: Add a new node
app.post("/api/nodes", (req, res) => {
  const newNode = req.body;
  const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  data.push(newNode);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Node added successfully", newNode });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
