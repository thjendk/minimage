import express from "express";
import path from "path";
const app = express();
const port = process.env.PORT || 3000;

// Serve index.js
app.use(express.static(path.join(__dirname, "..", "build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port);
console.log("Server listening on port " + port);
