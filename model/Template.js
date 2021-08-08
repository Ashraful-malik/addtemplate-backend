const mongoose = require("mongoose");
var moment = require("moment");

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  details: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    default: moment(new Date()).format("MMM DD, YYYY"),
  },
});

const templates = mongoose.model("templates", templateSchema);

module.exports = { templates };
