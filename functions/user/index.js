const bcrypt = require("bcrypt");
const { Users } = require("../../model/user.js");
const { createToken } = require("../../middleware/createToken.js");

async function register(req, res) {
  const { email, password, role } = req.body;

  // validate user email address
  const userExist = await Users.findOne({ email: email });

  if (userExist) return res.status(403).send("user already exist");

  // hash passwords
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new Users({
      email: email,
      password: hashPassword,
      role: role,
    });
    const saveUser = await user.save();
    res.send({ saveUser });
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  // check user is exist or not
  const user = await Users.findOne({ email: email });
  if (!user) return res.status(400).send("user not register");
  // conform password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("invalid email password");
  const token = await createToken(user.id);
  // res.send({ user });
  res.send({ token, user });
}

module.exports = { register, login };
