const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const User = require("../models").User;

exports.authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid login credentials");
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) throw new Error("Invalid login credentials");
  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: 86400,
  });
  return { token };
};
