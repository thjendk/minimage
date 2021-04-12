import { json } from "body-parser";
import express from "express";
import path from "path";
import routes from "./routes";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 3001;

app.use(json());
app.use(cookieParser());
app.use("/api", routes);

// Serve index.js
app.use(express.static(path.join(__dirname, "..")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(port);
console.log("Server listening on port " + port);
