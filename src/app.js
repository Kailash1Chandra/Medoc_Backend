const express = require("express");
const cors = require("cors");

const tokenRoutes = require("./routes/token.routes");
const doctorRoutes = require("./routes/doctor.routes");
const simulationRoutes = require("./routes/simulation.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tokens", tokenRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/simulate", simulationRoutes);


app.get("/", (req, res) => {
  res.send("Medoc Health OPD Token Service Running");
});

module.exports = app;
