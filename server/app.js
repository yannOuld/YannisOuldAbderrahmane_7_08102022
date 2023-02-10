const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const path = require("path");
const routes = require("./routes/index.js");
const app = express();


app.use(cors());
app.use(morgan("combined"));
app.use(morgan("combined", { immediate: true }));


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
