let jwt = require("jsonwebtoken");
let jwtSecret = "dsadkjsaj dlsajhfhdafhdsahfjdshfoisgjhfjs _ jldsfj sdljk";

exports.gurdAuth = (req, res, next) => {
  let token = req.header("Authorization");
  try {
    let data = jwt.verify(token, jwtSecret);
    res.send(data);
  } catch (err) {
    next();
  }
};
