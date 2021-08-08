const express = require("express");
var cors = require("cors");
const router = require("./routes/index");
require("dotenv").config();
require("./db-connect");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);
app.listen(5000, () => {
  console.log("server running on 5000");
});
