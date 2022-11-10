let route = require("express").Router();
const bodyParser = require("body-parser");
let postController = require("../controller/post.controller");
const gurdAuth = require("./gurd/gurd.all");
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
  "/add-post",
  gurdAuth.gurdAuth,
  bodyParser.json(),
  upload.single("file"),
  postController.addPost
);

route.post(
  "/add-comment",
  gurdAuth.gurdAuth,
  bodyParser.json(),
  postController.addComment
);
route.post(
  "/add-like",
  gurdAuth.gurdAuth,
  bodyParser.json(),
  postController.addLike
);
route.get("/likes", postController.getLikes);
route.get("/likes-user", postController.likesUser);
route.get("/posts", postController.getPosts);
route.get("/comment", postController.getComment);
route.get("/profile/:id", postController.getProfile);

module.exports = route;
