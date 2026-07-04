const express = require("express");
const cors = require("cors");
const kpiRoutes = require("./routes/kpiRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/kpis", kpiRoutes);

module.exports = app;