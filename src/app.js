const express = require("express");
const cors = require("cors");
const path = require("path");
const matchRoute = require("./routes/matchRoute");

const app = express();

// Middleware MUST come BEFORE routes
app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "../client/dist")));

console.log("[app.js] Middleware initialized");
// Routes come AFTER middleware
app.use("/api", (req, res, next) => {
  console.log(`[app.js] Incoming request: ${req.method} ${req.originalUrl}`);
  next();
}, matchRoute);

// Catch all handler: send back React's index.html file for any non-API routes
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});