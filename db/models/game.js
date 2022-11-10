const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      this.belongsTo(models.Player, { foreignKey: 'player_id' });
    }
  }
  Game.init({
    score: DataTypes.INTEGER,
    enemies_killed: DataTypes.INTEGER,
    player_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
