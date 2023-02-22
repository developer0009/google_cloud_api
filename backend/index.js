const express = require("express");
const data = require("./data/index.json");
const app = express();
const cors = require("cors");
const store = require("./data/store");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.get("/api/google", (req, res) => {
  res.status(200).json(data);
});
app.post("/api/google/v1", (req, res) => {
  store.push(req.body);
  res.status(201).json(store);
});
app.get("/api/google/submitted", (req, res) => {
  res.status(201).json(store);
});

app.listen(8080, console.log("listening...."));
