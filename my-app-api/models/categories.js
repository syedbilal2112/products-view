'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mainCategory: DataTypes.STRING,
    subCategory: DataTypes.STRING
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};