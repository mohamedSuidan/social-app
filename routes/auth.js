let route = require("express").Router();
const bodyParser = require("body-parser");
let authController = require("../controller/authController");
const gurdAuth = require("./gurd/gurd.auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
route.post(
  "/sgin-up",
  gurdAuth.gurdAuth,
  bodyParser.json(),
  upload.single("img"),
  authController.authSginup
);
route.post(
  "/sgin-in",
  gurdAuth.gurdAuth,
  bodyParser.json(),
  authController.authSginin
);
module.exports = route;
