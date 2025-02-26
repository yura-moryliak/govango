const express = require("express");
const path = require("path");
const app = express();
const port = 9999;

// Serve static files from the correct directory
app.use(express.static(path.join(__dirname, "dist", "ui", "browser")));

app.set("view engine", "ejs");

// Serve index.html for all routes (to support Angular routing)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "ui", "browser", "index.html"));
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
