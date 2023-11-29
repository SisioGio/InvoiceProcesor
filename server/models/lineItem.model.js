module.exports = (sequelize, Sequelize) => {
  const LineItem = sequelize.define(
    "lineItem",
    {
      itemNo: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      purchaseOrder: {
        type: Sequelize.STRING,
      },
      deliveryNote: {
        type: Sequelize.STRING,
      },

      quantity: {
        type: Sequelize.DECIMAL(10, 2),
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
      },
      lineNetAmount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      matched: {
        type: Sequelize.BOOLEAN,
      },

      matchedItemNo: {
        type: Sequelize.INTEGER,
      },
      correctPrice: {
        type: Sequelize.DECIMAL(10, 2),
      },

      goodsAreReceived: {
        type: Sequelize.BOOLEAN,
      },
      priceIsCorrect: {
        type: Sequelize.BOOLEAN,
      },
    },
    {
      paranoid: true,
    }
  );

  return LineItem;
};
