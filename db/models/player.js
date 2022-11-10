const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      this.belongsTo(models.PlayerSkin, { foreignKey: 'skin_id' });
      this.hasMany(models.Game, { foreignKey: 'player_id' });
    }
  }
  Player.init({
    name: DataTypes.STRING(64),
    skin_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
