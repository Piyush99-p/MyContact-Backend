const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

// Set the port either from the environment variable or dynamically assign a free port
const port = process.env.PORT || 0;

// Middleware to parse incoming JSON requests
app.use(express.json());

// API routes for contacts
app.use("/api/contacts", require("./routes/contactRoutes"));

// API routes for users
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware (must be last)
app.use(errorHandler);

// Start the server and handle shutdown gracefully
const server = app.listen(port, () => {
    console.log(`Server is running on port ${server.address().port}`);
});

// Graceful shutdown logic
process.on("SIGINT", () => {
    console.log("Shutting down server...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});

process.on("SIGTERM", () => {
    console.log("Received SIGTERM, shutting down...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
