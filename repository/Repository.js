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
  /**  МАССИВ ВСЕХ ВРАГОВ возвращает массив всех врагов - массив экземпляров EnemyDTO - со
   * свойствами skin, tick, strong
   * ничего не принимает*/
  async getAllEnemies() {
    const allEnem = await Enemy.findAll({
      attributes: ['skin', 'base_tick', 'strong'],
      raw: true,
    });
    return allEnem.map((el) => new EnemyDTO(el.skin, el.base_tick, el.strong));
  }

  /** ДАННЫЕ ИГРОКА возвращает данные игрока(или создает его, если нет) - экземпляр
   * класса PlayerDTO со свойствами name, skin
   * принимает имя игрока*/
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
    //console.log(res);
    return res;
  }

  /**ЗАПИСЬ В БАЗУ РЕЗ ТЕКУЩЕЙ ИГРЫ для записи результатов игры в БД
   * принимает name, score, enemiesKilled
   */
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

  /** РЕЗУЛЬТАТЫ КАЖДОЙ ИГРЫ ИГРОКА возвращающий статистику по всем играм игрока
   * возвращает массив с экземплярами GameDTO со свойства score, enemiesKilled
   * принимает namePlayer
   */
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

  /** РЕЗУЛЬТАТ ВСЕХ ИГР ИГРОКА возвращает ИТОГ всех игр геймера  возвращает
   * объект со свойствами score, enemiesKilled */
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

  /** ЛИДЕР БОРДА возвращает 3-x лидеров игр по очкам - массив из 3 объектов
   * со свойствами - score, enemiesKilled, name */
  async getLiderBoards() {
    const allPlayers = await Player.findAll({
      attributes: ['name'],
      raw: true,
    });

    const resOfEachPlayer = [];
    const operations = allPlayers.map(async (el) => {
      const res = await this.getFinalResultAllGames(el.name);
      res.name = el.name;
      resOfEachPlayer.push(res);
    });
    await Promise.all(operations);
    const res = resOfEachPlayer.sort((a, b) => b.score - a.score).slice(0, 3);
    // console.log(res);
  }
}

module.exports = Repository;
