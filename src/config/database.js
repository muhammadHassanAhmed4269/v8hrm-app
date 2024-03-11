const mongoose = require("mongoose");
require("dotenv").config();

class DatabaseConnector {
  constructor(dbUri) {
    this.dbUri = dbUri;
    this.reconnectionAttempts = 0;
    this.maxReconnectionAttempts = 1000; // Define the maximum number of reconnection attempts

    mongoose.connection.on("error", (error) => {
      console.error("Database connection error:", error);
      this.handleConnectionError(error);
    });

    mongoose.connection.on("disconnected", () => {
      console.error("MongoDB disconnected. Reconnecting...");
      this.handleDisconnection();
    });

    process.on("SIGINT", () => {
      this.closeConnection();
    });
  }

  async connect() {
    try {
      await mongoose.connect(this.dbUri);
      console.log("Connected to MongoDB.");
      this.reconnectionAttempts = 0; // Reset reconnection attempts on successful connection
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      this.handleConnectionError(error);
    }
  }

  async handleDisconnection() {
    if (this.reconnectionAttempts < this.maxReconnectionAttempts) {
      try {
        await mongoose.connect(this.dbUri);
        console.log("Reconnected to MongoDB.");
        this.reconnectionAttempts = 0; // Reset reconnection attempts on successful reconnection
      } catch (error) {
        console.error("Error reconnecting to MongoDB:", error);
        this.handleConnectionError(error);
      }
    } else {
      console.error("Max reconnection attempts reached. Exiting.");
      process.exit(1);
    }
  }

  handleConnectionError(error) {
    console.error("Error:", error.message);
    console.log(
      `Reconnecting attempt ${this.reconnectionAttempts + 1} of ${
        this.maxReconnectionAttempts
      }`
    );
    if (this.reconnectionAttempts < this.maxReconnectionAttempts) {
      setTimeout(() => {
        this.reconnectionAttempts++;
        this.connect();
      }, 5000); // Retry after 5 seconds
    } else {
      console.error("Max reconnection attempts reached. Exiting.");
      process.exit(1);
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
