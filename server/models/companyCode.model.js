module.exports = (sequelize, Sequelize) => {
  const CompanyCode = sequelize.define(
    "companyCode",
    {
      code: {
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

  return CompanyCode;
};
