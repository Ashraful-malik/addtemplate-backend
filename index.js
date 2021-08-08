const express = require("express");
var cors = require("cors");
const router = require("./routes/index");
require("dotenv").config();
require("./db-connect");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
app.use("/", router);

app.listen(process.env.PORT || PORT, () => {
  console.log("server running on 5000");
});
