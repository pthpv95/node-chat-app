const path = require("path");
const publicPath = path.join(__dirname, "../public");

const express = require("express");

const app = express();
app.use(express.static(publicPath));
var port = process.env.PORT || 3000;

// app.get("/get", (req, res) => {
//   res.('<h3>Hi</h3>')
// });

app.listen(port);
