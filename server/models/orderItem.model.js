module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define(
    "orderItem",
    {
      purchasingDocument: {
        type: Sequelize.STRING,
      },
      item: {
        type: Sequelize.INTEGER,
      },
      shortText: {
        type: Sequelize.STRING,
      },
      orderQuantity: {
        type: Sequelize.DECIMAL(10, 2),
      },

      orderUnit: {
        type: Sequelize.STRING,
      },
      netPrice: {
        type: Sequelize.DECIMAL(10, 2),
      },
      priceUnit: {
        type: Sequelize.DECIMAL(10, 2),
      },
      netOrderValue: {
        type: Sequelize.DECIMAL(10, 2),
      },
      currency: {
        type: Sequelize.STRING,
      },
      stillToBeDelivered: {
        type: Sequelize.DECIMAL(10, 2),
      },
      stillToBeInvoiced: {
        type: Sequelize.DECIMAL(10, 2),
      },
    },
    {
      paranoid: true,
    }
  );

  return OrderItem;
};
