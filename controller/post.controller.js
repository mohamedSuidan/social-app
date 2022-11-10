const mysqlConnection = require("../model/databaseApp");
let link = "http://localhost:4000";

exports.addPost = (req, res, next) => {
  let img =
    req.file.mimetype !== "video/mp4" ? link + "/img/" + req.file.filename : "";
  let video =
    req.file.mimetype === "video/mp4" ? link + "/img/" + req.file.filename : "";
  mysqlConnection.query(
    "INSERT INTO `posts`(`text`, `post_img`, `video`, `user_id`) VALUES (?, ?, ?, ?)",
    [req.body.text, img, video, req.body.userId],
    (err, rows) => {
      if (!err) {
        res.send("data added");
      } else {
        console.log(err);
      }
    }
  );
};

exports.addComment = (req, res, next) => {
  mysqlConnection.query(
    "INSERT INTO `comment`(`comment`, `post_id`, `user_id`) VALUES (?,?,?)",
    [req.body.text, req.body.postId, req.body.userId],
    (err, rows) => {
      if (!err) {
        res.send("data added");
      } else {
        console.log(err);
      }
    }
  );
};
exports.getPosts = (req, res, next) => {
  mysqlConnection.query(
    "SELECT * FROM `users` INNER JOIN posts ON posts.user_id = users.id",
    (err, rows) => {
      if (!err) {
        res.json({
          posts: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
exports.getComment = (req, res, next) => {
  mysqlConnection.query(
    "SELECT * FROM `comment` INNER JOIN users ON comment.user_id = users.id",
    (err, rows) => {
      if (!err) {
        res.json({
          comments: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

exports.addLike = (req, res, next) => {
  mysqlConnection.query(
    "SELECT * FROM `likes` WHERE post_id = ?&&user_id = ?",
    [req.body.postId, req.body.userId],
    (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          mysqlConnection.query(
            "INSERT INTO `likes`(`user_id`, `post_id`) VALUES (?,?)",
            [req.body.userId, req.body.postId],
            (error, rows) => {
              if (!error) {
                res.send("added Like");
              } else {
                console.log(error);
              }
            }
          );
        } else {
          mysqlConnection.query(
            "DELETE FROM `likes` WHERE post_id = ? AND user_id = ?",
            [req.body.postId, req.body.userId],
            (error, rows) => {
              if (!error) {
                res.json("Deleted Like");
              } else {
                console.log(error);
              }
            }
          );
        }
      } else {
        console.log(err);
      }
    }
  );
};

exports.getLikes = (req, res, next) => {
  mysqlConnection.query(
    "SELECT * FROM `likes` WHERE post_id=?",
    [req.query.postId],
    (err, rows) => {
      if (!err) {
        res.json({
          likes: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
exports.likesUser = (req, res, next) => {
  mysqlConnection.query(
    "SELECT * FROM `likes` WHERE user_id = ? AND post_id = ?",
    [req.query.userId, req.query.postId],
    (errs, rows) => {
      if (!errs) {
        if (rows.length > 0) {
          res.json({
            bool: true,
          });
        } else {
          res.json({
            bool: false,
          });
        }
      } else {
        console.log(errs);
      }
    }
  );
};

exports.getProfile = (req, res, next) => {
  mysqlConnection.query(
    "SELECT * FROM users WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        mysqlConnection.query(
          "SELECT * FROM posts WHERE user_id=?",
          [req.params.id],
          (error, row) => {
            if (!error) {
              res.json({
                user: rows,
                posts: row,
              });
            } else {
              console.log(error);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
};
