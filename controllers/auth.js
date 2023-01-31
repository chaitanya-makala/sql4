const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models").User;

exports.register = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};
