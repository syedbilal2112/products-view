'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mainCategory: DataTypes.STRING,
    subCategory: DataTypes.STRING,
    productImage: DataTypes.STRING,
    productName: DataTypes.STRING,
    productDescription: DataTypes.STRING
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};