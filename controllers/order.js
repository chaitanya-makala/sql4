const Order = require("../models").Order;

exports.create = async (req, res) => {
  try {
    const order = await Order.create({
      userId: req.userId,
      description: req.body.description,
      price: req.body.price,
    });
    res.status(201).send(order);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.userId },
      include: [{ model: User, as: "user" }],
    });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      where: { userId: req.userId },
      include: [{ model: User, as: "user" }],
    });
    if (!order) {
      return res.status(404).send({ message: "Order Not Found" });
    }
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
