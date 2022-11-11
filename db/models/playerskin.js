const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlayerSkin extends Model {
    static associate(models) {
      this.hasMany(models.Player, { foreignKey: 'skin_id' });
    }
  }
  PlayerSkin.init(
    {
      skin: DataTypes.STRING(4),
      boomerang: DataTypes.STRING(4),
    },
    {
      sequelize,
      modelName: 'PlayerSkin',
    }
  );
  return PlayerSkin;
};
