const mongoose = require("mongoose");
var moment = require("moment");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: String,
    default: moment(new Date()).format("MMM DD, YYYY"),
  },
});

const Users = mongoose.model("User", userSchema);

module.exports = { Users };
