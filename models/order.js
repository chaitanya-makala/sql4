module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Order;
};
