module.exports = (sequelize, Sequelize) => {
  const Document = sequelize.define(
    "document",
    {
      type: {
        type: Sequelize.STRING,
        enum: ["INVOICE", "CREDIT NOTE"],
        default: "INVOICE",
      },
      status: {
        type: Sequelize.STRING,
        enum: ["NEW", "REJECTED", "POSTED"],
        defaultValue: "NEW",
      },
      comment: {
        type: Sequelize.STRING,
      },

      documentNo: {
        type: Sequelize.STRING,
      },
      documentDate: {
        type: Sequelize.DATEONLY,
      },
      dueDate: {
        type: Sequelize.DATEONLY,
      },
      netAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "netAmount is required" },
        },
      },

      taxAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "taxAmount is required" },
        },
      },
      shippingCost: {
        type: Sequelize.DECIMAL(10, 2),
      },
      discount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notNull: { msg: "totalAmount is required" },
        },
      },
      purchaseOrder: {
        type: Sequelize.STRING,
      },
      deliveryNote: {
        type: Sequelize.STRING,
      },
      pdfFile: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );

  return Document;
};
