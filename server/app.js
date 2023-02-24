const express = require("express");
const rateLimit = require('express-rate-limit')
const cors = require("cors");
const morgan = require("morgan");

const path = require("path");
const routes = require("./routes/index.js");
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
})


app.use(limiter)
app.use(cors());
app.use(morgan("dev"));
app.use(morgan("dev", { immediate: true }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", routes);

// renvoie des messages d'erreurs en cas de problemes
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    console.log(err)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
