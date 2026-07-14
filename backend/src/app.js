const express = require("express");
const cors = require("cors");

const kpiRoutes = require("./routes/kpiRoutes");
const authRoutes = require("./routes/Auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/kpis", kpiRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;