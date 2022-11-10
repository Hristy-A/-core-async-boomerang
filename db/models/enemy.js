'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enemy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Enemy.init({
    skin: DataTypes.STRING,
    base_tick: DataTypes.INTEGER,
    strong: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Enemy',
  });
  return Enemy;
};