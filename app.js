const express = require("express");
const auth = require("./routes/auth");
const app = express();
const cors = require("cors");
const path = require("path");
const post = require("./routes/post");
// app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));

app.use(auth);
app.use(post);
app.use(express.static("client/build"));
app.get("*", (req, res) =>
  res.sendFile(`${__dirname}/client/build/index.html`)
);
// console.log(path.join(__dirname, "/img"));

app.listen(process.env.PORT || 4000, () => console.log("server listen "));
