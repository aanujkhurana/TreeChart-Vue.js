const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const dataFilePath = path.join(__dirname, "data", "orgData.json");

app.use(express.json());

// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://treechartplayground.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
