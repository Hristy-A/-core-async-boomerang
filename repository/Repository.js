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
   * ничего не принимает */
  async getAllEnemies() {
    const allEnem = await Enemy.findAll({
      attributes: ['skin', 'base_tick', 'strong'],
      raw: true,
    });
    return allEnem.map((el) => new EnemyDTO(el.skin, el.base_tick, el.strong));
  }

  /** ЗАПИСЬ В БАЗУ РЕЗ ТЕКУЩЕЙ ИГРЫ для записи результатов игры в БД
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
    return res;
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

  /** ДАННЫЕ ИГРОКА возвращает данные игрока(или создает его, если нет) - экземпляр
   * класса PlayerDTO со свойствами name, skin
   * принимает имя игрока */
  async getOrCreatePlayer(playerName) {
    const [player, created] = await Player.findOrCreate({
      attributes: ['name'],
      include: {
        model: PlayerSkin,
        attributes: ['skin', 'boomerang'],
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
          attributes: ['skin', 'boomerang'],
        },
        where: { name: playerName },
        raw: true,
      });

      res = new PlayerDTO(
        newPlayer[0].name,
        newPlayer[0]['PlayerSkin.skin'],
        newPlayer[0]['PlayerSkin.boomerang']
      );
    } else {
      const playerScore = await this.getFinalResultAllGames(playerName);
      //console.log(playerScore.score);
      if (playerScore.score >= 200 && playerScore.score <= 400) {
        await Player.update(
          { skin_id: 2 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      if (playerScore.score >= 400 && playerScore.score <= 600) {
        await Player.update(
          { skin_id: 3 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      if (playerScore.score >= 600 && playerScore.score <= 800) {
        await Player.update(
          { skin_id: 4 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      if (playerScore.score >= 800 && playerScore.score <= 1000) {
        await Player.update(
          { skin_id: 5 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      if (playerScore.score >= 1000 && playerScore.score <= 1200) {
        await Player.update(
          { skin_id: 6 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      if (playerScore.score >= 1200 && playerScore.score <= 1400) {
        await Player.update(
          { skin_id: 7 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      if (playerScore.score >= 1400 && playerScore.score <= 1600) {
        await Player.update(
          { skin_id: 8 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      if (playerScore.score >= 1600 && playerScore.score <= 1800) {
        await Player.update(
          { skin_id: 9 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      if (playerScore.score >= 1800 && playerScore.score <= 2000) {
        await Player.update(
          { skin_id: 10 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      if (playerScore.score > 2000) {
        await Player.update(
          { skin_id: 11 },
          {
            where: {
              name: playerName,
            },
          }
        );
      }
      const a = await Player.findAll({
        attributes: ['name'],
        include: {
          model: PlayerSkin,
          attributes: ['skin', 'boomerang'],
        },
        where: { name: playerName },
        raw: true,
      });
      //console.log(a);
      res = new PlayerDTO(
        a[0].name,
        a[0]['PlayerSkin.skin'],
        a[0]['PlayerSkin.boomerang']
      );
    }
    //console.log(res);
    return res;
  }
}

module.exports = Repository;
