require("dotenv").config();
const PORT = 3000 || process.env.PORT;

// package HTTP de node.js
const http = require("http");

// import de l'application app.js
const app = require("./app");
const sequelize = require("./config/database.js");

// renvoie un port valide
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// créee une variable pour le port de connecté
const port = normalizePort(PORT);

// gere les erreurs d'ecoutes de port
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// crée le serveur et écoute l'application de app.js a chaque requetes
const server = http.createServer(app);

// indique le port connecté
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// écoute des requetes sur le port
sequelize
  .sync({ alter: true })
  .then(() => server.listen(port))
  .catch((e) => console.error(e));
