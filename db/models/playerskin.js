'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayerSkin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayerSkin.init({
    skin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PlayerSkin',
  });
  return PlayerSkin;
};