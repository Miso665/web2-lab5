const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const fse = require("fs-extra");
const { urlencoded } = require("express");
const dotenv = require("dotenv");
dotenv.config();

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port =
  externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 8080;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/camera", function (req, res) {
  res.sendFile(path.join(__dirname, "public/camera.html"));
});

if (externalUrl) {
  const hostname = "127.0.0.1";
  app.listen(port, hostname, () => {
    console.log(
      `Server locally running at http://${hostname}:${port}/ and from outside on ${externalUrl}`
    );
  });
} else {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}
