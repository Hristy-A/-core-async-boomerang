const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enemy extends Model {
    static associate(models) {
    }
  }
  Enemy.init({
    skin: DataTypes.STRING(4),
    base_tick: DataTypes.INTEGER,
    strong: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Enemy',
  });
  return Enemy;
};
