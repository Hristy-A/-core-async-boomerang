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

const GameDTO = require('./GameDTO');

class Repository {
  /**  метод возвращает массив всех врагов */
  async getAllEnemies() {
    const allEnem = await Enemy.findAll({
      attributes: ['skin', 'base_tick', 'strong'],
      raw: true,
    });
    return allEnem.map((el) => new EnemyDTO(el.skin, el.base_tick, el.strong));
  }

  /** метод возвращает данные игрока(или создает его, если нет) */
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
    let res;
    if (created) {
      await Game.create({
        score: 0,
        enemies_killed: 0,
        player_id: player.id,
      });
      const newPlayer = await Player.findAll({
        attributes: ['name'],
        include: {
          model: PlayerSkin,
          attributes: ['skin'],
        },
        where: { name: playerName },
        raw: true,
      });
      res = new PlayerDTO(newPlayer[0].name, newPlayer[0]['PlayerSkin.skin']);
    } else {
      res = new PlayerDTO(player.name, player['PlayerSkin.skin']);
    }
    console.log(res);
    return res;
  }

  /** метод для записи результатов игры в БД */
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

  /** метод возвращающий статистику по всем играм игрока */
  async getAllGamesOfPlayer(namePlayer) {
    const idPlayer = await Player.findAll({
      attributes: ['id'],
      where: {
        name: namePlayer,
      },
      raw: true,
    });
    const res = await Game.findAll({
      attributes: ['score', 'enemies_killed'],
      order: [['createdAt', 'DESC']],
      where: {
        player_id: idPlayer[0].id,
      },
      raw: true,
    });
    // console.log(res);
    return res.map((el) => new GameDTO(el.score, el.enemies_killed));
  }

  /** метод возвращает ИТОГ всех игр геймера */
  async getFinalResultAllGames(namePlayer) {
    const res = await this.getAllGamesOfPlayer(namePlayer);
    const resAllGames = res.reduce(
      (acc, el) => {
        acc.score += el.score;
        acc.enemiesKilled += el.enemiesKilled;
        return acc;
      },
      { score: 0, enemiesKilled: 0 }
    );
    //console.log(resAllGames);
    return resAllGames;
  }
}

const rep = new Repository();
rep.getOrCreatePlayer('Pmre');
module.exports = Repository;
