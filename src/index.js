require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { login, requireAuth } = require("./auth");
const dataRoutes = require("./routes/data");

const app = express();

app.use(cors()); // allows your GitHub Pages frontend (a different origin) to call this API
app.use(express.json());

app.get("/", (req, res) => {
  res.send("V-Taper Log API is running.");
});

app.post("/api/auth/login", login);

// Every route below this line requires a valid token
app.use("/api", requireAuth, dataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`V-Taper Log API listening on port ${PORT}`);
});