const EnemyDTO = require('./EnemyDTO');
const PlayerDTO = require('./PlayerDTO');
const {
  Sequelize,
  sequelize,
  Enemy,
  Game,
  Player,
  PlayerSkin,
} = require('../db/models/index');

class Repository {
  async getAllEnemies() {
    const allEnem = await Enemy.findAll({
      attributes: ['skin', 'base_tick', 'strong'],
      raw: true,
    });
    return allEnem.map((el) => new EnemyDTO(el.skin, el.base_tick, el.strong));
  }

  async getOrCreatePlayer(playerName) {
    const [player, created] = await Player.findOrCreate({
      attributes: ['name'],
      include: {
        model: PlayerSkin,
        attributes: ['skin'],
      },
      where: { name: playerName },
      defaults: {
        skin_id: 1,
      },
      raw: true,
    });
    // console.log(player, created);
    if (created) {
      await Game.create({
        score: 0,
        enemies_killed: 0,
        player_id: player.id,
      });
      const newPlayer = Player.findAll({
        attributes: ['name'],
        include: {
          model: PlayerSkin,
          attributes: ['skin'],
        },
        where: { name: playerName },
      });
      return new PlayerDTO(newPlayer.name, newPlayer['PlayerSkin.skin']);
    }
    return new PlayerDTO(player.name, player['PlayerSkin.skin']);
  }

  async recordNewResult(namePlayer, newScore, newKilled) {
    const idPlayer = await Player.findAll({
      attributes: ['id'],
      where: {
        name: namePlayer,
      },
      raw: true,
    });

    await Game.create({
      score: newScore,
      enemies_killed: newKilled,
      player_id: idPlayer[0].id,
    });
  }
}

const rep = new Repository();
rep.recordNewResult('Andrey', 500, 20);
module.exports = Repository;
