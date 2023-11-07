module.exports = (sequelize, Sequelize) => {
  const InvoiceLine = sequelize.define(
    "invoiceLine",
    {
      articleCode: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "description is required" },
        },
      },
      purchaseOrder: {
        type: Sequelize.STRING,
      },
      deliveryNote: {
        type: Sequelize.STRING,
      },
      unitOfMeasure: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
      },
      unitPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "unitPrice is required" },
        },
      },

      netAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "netAmount is required" },
        },
      },
      taxPercentage: {
        type: Sequelize.DECIMAL(10, 2),
      },
      taxAmount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "totalAmount is required" },
        },
      },
    },
    {
      paranoid: true,
    }
  );

  return InvoiceLine;
};
