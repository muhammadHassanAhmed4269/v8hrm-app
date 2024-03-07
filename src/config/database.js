const mongoose = require("mongoose");
require("dotenv").config();

class DatabaseConnector {
  constructor(dbUri) {
    this.dbUri = dbUri;

    mongoose.connection.on("error", (error) => {
      console.error("Database connection error:", error);
      throw new Error("MongoDB Connection Error");
    });

    mongoose.connection.on("disconnected", () => {
      console.error("MongoDB disconnected. Reconnecting...");
      this.connect();
    });

    process.on("SIGINT", () => {
      this.closeConnection();
    });
  }

  async connect() {
    try {
      await mongoose.connect(this.dbUri);
      console.log("Connected to MongoDB.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  closeConnection() {
    mongoose.connection.close(() => {
      console.log("MongoDB connection closed through app termination.");
      process.exit(0);
    });
  }
}

const DBURI = process.env.MONGODB_URL;
if (!DBURI) {
  console.error("MongoDB URL is missing.");
  process.exit(1);
}

const dbConnector = new DatabaseConnector(DBURI);
dbConnector.connect();

module.exports = dbConnector;
