module.exports = (sequelize, Sequelize) => {
  const Vendor = sequelize.define(
    "vendor",
    {
      number: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      vat: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );

  return Vendor;
};
