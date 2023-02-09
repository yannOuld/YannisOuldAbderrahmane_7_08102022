// dépendances
const rateLimit = require("express-rate-limit");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const routes = require("./routes/index.js");
const path = require("path");

// cross origin ressource sharing
app.use(cors());

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rate limit gere le nombre de requetes maximum à 100 pour 15min
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", apiLimiter, routes);

// morgan logger for developpement
app.use(morgan("combined"));
app.use(morgan("combined", { immediate: true }));

// renvoie des messages d'erreurs en cas de problemes
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: err.message,
  });
});

module.exports = app;
