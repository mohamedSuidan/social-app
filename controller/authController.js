const mysqlConnection = require("../model/databaseApp");
let bycrpt = require("bcrypt");
let jwt = require("jsonwebtoken");
let jwtSecret = "dsadkjsaj dlsajhfhdafhdsahfjdshfoisgjhfjs _ jldsfj sdljk";
let link = "http://localhost:4000";
exports.authSginup = async (req, res, next) => {
  let hashPass = await bycrpt.hash(req.body.password, 10);
  let img = link + "/img/" + req.file.filename;
  // console.log(img);
  // console.log(req.file);
  mysqlConnection.query(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          mysqlConnection.query(
            "INSERT INTO `users`(`name`, `email`, `img`,`password`) VALUES (?, ?, ?,?)",
            [req.body.name, req.body.email, img, hashPass],
            (err, rows) => {
              if (!err) {
                res.json("data added");
              } else {
                console.log(err);
              }
            }
          );
        } else {
          res.send("email founded");
        }
      } else {
        res.send(err);
      }
    }
  );
};
exports.authSginin = (req, res, next) => {
  mysqlConnection.query(
    "SELECT * FROM users WHERE email=?",
    [req.body.email],
    async (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          res.send("You Don't Have An Email");
        } else {
          let bool = await bycrpt.compare(req.body.password, rows[0].password);
          if (bool) {
            let token = jwt.sign(
              {
                id: rows[0].id,
                name: rows[0].name,
                email: rows[0].email,
                img: rows[0].img,
              },
              jwtSecret
            );
            res.json({
              id: rows[0].id,
              name: rows[0].name,
              token: token,
            });
          } else {
            res.send("Password Mistake");
          }
        }
      }
    }
  );
};
