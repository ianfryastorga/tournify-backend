const dotenv = require("dotenv");
const db = require("./models");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    // Escuchar en el servidor HTTP, no en app.listen
    app.listen(PORT, (err) => {
      if (err) {
        return console.error("Failed to start server", err);
      }
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));
