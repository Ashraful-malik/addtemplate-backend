const express = require("express");
const router = express.Router();
const { register, login } = require("../functions/user/index");
// const { UserRole } = require("../middleware/middleware.js");
const { verifyAccessToken } = require("../middleware/createToken.js");
const {
  user,
  createTemplate,
  getAllTemplates,
  templateById,
  deletetemplate,
} = require("../functions/AddItem/index");

router.get("/user", verifyAccessToken, user);

// UserRole("admin")
router.get("/", (req, res) => {
  res.send("express app");
});

router.post("/register", register);
router.post("/login", login);

// template Routes
router.post("/addtemplate", verifyAccessToken, createTemplate);
router.get("/template", getAllTemplates);
router.get("/template/:id", templateById);
router.delete("/deletetemplate/:id", deletetemplate);

module.exports = router;
