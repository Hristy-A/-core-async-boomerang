const EnemyDTO = require('./EnemyDTO');
const PlayerDTO = require('./PlayerDTO');
const {
  Sequelize, sequelize, Enemy, Game, Player, PlayerSkin,
} = require('../db/models/index');

class Repository {
  async getAllEnemies() {
    const allEnem = await Enemy.findAll({ attributes: ['skin', 'base_tick', 'strong'], raw: true });
    return allEnem.map((el) => new EnemyDTO(el.skin, el.base_tick, el.strong));
  }
}
const rep = new Repository();
const a = rep.getAllEnemies();
console.log(a);
