require("dotenv").config();

const app = require("./app");
const initializeDatabase = require("./database/initDatabase");

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`Account Service running on port ${PORT}`);
  });
};

startServer();