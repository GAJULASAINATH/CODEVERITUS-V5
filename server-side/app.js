//access credentials

//All packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

//routes
const { connectDB } = require("./dbConnections/db");
const usersRoute = require("./routes/usersRoutes");
const adminsRoute = require("./routes/adminsRoutes");
const jwtAuthenticator = require("./middleware/jwtAuthenticator");

//MAIN APP
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://code-veritus505.vercel.app/", // Allow requests from this origin
    credentials: true, // Allow cookies and credentials
  })
);

//PORT AVAILABILITY
const PORT = process.env.PORT || 5000;

const serverAndDatabaseConnection = async () => {
  try {
    await connectDB();

    //UNPROTEDTED ROUTES
    app.use("/api/users", usersRoute);
    app.use("/api/admins", adminsRoute);

    //PROTECTED ROUTES
    app.use("/api/admins/fetch", jwtAuthenticator, adminsRoute);

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(`Database Error: ${error.message}`);
    process.exit(1);
  } finally {
    console.log("Server initialization attempted.");
  }
};
serverAndDatabaseConnection();
